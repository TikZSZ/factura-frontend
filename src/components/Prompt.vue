<script lang="ts" setup>
import { ref } from 'vue';
import ButtonSpinner from './ButtonSpinner.vue';

defineProps<{ sign: (privateKey: string) => void,disabled?:boolean }>()
const privateKey = ref('')
</script>

<template>
  <div class="w-full  z-20 inset-0  overflow-y-auto">
    <div class="absolute  inset-0 bg-gray-500 opacity-80"></div>
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
      <div
        class="inline-block relative overflow-hidden transform transition-all sm:align-middle sm:max-w-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div>
          <div class="relative rounded-lg p-8 bg-white shadow  ">
            <div class="bg-white dark:bg-gray-800">
              <div class="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                <h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                  <span class="block">Enter Private Key</span>
                </h2>
                <div class="lg:mt-0 lg:flex-shrink-0">
                  <form @submit.prevent="sign(privateKey)" class="relative w-full mt-6 space-y-5">
                    <input
                      type="text"
                      class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      v-model="privateKey"
                      placeholder="Private Key"
                    />
                    <!-- Submit Button -->
                    <div class="relative">
                      <button
                        :disabled="disabled || false"
                        class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                        :class="!disabled?' bg-blue-600':' bg-blue-400'"
                      >
                      <span v-if="disabled"><ButtonSpinner /></span>
                      <span v-else>Sign</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>