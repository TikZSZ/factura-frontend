<script lang="ts" setup>
import api from "@/misc/api";
import { ref,reactive } from "vue";
import { useRoute } from "vue-router";
import { useClipboard } from "@vueuse/core"
import Loading from "@/components/Loading.vue";
import ButtonSpinnerVue from "@/components/ButtonSpinner.vue";


interface RootObject {
  receipt_id: number;
  time: string;
  store_id: number;
  buyer_id: string;
  signature: string;
  sequence_no: number;
  timestamp: string;
  products: Product[];
  buyer: Buyer;
  store: Store;
}

interface Store {
  store_name: string;
  website: string;
  phone_number: number;
  address: string;
  seller: Buyer;
}

interface Buyer {
  name: string;
  userAccountId: string;
  public_key: string;
}

interface Product {
  id: number;
  seq: number;
  product_name: string;
  price: string;
  tax: string;
  discount: string;
  qty: number;
  total: string;
  receipt_id: number;
}
const receipt = ref<RootObject | null>(null);
const route = useRoute();

const fetch = (async () => {
  const { data } = await api.get<RootObject>(`/api/getBill/${route.params.receipt_id}`);
  //console.log(data);
  receipt.value = data;
})();

const clipboard = useClipboard({})

const copy = () => {
  if (!receipt.value) return

  clipboard.copy(JSON.stringify({
    storeId: receipt.value.store_id,
    buyerId: receipt.value.buyer_id,
    products: receipt.value.products.map((product) => {
      const obj: any = {}
      Object.keys(product).map((key: any) => {
        if (key === 'id' || key === 'receipt_id') return
        obj[key] = product[key as keyof Product]
        return
      })
      return obj
    }),
    time: receipt.value.time
  }))
}

const buttons = reactive({
  1:false,
  2:false,
  3:false
})

const cp = async (text:string,index:keyof typeof buttons)=>{
  buttons[index] = true
  await clipboard.copy(text)
  setTimeout(()=>{
    buttons[index] = false
  },300)
  
}

</script>

