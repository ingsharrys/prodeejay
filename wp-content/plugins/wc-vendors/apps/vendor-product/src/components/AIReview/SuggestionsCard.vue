<script setup lang="ts">
import { Card, Typography } from 'ant-design-vue'
import { BulbOutlined } from '@ant-design/icons-vue'
import type { AIReview } from '../../types'

defineProps<{
  suggestions: NonNullable<AIReview['suggestions']>
}>()
</script>

<template>
  <Card 
    v-if="suggestions && suggestions.length > 0" 
    class="suggestions-card"
    :bordered="false"
  >
    <template #title>
      <div class="card-title">
        <BulbOutlined class="title-icon" />
        <span>Suggestions</span>
      </div>
    </template>
    <div class="suggestions-list">
      <div 
        v-for="(suggestion, index) in suggestions" 
        :key="index"
        class="suggestion-item"
      >
        <div class="suggestion-header">
          <Typography.Text strong class="suggestion-field">
            {{ suggestion.field }}
          </Typography.Text>
        </div>
        <Typography.Text class="suggestion-text">
          {{ suggestion.suggestion }}
        </Typography.Text>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.suggestions-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.suggestions-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.suggestions-card :deep(.ant-card-head) {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 20px;
  min-height: auto;
}

.suggestions-card :deep(.ant-card-body) {
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

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-item {
  padding: 16px;
  background: linear-gradient(135deg, #fffbe6 0%, #fff7e6 100%);
  border-left: 4px solid #faad14;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.suggestion-item:hover {
  background: linear-gradient(135deg, #fff7e6 0%, #ffecc7 100%);
  box-shadow: 0 2px 8px rgba(250, 173, 20, 0.15);
}

.suggestion-header {
  margin-bottom: 8px;
}

.suggestion-field {
  font-size: 14px;
  color: #d48806;
  text-transform: capitalize;
  font-weight: 600;
}

.suggestion-text {
  font-size: 14px;
  color: #595959;
  line-height: 1.6;
  display: block;
}
</style>
