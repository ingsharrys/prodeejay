<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent, computed } from 'vue'
import { Card, Table, Typography, Tabs, TabPane } from 'ant-design-vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import { useProductStore } from '../stores/product.store'
import { getI18n } from '../helpers/i18n.helper'
import { useProductTableColumns } from '../composables/useProductTableColumns'
import type { Product, AIReview } from '../types'
import SearchFilters from './SearchFilters.vue'

// Lazy load heavy components for code splitting
const RequestChangeModal = defineAsyncComponent(() => import('./RequestChangeModal.vue'))
const AIReviewDrawer = defineAsyncComponent(() => import('./AIReview/AIReviewDrawer.vue'))

const productStore = useProductStore()
const activeTab = ref<string>(productStore.status)
const showRequestChangeModal = ref<boolean>(false)
const selectedProduct = ref<Product | null>(null)
const showAIReviewDrawer = ref<boolean>(false)
const selectedAIReview = ref<AIReview | null>(null)
const selectedProductName = ref<string>('')

const paginationConfig = computed<TablePaginationConfig>(() => ({
  current: productStore.pagination.current_page,
  pageSize: productStore.pagination.per_page,
  total: productStore.pagination.total,
  showSizeChanger: true,
  showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`,
  pageSizeOptions: ['5', '10', '15', '20', '50', '100']
}))

const handleTableChange = (paginationInfo: TablePaginationConfig) => {
  if (paginationInfo.pageSize !== productStore.pagination.per_page) {
    productStore.setPageSize(paginationInfo.pageSize ?? 10)
  } else if (paginationInfo.current !== productStore.pagination.current_page) {
    productStore.setPage(paginationInfo.current ?? 1)
  }
}

onMounted(() => {
  productStore.fetchVendors()
  productStore.fetchProducts()
})

const handleApprove = async (product: Product) => {
  await productStore.approveProductAction(product.id)
}

const handleRequestChange = (product: Product) => {
  selectedProduct.value = product
  showRequestChangeModal.value = true
}

const handleRequestChangeConfirm = async (message: string, includeSuggestions: boolean) => {
  if (selectedProduct.value) {
    await productStore.requestProductChangeAction(selectedProduct.value.id, message, includeSuggestions)
    showRequestChangeModal.value = false
    selectedProduct.value = null
  }
}

const handleUnpublish = async (product: Product) => {
  await productStore.unpublishProductAction(product.id)
}

const handleView = (product: Product) => {
  if (product.permalink) {
    window.open(product.permalink, '_blank')
  } else {
    // Fallback if permalink is not available
    window.open(`/wp-admin/post.php?post=${product.id}&action=edit`, '_blank')
  }
}

const handleEdit = (product: Product) => {
  window.open(`/wp-admin/post.php?post=${product.id}&action=edit`, '_blank')
}

const handleTabChange = (key: string) => {
  activeTab.value = key
  productStore.setStatus(key as 'published' | 'pending' | 'draft')
}

const handleViewAIReview = (product: Product) => {
  if (product.ai_review && typeof product.ai_review === 'object' && Object.keys(product.ai_review).length > 0) {
    selectedAIReview.value = product.ai_review as AIReview
    selectedProductName.value = product.name
    showAIReviewDrawer.value = true
  }
}

const hasAIReview = (product: Product): boolean => {
  return !!(product.ai_review && typeof product.ai_review === 'object' && Object.keys(product.ai_review).length > 0)
}

const { columns } = useProductTableColumns(
  handleApprove,
  handleRequestChange,
  handleUnpublish,
  handleView,
  handleEdit,
  handleViewAIReview,
  hasAIReview
)
</script>

<template>
  <Card :bordered="false">
    <template #title>
      <Typography.Title :level="4" style="margin: 0">
        {{ getI18n('products') }}
      </Typography.Title>
    </template>
    <template #extra>
      <SearchFilters />
    </template>
    <Tabs
      v-model:activeKey="activeTab"
      @change="handleTabChange"
    >
      <TabPane
        key="published"
        :tab="getI18n('publishedProducts')"
      >
        <Table
          :columns="columns"
          :data-source="productStore.products"
          :loading="productStore.isLoading"
          :pagination="paginationConfig"
          row-key="id"
          @change="handleTableChange"
        />
      </TabPane>
      <TabPane
        key="pending"
        :tab="getI18n('pendingProducts')"
      >
        <Table
          :columns="columns"
          :data-source="productStore.products"
          :loading="productStore.isLoading"
          :pagination="paginationConfig"
          row-key="id"
          @change="handleTableChange"
        />
      </TabPane>
      <TabPane
        key="draft"
        :tab="getI18n('draftProducts')"
      >
        <Table
          :columns="columns"
          :data-source="productStore.products"
          :loading="productStore.isLoading"
          :pagination="paginationConfig"
          row-key="id"
          @change="handleTableChange"
        />
      </TabPane>
    </Tabs>
    
    <RequestChangeModal
      v-model:open="showRequestChangeModal"
      :product="selectedProduct"
      @confirm="handleRequestChangeConfirm"
    />

    <AIReviewDrawer
      v-model:open="showAIReviewDrawer"
      :review="selectedAIReview"
      :product-name="selectedProductName"
    />
  </Card>
</template>

<style scoped>
:deep(.ant-table) {
  font-size: 14px;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #fafafa;
  font-weight: 600;
}

:deep(.ant-card-head) {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 24px;
}

:deep(.ant-card-head-title) {
  padding: 0;
}

:deep(.ant-card-head-extra) {
  padding: 0;
}

:deep(.ant-card-body) {
  padding: 24px;
}

:deep(.ant-tabs) {
  margin-top: 0;
}

:deep(.ant-tabs-nav) {
  margin-bottom: 16px;
}

:deep(.ant-table-tbody > tr > td) {
  vertical-align: middle;
}

:deep(.ant-table-tbody > tr > td .ant-space) {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;
}

:deep(.ant-table-thead > tr > th.ant-table-cell) {
  white-space: nowrap;
}

:deep(.ant-space-item) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.ant-btn-link) {
  height: 28px;
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  line-height: 1.5715;
}

:deep(.ant-btn-sm) {
  height: 28px;
  padding: 0 12px;
  font-size: 14px;
}

/* Button color improvements for better UX */
:deep(.btn-ai-review) {
  color: #1890ff;
  font-weight: 500;
}

:deep(.btn-ai-review:hover) {
  color: #40a9ff;
}

:deep(.btn-ai-review .anticon) {
  color: #1890ff;
}

:deep(.btn-request-change) {
  color: #fa8c16;
  border-color: #ffd591;
  background-color: #fff7e6;
}

:deep(.btn-request-change:hover) {
  color: #ffa940;
  border-color: #ffc069;
  background-color: #fffbe6;
}

:deep(.btn-request-change .anticon) {
  color: #fa8c16;
}

:deep(.btn-view) {
  color: #595959;
}

:deep(.btn-view:hover) {
  color: #1890ff;
}

:deep(.btn-view .anticon) {
  color: #8c8c8c;
}

:deep(.btn-edit) {
  color: #722ed1;
}

:deep(.btn-edit:hover) {
  color: #9254de;
}

:deep(.btn-edit .anticon) {
  color: #722ed1;
}
</style>
