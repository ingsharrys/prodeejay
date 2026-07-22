<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Use dynamic import to create separate chunk for ProductsTable component
const ProductsTable = defineAsyncComponent(() => import('./ProductsTable.vue'))
</script>

<template>
  <div class="dashboard-container">
    <ProductsTable />
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 0;
  background-color: #f0f0f1;
  min-height: 100vh;
}
</style>

