<template>
  <div>Unity Test MF Widget</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('Unity Test MF Widget loaded', { version: __APP_VERSION__ });
});
</script>
