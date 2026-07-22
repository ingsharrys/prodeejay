<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Use dynamic import to create separate chunk for Dashboard component
const Dashboard = defineAsyncComponent(() => import('./components/Dashboard.vue'))
</script>

<template>
  <Dashboard />
</template>
