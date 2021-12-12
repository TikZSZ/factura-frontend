<script lang="ts" setup>
import { PublicKey } from "@hashgraph/sdk"
import axios from "axios"
import { ref } from "vue"
import hex from "../misc/hex"

const hederaPayload = ref('')
const signature = ref('')
const publicKey = ref('')
const result = ref<null | string | boolean>(false)
const sequenceNumber = ref()
import hash from "object-hash"


interface ConsensusResponse {
  consensus_timestamp: string;
  topic_id: string;
  message: string;
  running_hash: string;
  running_hash_version: number;
  sequence_number: number;
}

interface ConsensusMessage {
  receipt: Receipt;
  signature: string;
}

interface Receipt {
  storeId: number;
  buyerId: string;
  products: Product[];
  time: string;
}

interface Product {
  seq: number;
  qty: number;
  tax: number;
  discount: number;
  total: number;
  product_name: string;
  price: number;
}

const receipt = ref<null|ConsensusMessage>(null)
const receiptHash = ref<string|null>(null)
const receiptSignature = ref<string|null>(null)

const submit = async () => {
  const {data} = await axios.get<ConsensusResponse>(`https://testnet.mirrornode.hedera.com/api/v1/topics/0.0.16430783/messages/${sequenceNumber.value}`)
  const msg  = JSON.parse(atob(data.message)) as ConsensusMessage
  receipt.value = msg
  receiptHash.value = hash(msg.receipt)
  receiptSignature.value = msg.signature
  const msgHash = new TextEncoder().encode(hash(msg.receipt))
  const sig = hex.decode(signature.value)
  console.log(PublicKey.fromString(publicKey.value).verify(msgHash, sig));
  result.value = PublicKey.fromString(publicKey.value).verify(msgHash, sig)
}



</script>

<template>
  <div class="h-screen  ">
    <form @submit.prevent="submit" class="relative mx-auto w-full mt-10 space-y-4 px-4 md:px-16 lg:px-36">

    <div class="relative">
      <label class="font-medium text-gray-900">
        Sequence Number
        <span class="text-red-500 required-dot">*</span>
      </label>
      <input
        type="text"
        class="block w-full px-4 py-2 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
        v-model="sequenceNumber"
        placeholder="Enter sequence number of transcation, can be found on invoice"
      />
    </div>
    <div class="relative">
      <label class="font-medium text-gray-900">
        Signature
        <span class="text-red-500 required-dot">*</span>
      </label>
      <input
        type="text"
        class="block w-full px-4 py-2 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
        v-model="signature"
        placeholder="Enter signature, can be found on invoice"
      />
    </div>
    <div class="relative">
      <label class="font-medium text-gray-900">
        Public Key
        <span class="text-red-500 required-dot">*</span>
      </label>
      <input
        type="text"
        class="block w-full  px-4 py-2 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
        v-model="publicKey"
        placeholder="Enter Seller public key, can be found on invoice"
      />
    </div>
    <!-- Submit Button -->
    <div class="relative">
      <button
        href="#_"
        class="inline-block w-full py-2 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-2xl hover:bg-blue-700 ease"
      >Verify</button>
    </div>
  </form>
  <div v-if="receipt" class="mx-auto w-3/4  space-y-4 mt-10 border-2 p-2 rounded-3xl relative pb-16">
    <div class="break-all"><span class="text-gray-600 font-medium">Consensus Service Data For Sequence Number {{sequenceNumber}} :  </span> 
      <div  v-for="(value,key) of receipt.receipt" :key="key">
        <div v-if="key !== 'products'">
          <span class="text-gray-500">{{key}}</span>: {{value}}
        </div>
        <div v-else>
          Products:
          <div class="ml-20" v-for="(product,i) of value as Product[]">
            <div v-for="(v,k) of product">
              <span class="text-gray-500">{{k}}</span>: {{v}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="break-all"><span class="text-gray-500">Receipt Hash:</span>  {{receiptHash}}</p>
    <p class="break-all"><span class="text-gray-500">Receipt Signature:</span> {{receiptSignature}}</p>
    <div class="absolute left-0 bottom-0 h-10 pt-2 w-full  text-white my-auto px-10   mx-auto rounded-b-3xl" :class="result?'bg-indigo-600':'bg-red-500'">
      {{result?'Signature Matched':"Signature didn't match"}}
    </div>
  </div>
  </div>
  
</template>


