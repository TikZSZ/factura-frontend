<script lang="ts" setup>
import ProductForm from '@/components/Dashboard/Main/ProductForm.vue'
import Prompt from '@/components/Prompt.vue'
import receiptFields from "@/misc/receiptFields"
import { ref } from "vue"
import signature from '@/misc/signature'
import { sendToConsensus } from './useConsensus'
import api from '@/misc/api'
import { useRoute,useRouter } from 'vue-router'

const { fields, submitData, update,addProduct,removeProducts } = receiptFields()
const route = useRoute()
const prompt = ref(false)
const disabled = ref(false)
const router = useRouter()
// @ts-ignore
submitData.storeId = route.params.storeId

const submit = () => {
  console.log(submitData);
  prompt.value = true
}

const sign = async (privateKey: string) => {
  disabled.value = true
  const { buyerId, storeId, products } = submitData
  const time = new Date().toUTCString()
  const prepData = { storeId: parseInt(storeId), buyerId, products, time: time }
  const { hexSignature } = signature(privateKey, prepData)
  try{
    const record = await sendToConsensus(JSON.stringify({ receipt: prepData, signature: hexSignature }), privateKey)
    if (!record) return
    //console.log(record);
    const { data } = await api.post('/api/createBill', {
      data: {
        ...prepData, 
        signature: hexSignature,
        timestamp: record.consensusTimestamp.toString(),
        sequence_no: record.receipt.topicSequenceNumber?.toInt()
      }
    })
    prompt.value = false
    router.push(`/dashboard/viewReceipts/${submitData.storeId}`)
  }catch(err){
    disabled.value = false
  }
}
</script>


<template>
  <div class="w-full bg-white mx-auto min-h-screen">
    <div class="flex flex-col items-start justify-start w-full h-full p-10 lg:p-8 xl:p-16">
      <h4 class="w-full text-3xl font-bold">Create Receipt</h4>
      <Prompt v-if="prompt" :sign="sign" :disabled="disabled" />
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
            :disabled="route.params.storeId !== '0' && field.name === 'storeId'"
            :class="(route.params.storeId !== '0' && field.name === 'storeId') && 'text-gray-400'"
          />
        </div>
        <div v-for="(product,index) in submitData.products">
          <ProductForm
            :key="index"
            :index="index"
            :update="update"
            :submit-data="product"
          />
          <button type="button" @click="removeProducts(index)" class="inline-block mt-3 px-5 py-2 text-lg font-medium text-center text-white transition duration-200 bg-red-600 rounded-lg hover:bg-blue-700 ease">
            X
          </button>
        </div>
        
        <div class="relative">
          <button
            @click="addProduct"
            type="button"
            class="inline-block  px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
          >Add Another Product</button>
        </div>
        <!-- Submit Button -->
        <div class="relative">
          <button
            href="#_"
            type="submit"
            class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
          >Create Receipt</button>
        </div>
      </form>
    </div>
  </div>
</template>