<template>
  <Loading v-if="!receipt" />
  <div v-else class="px-2 md:px-8 mx-auto bg-gray-100 w-full min-h-screen">
    <div class="py-3">
        <div class>
          <h2 class="leading-tight text-3xl">Invoice</h2>
        </div>
        <div class="py-2" v-if="receipt">

        <!-- Copy Buttons -->
        <div class="">

          <button
            @click="cp(receipt!.sequence_no.toString(),1)"
            class="bg-indigo-600 p-3 rounded-2xl text-white m-3 w-52 h-12"
          >
            <p v-if="!buttons[1]">Copy Sequence Number</p>
            <ButtonSpinnerVue v-else class="border-green-200 " />
          </button>

          <button
            @click="cp(receipt!.signature,2)"
            class="bg-indigo-600 p-3 rounded-2xl text-white m-3 w-52  h-12 "
          >
            <p v-if="!buttons[2]">Copy Signature</p>
            <ButtonSpinnerVue v-else class="border-green-200 " />
          </button>

          <button
            @click="cp(receipt!.store.seller.public_key,3)"
            class="bg-indigo-600 p-3 rounded-2xl text-white m-3 w-52 h-12"
          >
            <p v-if="!buttons[3]">Copy Seller Public Key</p>
            <ButtonSpinnerVue v-else class="border-green-200 " />
          </button>

        </div>

        <!-- Full Receipt -->
        <div
          class="grid font-medium relative grid-flow-row md:grid-cols-2 lg:grid-cols-3 w-full gap-y-10 lg:gap-y-2 gap-x-5 px-5 mb-4 mt-6 py-5 bg-white shadow-md rounded-xl"
        >
          <!-- Seller Info -->
          <div class="space-y-1">
            <h1 class="text-xl">Store Info</h1>
            <div>
              <span class="text-gray-600">Sold By:</span>
              {{ receipt.store.store_name }}
            </div>
            <div>
              <span class="text-gray-600">Store ID:</span>
              {{ receipt.store_id }}
            </div>
            <div>
              <span class="text-gray-600">Address:</span>
              {{ receipt.store.address }}
            </div>
            <div>
              <p class="d">
                <span class="text-gray-600">Public Key:</span>
                {{ receipt.store.seller.public_key }}
              </p>
            </div>
            <div>
              <span class="text-gray-600">Phone Number:</span>
              {{ receipt.store.phone_number }}
            </div>
            <div>
              <span class="text-gray-600">Website:</span>
              {{ receipt.store.website }}
            </div>
          </div>

          <!-- Hedera info -->
          <div class="lg:space-y-1">
            <h1 class="text-xl">Hedera Info</h1>
            <div class="grid grid-flow-col">
              <div class="max-w-full relative break-all">
                <div class="relative break-all">
                  <span class="text-gray-600">Receipt ID:</span>
                  {{ receipt.receipt_id }}
                </div>
                <div class="relative break-all">
                  <span class="text-gray-600">Date:</span>
                  {{ new Date(receipt.time).toUTCString() }}
                </div>
              </div>
            </div>

            <div class="lg:space-y-1">
              <div class="break-all">
                <span class="text-gray-600">Timestamp:</span>
                {{ receipt.timestamp }}
              </div>
              <div class="break-all">
                <span class="text-gray-600">Sequence No:</span>
                {{ receipt.sequence_no }}
              </div>
            </div>
          </div>

          <!-- Buyer Info -->
          <div class="space-y-1">
            <h1 class="text-xl">Buyer Info</h1>
            <div>
              <span class="text-gray-600">Sold To:</span>
              {{ receipt.buyer.name }}
            </div>
            <div>
              <span class="text-gray-600">Account ID:</span>
              {{ receipt.buyer.userAccountId }}
            </div>
          </div>

          <!-- Products Info -->
          <div class="col-span-full w-full">
            <h1 class="text-xl my-3">Products</h1>
            <div class="grid grid-row-3 gap-2 border-2 px-2 relative font-serif">
              <div class="grid grid-cols-5 gap-5">
                <p class="text-gray-500 col-span-1">S.No</p>
                <p class="text-gray-500 col-span-2 text-center">Name</p>
                <p class="text-gray-500 col-span-2 text-center">Total</p>
              </div>

              <div
                class="grid grid-cols-5 pt-2 gap-5 border-2 border-b-0 border-r-0 border-l-0"
                v-for="product of receipt.products"
              >
                <p class="col-span-1">{{ product.seq }}</p>
                <p class="col-span-2">{{ product.product_name }}</p>
                <!-- Total -->
                <div class="col-span-2">
                  <div class="grid grid-row-2">
                    <div class="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 text-center">
                      <p class="text-gray-500">
                        Price
                        <span class="text-black">{{ product.price }}</span>
                      </p>
                      <p class="text-gray-500">
                        Tax
                        <span class="text-black">{{ product.tax }}</span>
                      </p>
                      <p class="text-gray-500 col-span-full md:col-span-1">
                        Discount
                        <span class="text-black">{{ product.discount }}</span>
                      </p>
                      <p class="text-gray-500">
                        Qty
                        <span class="text-black">{{ product.qty }}</span>
                      </p>
                      <p class="text-gray-500 md:col-span-full xl:col-span-1">
                        Total
                        <span class="text-black">{{ product.total }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Grand Total -->
              <div class="pb-2 border-t-2 pt-2">
                <p>
                  <span class="text-gray-500">Grand Total:</span>
                  {{
                    receipt.products.reduce((previousValue, product) => {
                      return previousValue + parseFloat(product.total);
                    }, 0)
                  }}
                </p>
              </div>
            </div>
          </div>
          <!-- Signature -->
          <div class="col-span-full xl:col-end-2 mt-2">
            <p class="break-all font-bold">
              <span class="text-gray-500 text-lg">Signature:</span>
              {{ receipt.signature }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.d {
  word-break: break-all;
}
</style>
