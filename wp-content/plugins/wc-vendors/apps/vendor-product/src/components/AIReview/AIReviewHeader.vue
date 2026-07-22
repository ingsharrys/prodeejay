<script setup lang="ts">
import { Typography } from 'ant-design-vue'

defineProps<{
  productName: string
}>()
</script>

<template>
  <div class="ai-review-header">
    <Typography.Title :level="4" class="product-name">
      {{ productName }}
    </Typography.Title>
  </div>
</template>

<style scoped>
.ai-review-header {
  margin-bottom: 8px;
}

.product-name {
  margin: 0 !important;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}
</style>
