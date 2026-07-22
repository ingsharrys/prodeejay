<script setup lang="ts">
  import { computed, h } from 'vue'
  import { i18n } from '@/helpers/dashboard.helper'
  import { List, Card, Avatar, Button, Typography, Flex, Space, Badge, Skeleton } from 'ant-design-vue'
  import { Clock, User, ChevronRight } from 'lucide-vue-next'
  import { useDashboardStore } from '../stores/dashboard.store'
  import type { Vendor } from '../types'

  const dashboardStore = useDashboardStore()

  // Get pending vendors from the store
  const pendingVendors = computed(() => {
    return dashboardStore.dashboardData?.data?.pending_vendors || []
  })

  const isLoading = computed(() => {
    return dashboardStore.isLoading
  })

  // Format date to display
  const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return date.toISOString().split('T')[0] // YYYY-MM-DD format
    } catch (e) {
      console.error('Error parsing date:', e)
      return ''
    }
  }
  const removeVendorFromPendingVendors = (vendorId: number) => {
    if (dashboardStore.dashboardData?.data) {
      dashboardStore.dashboardData.data.pending_vendors = dashboardStore.dashboardData.data.pending_vendors.filter(vendor => vendor.id !== vendorId)
    }
  }
  // Handler for approve button
  const handleApprove = async (vendor: Vendor) => {
    if (!vendor || !vendor.id) return
    await dashboardStore.setVendorApprovalAction(vendor.id, 'approve')
    removeVendorFromPendingVendors(vendor.id)
  }

  // Handler for reject button
  const handleReject = async (vendor: Vendor) => {
    if (!vendor || !vendor.id) return
    await dashboardStore.setVendorApprovalAction(vendor.id, 'deny')
    removeVendorFromPendingVendors(vendor.id)
  }

  // Handler for view all button
  const handleViewAll = () => {
    window.location.href = window.wcv_dashboard_data.all_vendors_page_url
  }

  // Render vendor name safely
  const renderVendorName = (name: string | undefined): string => {
    return name || i18n().pendingVendors.unknownVendor
  }
</script>

<template>
  <Card class="vendors-card" :loading="isLoading" :bordered="false">
    <template #title>
      <Flex align="center" gap="small">
        <Clock color="#fa8c16" :size="24" />
        <Typography.Title :level="5" style="margin: 0;">
          {{ i18n().pendingVendors.title }}
        </Typography.Title>
        <Badge :count="pendingVendors.length" :number-style="{ backgroundColor: '#ff4d4f' }" />
      </Flex>
    </template>

    <template #extra>
      <Button type="link" :style="{ color: '#fa8c16', padding: 0, display: 'flex', alignItems: 'center' }"
        @click="handleViewAll">
        <span style="vertical-align: middle;">{{ i18n().pendingVendors.viewAll }}</span>
        <ChevronRight class="chevron-right" color="#fa8c16" :size="16" />
      </Button>
    </template>

    <template v-if="isLoading">
      <div v-for="n in 3" :key="n" class="skeleton-item">
        <Skeleton avatar :paragraph="{ rows: 1 }" active />
      </div>
    </template>

    <List v-else item-layout="horizontal" :data-source="pendingVendors" :pagination="false" :loading="isLoading"
      :locale="{ emptyText: i18n().pendingVendors.noData }">
      <template #renderItem="{ item }">
        <List.Item>
          <List.Item.Meta class="list-item-meta">
            <template #avatar>
              <Avatar :style="{ backgroundColor: '#5cdbd3' }" :icon="h(User)" :src="item.avatar"
                :size="{ xs: 24, sm: 24, md: 32, lg: 32, xl: 32, xxl: 32 }" />
            </template>
            <template #title>
              <Typography.Title :level="5" :style="{ marginTop: '-1.33em' }">
                {{ renderVendorName(item.display_name) }}
              </Typography.Title>
            </template>
            <template #description>
              {{ i18n().pendingVendors.registered + ': ' + formatDate(item.registered) }}
            </template>
          </List.Item.Meta>
          <template #actions class="list-item-actions">
            <Space>
              <Button type="primary" style="background-color: #52c41a; border-color: #52c41a" :disabled="isLoading"
                @click="() => handleApprove(item)">
                {{ i18n().pendingVendors.actions.approve }}
              </Button>
              <Button danger :disabled="isLoading" @click="() => handleReject(item)">
                {{ i18n().pendingVendors.actions.reject }}
              </Button>
            </Space>
          </template>
        </List.Item>
      </template>
    </List>
  </Card>
</template>

<style scoped>
  .vendors-card {
    margin-bottom: 24px;
  }

  :deep(.ant-list-item) {
    padding: 12px 0;
  }

  :deep(.ant-list-item-meta-title) {
    margin-bottom: 4px;
  }

  :deep(.ant-card-head) {
    min-height: 48px;
  }

  .chevron-right {
    vertical-align: middle;
    margin-left: 4px;
  }

  .skeleton-item {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .skeleton-item:last-child {
    border-bottom: none;
  }

  @media screen and (max-width: 576px) {
    :deep(.ant-list-item) {
      flex-wrap: wrap;
    }

    .list-item-meta {
      flex: 100% 1 1 !important;
      width: 100%;
      flex-basis: 100%;
    }

    .list-item-actions {
      margin-left: 0;
    }

    :deep(.ant-list-item-action) {
      margin-inline-start: 41px;
      margin-top: 12px;
    }
  }
</style>