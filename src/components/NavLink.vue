<template>
  <router-link class="text-md text-gray-600 inline-block w-full py-2 mx-0 ml-6 font-semibold text-left md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center"
  :to="to"
  :class="{'text-indigo-700':(currentPath===to),'hover:text-indigo-700':!(currentPath===to)}"
  @click="onChangePath(to)"
  >
    {{name}}
  </router-link>
  <!-- text-sm font-semibold text-indigo-700 -->
</template>

<script lang="ts" setup>import { PropType } from 'vue-demi';


const props = defineProps({
  name:String,
  to:{
    required:true,
    default:'/home',
    type:String || Object 
  },
  currentPath:String,
  onChangePath:{
    type:Function as PropType<(path:string)=>void>,
    required:true
  }
})


</script>