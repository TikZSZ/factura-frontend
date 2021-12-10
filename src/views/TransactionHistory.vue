<script lang="ts" setup>import api from '@/misc/api';


const receipts = (async () => {
  const {data} = await api.get('/api/getBills')
  console.log(data);
})()

</script>

<template>
</template>