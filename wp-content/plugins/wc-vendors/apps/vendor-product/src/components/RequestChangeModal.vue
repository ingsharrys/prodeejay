<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Modal, Input as AntInput, Checkbox, Typography } from 'ant-design-vue'
import { getI18n } from '../helpers/i18n.helper'
import type { Product } from '../types'

const props = defineProps<{
  open: boolean
  product: Product | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'confirm': [message: string, includeSuggestions: boolean]
}>()

const changeRequestMessage = ref<string>('')
const includeSuggestions = ref<boolean>(false)

watch(() => props.product, (product) => {
  if (product) {
    // Pre-populate with vendor feedback from AI review if available
    let initialMessage = ''
    if (product.ai_review && typeof product.ai_review === 'object' && 'vendor_feedback' in product.ai_review && product.ai_review.vendor_feedback) {
      initialMessage = product.ai_review.vendor_feedback
    }
    changeRequestMessage.value = initialMessage
    
    // Check if suggestions are available
    const hasSuggestions = product.ai_review && 
      typeof product.ai_review === 'object' && 
      'suggestions' in product.ai_review && 
      Array.isArray(product.ai_review.suggestions) && 
      product.ai_review.suggestions.length > 0
    includeSuggestions.value = hasSuggestions ? true : false
  } else {
    changeRequestMessage.value = ''
    includeSuggestions.value = false
  }
}, { immediate: true })

const handleOk = () => {
  emit('confirm', changeRequestMessage.value, includeSuggestions.value)
  emit('update:open', false)
}

const handleCancel = () => {
  emit('update:open', false)
}

const hasSuggestions = computed(() => {
  return props.product && 
    props.product.ai_review && 
    typeof props.product.ai_review === 'object' && 
    'suggestions' in props.product.ai_review && 
    Array.isArray(props.product.ai_review.suggestions) && 
    props.product.ai_review.suggestions.length > 0
})
</script>

<template>
  <Modal
    :open="open"
    :title="getI18n('requestChange')"
    :ok-text="getI18n('send') || 'Send'"
    :cancel-text="getI18n('cancel') || 'Cancel'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div style="margin-bottom: 16px">
      <Typography.Text>{{ getI18n('changeRequestMessage') || 'Please provide details about what needs to be changed:' }}</Typography.Text>
    </div>
    <AntInput.TextArea
      v-model:value="changeRequestMessage"
      :placeholder="getI18n('enterChangeRequest') || 'Enter change request message...'"
      :rows="4"
      :maxlength="500"
      style="margin-bottom: 16px"
    />
    <Checkbox
      v-if="hasSuggestions"
      v-model:checked="includeSuggestions"
    >
      {{ getI18n('includeSuggestions') || 'Include AI review suggestions in email' }}
    </Checkbox>
  </Modal>
</template>
