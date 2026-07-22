<script setup lang="ts">
import { Row, Col, Card, Tag, Tooltip, Typography } from 'ant-design-vue'
import { InfoCircleOutlined, WarningOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
import type { AIReview } from '../../types'
import { getI18n } from '../../helpers/i18n.helper'

const props = defineProps<{
  review: AIReview
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
  <Row 
    v-if="review.status || (review.risk_score !== undefined && review.risk_score > 0)"
    :gutter="16" 
    class="status-risk-row"
  >
    <!-- Status -->
    <Col :span="12" v-if="review.status">
      <Card class="status-card" :bordered="false">
        <div class="card-label">
          <InfoCircleOutlined class="card-icon" />
          <Typography.Text strong>Status</Typography.Text>
        </div>
        <div class="card-value">
          <Tag 
            :color="review.status === 'REVISION_REQUIRED' ? 'warning' : 
                    review.status === 'APPROVED' || review.status === 'PASS' ? 'success' : 
                    review.status === 'REJECTED' || review.status === 'FAIL' ? 'error' : 'default'"
            class="status-tag"
          >
            {{ translateStatus(review.status) }}
          </Tag>
        </div>
      </Card>
    </Col>

    <!-- Risk Score -->
    <Col :span="12" v-if="review.risk_score !== undefined && review.risk_score > 0">
      <Card class="risk-score-card" :bordered="false">
        <div class="card-label">
          <WarningOutlined class="card-icon" />
          <Typography.Text strong>Risk Score</Typography.Text>
          <Tooltip placement="top">
            <template #title>
              <div style="max-width: 300px; line-height: 1.6;">
                <div style="margin-bottom: 8px;"><strong>Low Score (0-20):</strong> Low risk products that typically require minimal review. This covers the majority of "good" vendors.</div>
                <div style="margin-bottom: 8px;"><strong>Medium Score (21-50):</strong> Moderate risk products that may need revision. The AI provides feedback for these listings.</div>
                <div><strong>High Score (51-100):</strong> High risk products requiring manual intervention. These listings need careful review by your staff. Typically only 5-10% of total volume, keeping your team efficient.</div>
              </div>
            </template>
            <span>
              <QuestionCircleOutlined class="risk-score-info-icon" />
            </span>
          </Tooltip>
        </div>
        <div class="card-value">
          <Tag 
            :color="review.risk_score >= 51 ? 'error' : 
                    review.risk_score >= 21 ? 'warning' : 'success'"
            class="risk-tag"
          >
            {{ review.risk_score }}
          </Tag>
        </div>
      </Card>
    </Col>
  </Row>
</template>

<style scoped>
.status-risk-row {
  margin-bottom: 0;
}

.status-card,
.risk-score-card {
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.status-card:hover,
.risk-score-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.status-card :deep(.ant-card-body),
.risk-score-card :deep(.ant-card-body) {
  padding: 16px;
}

.card-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: #595959;
  font-size: 13px;
}

.card-icon {
  font-size: 16px;
  color: #8c8c8c;
}

.risk-score-info-icon {
  font-size: 14px;
  color: #8c8c8c;
  cursor: help;
  margin-left: 4px;
  transition: color 0.2s ease;
}

.risk-score-info-icon:hover {
  color: #1890ff;
}

.card-value {
  display: flex;
  align-items: center;
}

.status-tag,
.risk-tag {
  font-size: 16px;
  padding: 6px 16px;
  font-weight: 600;
  border-radius: 6px;
}

@media screen and (max-width: 768px) {
  .status-risk-row {
    flex-direction: column;
  }
  
  .status-risk-row :deep(.ant-col) {
    width: 100% !important;
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }
}
</style>
