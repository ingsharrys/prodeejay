<script setup lang="ts">
import { Card, Tag } from 'ant-design-vue'
import { FileTextOutlined, SafetyOutlined, DollarOutlined, PictureOutlined } from '@ant-design/icons-vue'
import type { AIReview } from '../../types'

const props = defineProps<{
  auditResults: NonNullable<AIReview['audit_results']>
}>()
</script>

<template>
  <Card 
    v-if="auditResults && Object.keys(auditResults).length > 0" 
    class="audit-results-card"
    :bordered="false"
  >
    <template #title>
      <div class="card-title">
        <FileTextOutlined class="title-icon" />
        <span>Audit Results</span>
      </div>
    </template>
    <div class="audit-results-list">
      <div 
        v-if="auditResults.content_safety" 
        class="audit-result-item"
      >
        <div class="audit-result-label">
          <SafetyOutlined class="audit-icon" />
          <span>Content Safety</span>
        </div>
        <Tag 
          :color="auditResults.content_safety === 'Pass' ? 'success' : 
                  auditResults.content_safety === 'Warning' ? 'warning' : 'error'"
          class="audit-tag"
        >
          {{ auditResults.content_safety }}
        </Tag>
      </div>
      <div 
        v-if="auditResults.pricing_integrity" 
        class="audit-result-item"
      >
        <div class="audit-result-label">
          <DollarOutlined class="audit-icon" />
          <span>Pricing Integrity</span>
        </div>
        <Tag 
          :color="auditResults.pricing_integrity === 'Pass' ? 'success' : 
                  auditResults.pricing_integrity === 'Warning' ? 'warning' : 'error'"
          class="audit-tag"
        >
          {{ auditResults.pricing_integrity }}
        </Tag>
      </div>
      <div 
        v-if="auditResults.visual_consistency" 
        class="audit-result-item"
      >
        <div class="audit-result-label">
          <PictureOutlined class="audit-icon" />
          <span>Visual Consistency</span>
        </div>
        <Tag 
          :color="auditResults.visual_consistency === 'Pass' ? 'success' : 
                  auditResults.visual_consistency === 'Warning' ? 'warning' : 'error'"
          class="audit-tag"
        >
          {{ auditResults.visual_consistency }}
        </Tag>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.audit-results-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.audit-results-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.audit-results-card :deep(.ant-card-head) {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 20px;
  min-height: auto;
}

.audit-results-card :deep(.ant-card-body) {
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

.audit-results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.audit-result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #fafafa;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.audit-result-item:hover {
  background-color: #f0f0f0;
}

.audit-result-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #595959;
  font-weight: 500;
}

.audit-icon {
  font-size: 16px;
  color: #8c8c8c;
}

.audit-tag {
  font-size: 13px;
  padding: 4px 12px;
  font-weight: 500;
  border-radius: 4px;
}

@media screen and (max-width: 768px) {
  .audit-result-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
