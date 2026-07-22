<script setup lang="ts">
import { ref } from 'vue'
import { Input, Select, Space } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useProductStore } from '../stores/product.store'
import { getI18n } from '../helpers/i18n.helper'

const productStore = useProductStore()
const searchInput = ref<string>('')

const handleSearch = () => {
  productStore.setSearch(searchInput.value)
}

const handleVendorChange = (value: number | undefined) => {
  productStore.setVendorFilter(value)
}
</script>

<template>
  <Space :size="12" align="center" class="search-filter-container">
    <Input
      v-model:value="searchInput"
      :placeholder="getI18n('searchProducts')"
      class="search-input"
      @press-enter="handleSearch"
    >
      <template #prefix>
        <SearchOutlined />
      </template>
    </Input>
    <Select
      :value="productStore.selectedVendorId"
      :placeholder="getI18n('filterByVendor')"
      class="filter-select"
      allow-clear
      :loading="productStore.isLoadingVendors"
      @change="handleVendorChange"
    >
      <Select.Option
        v-for="vendor in productStore.vendors"
        :key="vendor.id"
        :value="vendor.id"
      >
        {{ vendor.name }}
      </Select.Option>
    </Select>
  </Space>
</template>

<style scoped>
.search-filter-container {
  display: flex;
  align-items: center;
}

.search-input,
.filter-select {
  width: 200px;
  height: 32px;
}

:deep(.ant-input-affix-wrapper) {
  height: 32px;
  display: flex;
  align-items: center;
}

:deep(.ant-select-selector) {
  height: 32px !important;
  display: flex;
  align-items: center;
}

:deep(.ant-select-selection-item),
:deep(.ant-select-selection-placeholder) {
  line-height: 30px;
  display: flex;
  align-items: center;
}
</style>
