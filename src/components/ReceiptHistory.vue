<script lang="ts" setup>
import api from "@/misc/api";
import { ref } from "vue";
import {useRoute} from "vue-router"

const props = defineProps<{link:string,title:string}>()

interface Product {
  seq: number;
  product_name: string;
  total: string;
}

interface Store {
  store_name: string;
  status: string;
  store_id: number;
}

interface RootObject {
  receipt_id: number;
  time: string;
  store: Store;
  products: Product[];
}

const receipts = ref<RootObject[]|null>();
const route = useRoute()
const fetch = (async () => {
  //`/api/getReceiptsForStore/${route.params.storeId}`
  const { data } = await api.get<RootObject[]>(props.link);
  console.log(data);
  receipts.value = data;
})();

const getTime = (time:string) => {
  const t = new Date(time).toString().split(" ")
  return t.slice(0,5).join(' ')
}

</script>

<template>
  <div class=" px-2 md:px-8 mx-auto w-full  min-h-screen">
    <div v-if="!receipts"  class="py-3">
      <h1 class="text-xl text-red-600">Oops! no receipts to show yet. Buy something from a factura assoicated store to view ur receipts here.</h1>
    </div>
    <div v-else class="py-3">
      <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
        <h2 class="leading-tight text-3xl">{{title}}</h2>
      </div>
      <div class="py-4 overflow-x-auto">
        <div
          v-for="(receipt,index) of receipts"
          class="grid gap-5 mb-4 mt-16 min-w-full py-5 bg-white shadow-md rounded-xl overflow-hidden"
        >
          <div class="grid grid-cols-12 gap-2">
            <div class="pl-5 col-span-2 sm:col-span-1">
              <p class="text-gray-500">S No.</p>
              {{ index }}
            </div>
            
            <div class="col-span-2">
              <p class="text-gray-500">Store Name</p>
              {{ receipt.store.store_name }}
            </div>
            
            <div  class="col-span-2 hidden sm:block">
              <p class="text-gray-500 w-full">Time</p>
              {{ getTime(receipt.time) }}
            </div>

            <div class="col-span-8 sm:col-span-7">
              <p class="text-lg -mt-2">Products</p>
              <!-- <p class="ml-56">Products</p> -->
              <div class="grid grid-row-2">
                <div class="grid grid-cols-8">
                  <p class="text-gray-500 col-span-2 md:col-span-1">S.No</p>
                  <p class="text-gray-500 col-span-4 md:col-span-5 px-2">Name</p>
                  <p class="text-gray-500 col-span-2 mr-2">Total</p>
                </div>
                <div v-for="product of receipt.products" class="grid grid-cols-8">
                  <p class="col-span-2 md:col-span-1">{{ product.seq }}</p>
                  <p class="col-span-4 md:col-span-5 px-2">{{ product.product_name }}</p>
                  <p class="col-span-2 mr-2">{{ product.total }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Table -->
          <div class="relative h-2">
            <router-link :to="`/fullReceipt/${receipt.receipt_id}`" class="absolute px-4 py-0.5 w-full text-white bg-indigo-600 rounded-b-xl">
              View Full Receipt
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
