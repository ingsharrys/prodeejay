<script setup lang="ts">
import { Card, Tag, Typography } from 'ant-design-vue'
import { PictureOutlined } from '@ant-design/icons-vue'
import type { AIReview } from '../../types'
import { getI18n } from '../../helpers/i18n.helper'

const props = defineProps<{
  imageReviews: NonNullable<AIReview['image_reviews']>
}>()

const translateStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'APPROVED': getI18n('statusApproved') || 'Approved',
    'REVISION_REQUIRED': getI18n('statusRevisionRequired') || 'Revision Required',
    'FLAGGED': getI18n('statusFlagged') || 'Flagged',
    'REJECTED': getI18n('statusRejected') || 'Rejected',
    'PASS': getI18n('statusPass') || 'Pass',
    'FAIL': getI18n('statusFail') || 'Fail'
  }
  return statusMap[status] || status
}
</script>

<template>
  <Card 
    v-if="imageReviews && imageReviews.length > 0" 
    class="image-reviews-card"
    :bordered="false"
  >
    <template #title>
      <div class="card-title">
        <PictureOutlined class="title-icon" />
        <span>Image Reviews</span>
      </div>
    </template>
    <div class="image-reviews-list">
      <div 
        v-for="(imageReview, index) in imageReviews" 
        :key="index"
        class="image-review-item"
      >
        <div class="image-review-content">
          <div class="image-review-image-wrapper">
            <img 
              v-if="imageReview.image_url" 
              :src="imageReview.image_url" 
              :alt="`Product image ${imageReview.image_id}`"
              class="image-review-image"
            />
            <div v-else class="image-review-placeholder">
              <PictureOutlined class="placeholder-icon" />
              <Typography.Text type="secondary">Image not available</Typography.Text>
            </div>
          </div>
          <div class="image-review-details">
            <div v-if="imageReview.completion" class="image-review-status-row">
              <Tag 
                :color="imageReview.completion.status === 'REJECTED' || imageReview.completion.status === 'FAIL' ? 'error' : 
                        imageReview.completion.status === 'APPROVED' || imageReview.completion.status === 'PASS' ? 'success' : 'warning'"
                class="image-status-tag"
              >
                {{ translateStatus(imageReview.completion.status) }}
              </Tag>
              <Tag 
                v-if="imageReview.completion.risk_score > 0"
                :color="imageReview.completion.risk_score >= 51 ? 'error' : 
                        imageReview.completion.risk_score >= 21 ? 'warning' : 'success'"
                class="image-risk-tag"
              >
                Risk: {{ imageReview.completion.risk_score }}
              </Tag>
            </div>
            
            <div v-if="imageReview.completion && imageReview.completion.analysis" class="image-review-analysis">
              <div class="analysis-row">
                <span class="analysis-label">Appropriateness:</span>
                <Tag 
                  :color="imageReview.completion.analysis.appropriateness === 'Pass' ? 'success' : 'error'"
                  class="analysis-tag"
                >
                  {{ imageReview.completion.analysis.appropriateness }}
                </Tag>
              </div>
              <div class="analysis-row">
                <span class="analysis-label">Quality:</span>
                <Tag 
                  :color="imageReview.completion.analysis.quality === 'Pass' ? 'success' : 'error'"
                  class="analysis-tag"
                >
                  {{ imageReview.completion.analysis.quality }}
                </Tag>
              </div>
              <div class="analysis-row">
                <span class="analysis-label">Compliance:</span>
                <Tag 
                  :color="imageReview.completion.analysis.compliance === 'Pass' ? 'success' : 'error'"
                  class="analysis-tag"
                >
                  {{ imageReview.completion.analysis.compliance }}
                </Tag>
              </div>
              <div class="analysis-row">
                <span class="analysis-label">Product Match:</span>
                <Tag 
                  :color="imageReview.completion.analysis.product_match === 'Pass' ? 'success' : 'error'"
                  class="analysis-tag"
                >
                  {{ imageReview.completion.analysis.product_match }}
                </Tag>
              </div>
            </div>

            <div v-if="imageReview.completion && imageReview.completion.review_summary" class="image-review-summary">
              <Typography.Text class="summary-label">Review Summary:</Typography.Text>
              <Typography.Text class="summary-text">{{ imageReview.completion.review_summary }}</Typography.Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.image-reviews-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.image-reviews-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-reviews-card :deep(.ant-card-head) {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 20px;
  min-height: auto;
}

.image-reviews-card :deep(.ant-card-body) {
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

.image-reviews-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-review-item {
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.image-review-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-color: #d0d0d0;
}

.image-review-content {
  display: flex;
  gap: 16px;
}

.image-review-image-wrapper {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-review-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-review-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #8c8c8c;
}

.placeholder-icon {
  font-size: 32px;
  color: #bfbfbf;
}

.image-review-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.image-review-status-row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.image-status-tag,
.image-risk-tag {
  font-size: 12px;
  padding: 4px 10px;
  font-weight: 500;
  border-radius: 4px;
}

.image-review-analysis {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: #fafafa;
  border-radius: 6px;
}

.analysis-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.analysis-label {
  color: #595959;
  font-weight: 500;
}

.analysis-tag {
  font-size: 11px;
  padding: 2px 8px;
  font-weight: 500;
  border-radius: 4px;
}

.image-review-summary {
  padding: 12px;
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%);
  border-left: 4px solid #1890ff;
  border-radius: 6px;
}

.summary-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.summary-text {
  display: block;
  font-size: 13px;
  color: #434343;
  line-height: 1.6;
}

@media screen and (max-width: 768px) {
  .image-review-content {
    flex-direction: column;
  }

  .image-review-image-wrapper {
    width: 100%;
    height: 200px;
  }
}
</style>
