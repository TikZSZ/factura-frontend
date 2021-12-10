<script lang="ts" setup>
import ProductForm from '@/components/Dashboard/Main/ProductForm.vue'
import Prompt from '@/components/Prompt.vue'
import receiptFields from "@/misc/receiptFields"
import { ref } from "vue"
import signature from '@/misc/signature'
import { sendToConsensus } from './useConsensus'
import api from '@/misc/api'

const { fields, submitData, update } = receiptFields()

const prompt = ref(false)

const submit = () => {
  console.log(submitData);
  prompt.value = true
}


const sign = async (privateKey: string) => {
  const { buyerId, storeId, products } = submitData
  const time = new Date().toUTCString()
  const prepData = { storeId: parseInt(storeId), buyerId, products, time: time }
  const { hexSignature } = signature(privateKey, JSON.stringify(prepData))
  const record = await sendToConsensus(JSON.stringify({ receipt: prepData, signature: hexSignature }), privateKey)
  if (!record) return
  console.log(record);
  const { data } = await api.post('/api/createBill', {
    data: {
      ...prepData, 
      signature: hexSignature,
      timestamp: record.consensusTimestamp.toString(),
      sequence_no: record.receipt.topicSequenceNumber?.toInt()
    }
  })
  console.log(data);
  prompt.value = false
}

</script>


<template>
  <div class="w-full bg-white mx-auto min-h-screen">
    <div class="flex flex-col items-start justify-start w-full h-full p-10 lg:p-8 xl:p-16">
      <h4 class="w-full text-3xl font-bold">Signup</h4>
      <p class="text-lg text-gray-500">
        or, if you have an account you can
        <router-link to="/signin" href="#_" class="text-blue-600 underline">sign in</router-link>
      </p>
      <Prompt v-if="prompt" :sign="sign" />
      <form @submit.prevent="submit" class="relative w-full mt-8 space-y-4">
        <div class="relative" v-for="(field) in fields">
          <label class="font-medium text-gray-900">
            {{ field.label }}
            <span v-if="field.required" class="text-red-500 required-dot">*</span>
          </label>
          <input
            type="text"
            class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
            v-model="submitData[field.name]"
            :placeholder="field.placeholder"
          />
        </div>
        <ProductForm
          v-for="(product,index) in submitData.products"
          :key="index"
          :index="index"
          :update="update"
          :submit-data="product"
        />
        <!-- Submit Button -->
        <div class="relative">
          <button
            href="#_"
            class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
          >Create Account</button>
        </div>
      </form>
    </div>
  </div>
</template>