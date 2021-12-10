<script lang="ts" setup>
import { useStore } from '@/store';
import { toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Option from './Option.vue';

const router = useRouter()
const route = useRoute()
const {isMobile,currentTab,navDash} = toRefs(useStore())


type Option = {
  name:string,
  icon:string,
  style?:string
}

defineProps<{isMobile:boolean,isOpen:boolean,toggle:(bol:boolean)=>void}>()

const options:Option[] = [
  {
    name:"Stores",
    icon:`<svg
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z"
      />
    </svg>`
  },
  {
   name:"Transaction History" ,
   icon:`<svg
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
        d="M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z"
      />
    </svg>`
  },
  {
    name:"Create Receipt",
    icon:`<svg class="w-6 h-6 -ml-1 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
		</svg>`
  }
]

</script>

<template>
  <div
    class="h-screen lg:block shadow-lg"
    :class="{ 'absolute w-52 z-20': isMobile, 'relative w-80': !isMobile, 'hidden': !isOpen }"
  >
    <div class="bg-white h-full dark:bg-gray-700">
      <div class="flex items-center justify-start pt-6 ml-8">
        <p class="font-bold dark:text-white text-xl">Plannifer</p>
        <div class="block mr-6 lg:hidden" >
          <button
            @click="toggle(false)"
            class="flex ml-8 p-2 items-center rounded-full bg-white shadow text-gray-500 text-md"
          >
            <svg
              fill="currentColor"
              class="text-gray-400"
              width="22"
              height="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"
              />
            </svg>
          </button>
        </div>
      </div>

      <nav class="mt-6">
        <div>
          <Option v-for="option in options" @click="navDash(option.name,router)" :name="option.name" 
          :style="` w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 ${option.name===currentTab?' border-purple-500 text-gray-800 dark:text-white':'hover:text-gray-800 border-transparent text-gray-400'} `" 
          :icon="option.icon" />
          <a
            class="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
            href="#"
          >
            <span class="text-left">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z"
                />
              </svg>
            </span>
            <span class="mx-4 text-sm font-normal">Resources</span>
          </a>
          <a
            class="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
            href="#"
          >
            <span class="text-left">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M580 461q0-41-25-66t-66-25q-43 0-76 25.5t-33 65.5q0 39 33 64.5t76 25.5q41 0 66-24.5t25-65.5zm743 507q0-28-25.5-50t-65.5-22q-27 0-49.5 22.5t-22.5 49.5q0 28 22.5 50.5t49.5 22.5q40 0 65.5-22t25.5-51zm-236-507q0-41-24.5-66t-65.5-25q-43 0-76 25.5t-33 65.5q0 39 33 64.5t76 25.5q41 0 65.5-24.5t24.5-65.5zm635 507q0-28-26-50t-65-22q-27 0-49.5 22.5t-22.5 49.5q0 28 22.5 50.5t49.5 22.5q39 0 65-22t26-51zm-266-397q-31-4-70-4-169 0-311 77t-223.5 208.5-81.5 287.5q0 78 23 152-35 3-68 3-26 0-50-1.5t-55-6.5-44.5-7-54.5-10.5-50-10.5l-253 127 72-218q-290-203-290-490 0-169 97.5-311t264-223.5 363.5-81.5q176 0 332.5 66t262 182.5 136.5 260.5zm592 561q0 117-68.5 223.5t-185.5 193.5l55 181-199-109q-150 37-218 37-169 0-311-70.5t-223.5-191.5-81.5-264 81.5-264 223.5-191.5 311-70.5q161 0 303 70.5t227.5 192 85.5 263.5z"
                />
              </svg>
            </span>
            <span class="mx-4 text-sm font-normal">Store feedback</span>
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>