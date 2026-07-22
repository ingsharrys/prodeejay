<script setup lang="ts">
import { Drawer } from 'ant-design-vue'
import { getI18n } from '../../helpers/i18n.helper'
import type { AIReview } from '../../types'
import AIReviewHeader from './AIReviewHeader.vue'
import StatusRiskRow from './StatusRiskRow.vue'
import AuditResultsCard from './AuditResultsCard.vue'
import AdminNoteCard from './AdminNoteCard.vue'
import SuggestionsCard from './SuggestionsCard.vue'
import ImageReviewsCard from './ImageReviewsCard.vue'

const props = defineProps<{
  open: boolean
  review: AIReview | null
  productName: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const handleOpenChange = (val: boolean) => {
  emit('update:open', val)
}
</script>

<template>
  <Drawer
    :open="open"
    :title="getI18n('aiReview') || 'AI Review'"
    width="680"
    placement="right"
    :contentWrapperStyle="{ top: '32px' }"
    class="ai-review-drawer"
    @update:open="handleOpenChange"
  >
    <div v-if="review" class="ai-review-content">
      <!-- Product Name Header -->
      <AIReviewHeader :product-name="productName" />
      
      <!-- Status and Risk Score Row -->
      <StatusRiskRow :review="review" />

      <!-- Audit Results -->
      <AuditResultsCard 
        v-if="review.audit_results" 
        :audit-results="review.audit_results" 
      />

      <!-- Admin Note -->
      <AdminNoteCard 
        v-if="review.admin_logic" 
        :admin-logic="review.admin_logic" 
      />

      <!-- Suggestions -->
      <SuggestionsCard 
        v-if="review.suggestions" 
        :suggestions="review.suggestions" 
      />

      <!-- Image Reviews -->
      <ImageReviewsCard 
        v-if="review.image_reviews" 
        :image-reviews="review.image_reviews" 
      />
    </div>
  </Drawer>
</template>

<style scoped>
/* Fix drawer positioning to account for WordPress admin bar */
:deep(.ant-drawer) {
  top: 32px !important;
  height: calc(100vh - 32px) !important;
}

@media screen and (max-width: 782px) {
  :deep(.ant-drawer) {
    top: 46px !important;
    height: calc(100vh - 46px) !important;
  }
}

/* AI Review Drawer Styles */
.ai-review-drawer :deep(.ant-drawer-body) {
  padding: 24px;
  background-color: #f5f7fa;
}

.ai-review-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
