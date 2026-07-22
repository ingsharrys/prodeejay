<script setup lang="ts">
import { Card, Typography } from 'ant-design-vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import type { AIReview } from '../../types'

defineProps<{
  adminLogic: string
}>()
</script>

<template>
  <Card 
    v-if="adminLogic" 
    class="admin-note-card"
    :bordered="false"
  >
    <template #title>
      <div class="card-title">
        <InfoCircleOutlined class="title-icon" />
        <span>Admin Note</span>
      </div>
    </template>
    <div class="admin-note-content">
      <Typography.Text>{{ adminLogic }}</Typography.Text>
    </div>
  </Card>
</template>

<style scoped>
.admin-note-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.admin-note-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.admin-note-card :deep(.ant-card-head) {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 20px;
  min-height: auto;
}

.admin-note-card :deep(.ant-card-body) {
  padding: 20px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}

.title-icon {
  font-size: 18px;
  color: #1890ff;
}

.admin-note-content {
  padding: 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%);
  border-left: 4px solid #1890ff;
  border-radius: 6px;
  line-height: 1.7;
  color: #434343;
}
</style>
