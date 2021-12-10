<script lang="ts" setup>
defineProps<{name?:string,icon:string,style:string}>()

</script>

<template>
  <a
    :to="{name}"
    :class="style"
  >
    <span v-html="icon" class="text-left" ></span>
    <span class="mx-2 text-sm font-normal">{{name}}</span>
  </a>
</template>
