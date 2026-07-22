<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const Dashboard = defineAsyncComponent(() => import('./components/Dashboard.vue'))
</script>

<template>
  <Dashboard />
</template>
