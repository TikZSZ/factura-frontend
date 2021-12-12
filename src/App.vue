<script setup lang="ts">
import NavbarVue from './components/Navbar.vue';
import { useStore } from './store';
import {useWindowSize,useResizeObserver} from "@vueuse/core"
import {ref} from "vue"

const store = useStore()


const { width } = useWindowSize()
store.isMobile = width.value < 640

const el = ref(null)

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  store.isMobile = width < 768
})

// const d = (async ()=>{
//   store.checkAuth()
// })()


</script>

<template>
    <div ref="el">
      <NavbarVue />
      <div >
        <router-view />
      </div>
    </div>
</template>


