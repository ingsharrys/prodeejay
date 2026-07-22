<script setup lang="ts">
  import { computed, h } from 'vue'
  import { Table, Card, Typography, Avatar, Flex } from 'ant-design-vue'
  import type { TableColumnType, TableColumnsType } from 'ant-design-vue'
  import { Trophy, Award } from 'lucide-vue-next'
  import { useDashboardStore } from '../stores/dashboard.store'
  import type { TopVendor } from '../types'
  import { i18n, formatCurrency } from '@/helpers/dashboard.helper'

  const dashboardStore = useDashboardStore()
  const period = computed(() => dashboardStore.period)
  const startDate = computed(() => dashboardStore.startDate)
  const endDate = computed(() => dashboardStore.endDate)

  // Base data from store
  const topVendors = computed(() => {
    return dashboardStore.dashboardData?.data?.top_vendors || []
  })

  const isLoading = computed(() => {
    return dashboardStore.isLoading
  })

  // Table columns definition
  const columns: TableColumnsType<TopVendor> = [
    {
      title: i18n().topVendors.table.vendor,
      dataIndex: 'shop_name',
      key: 'shop_name',
      width: '30%',
      customRender: ({ record }) => {
        // Add null check before accessing shop_name
        if (!record || !record.shop_name) {
          return h(
            Flex,
            { align: 'center', gap: 'small' },
            {
              default: () => [
                h(Avatar, {
                  style: { backgroundColor: '#d9d9d9', verticalAlign: 'middle' },
                  size: { xs: 24, sm: 24, md: 32, lg: 32, xl: 32, xxl: 32 }
                }, { default: () => '?' }),
                h('span', i18n().topVendors.table.unknownVendor)
              ]
            }
          )
        }

        // Generate avatar from shop name initials
        const initials = record.shop_name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()

        // Base avatar color on vendor id for consistency
        const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068']
        const colorIndex = parseInt(record.vendor_id || '0', 10) % colors.length

        return h(
          Flex,
          { align: 'center', gap: 'small' },
          {
            default: () => [
              h(Avatar, {
                style: { backgroundColor: colors[colorIndex], verticalAlign: 'middle' },
                size: { xs: 24, sm: 24, md: 32, lg: 32, xl: 32, xxl: 32 },
                src: record.avatar
              }, { default: () => initials }),
              h('span', record.shop_name)
            ]
          }
        )
      }
    },
    {
      title: i18n().topVendors.table.revenue,
      dataIndex: 'total_revenue',
      key: 'total_revenue',
      customRender: ({ value }) => {
        return formatCurrency(value)
      },
      sorter: (a: TopVendor, b: TopVendor) => {
        return a.total_revenue - b.total_revenue
      }
    },
    {
      title: i18n().topVendors.table.orders,
      dataIndex: 'total_orders',
      key: 'total_orders',
      sorter: (a: TopVendor, b: TopVendor) => {
        return a.total_orders - b.total_orders
      }
    },
    {
      title: i18n().topVendors.table.commissions,
      dataIndex: 'total_commission',
      key: 'total_commission',
      customRender: ({ value }) => {
        return formatCurrency(value)
      },
      sorter: (a: TopVendor, b: TopVendor) => {
        return a.total_commission - b.total_commission
      }
    }
  ]

  if (window.wcv_dashboard_data.is_rating_active === 'true') {
    columns.push({
      title: i18n().topVendors.table.rating,
      dataIndex: 'rating',
      key: 'rating',
      responsive: ['md'],
      customRender: ({ value }) => {
        const rating = value
        return h(
          Flex,
          { align: 'center', gap: 'small' },
          {
            default: () => [
              h(Award, { size: 16, style: { color: '#faad14' } }),
              h('span', null, rating)
            ]
          }
        )
      },
      sorter: (a: TopVendor, b: TopVendor) => {
        return a.rating - b.rating
      }
    } as TableColumnType<TopVendor>)
  }

  const getPeriodLabel = computed(() => {
    if (period.value.value === 'custom') {
      if (startDate.value && endDate.value) {
        return `${startDate.value} - ${endDate.value}`
      }
      return i18n().topVendors.custom
    }
    return period.value.label
  })

</script>

<template>
  <Card class="vendors-card" :loading="isLoading" :bordered="false">
    <template #title>
      <Flex align="center" gap="small">
        <Trophy :color="'#1668dc'" :size="24" />
        <Typography.Title :level="5" style="margin: 0;">
          {{ i18n().topVendors.title }}
        </Typography.Title>
      </Flex>
    </template>

    <template #extra>
      <Flex align="center" gap="small" justify="end">
        <Typography.Text type="secondary">
          {{ i18n().period + ': ' }}
          {{ getPeriodLabel }}
        </Typography.Text>
      </Flex>
    </template>

    <Table :data-source="topVendors" :columns="columns" :pagination="false"
      :row-key="(record: TopVendor) => record.vendor_id" :loading="isLoading" :locale="{
        emptyText: h('div', { class: 'empty-table' }, [
          h('p', i18n().topVendors.noData),
        ])
      }" size="middle" />
  </Card>
</template>

<style scoped>
  .vendors-card {
    margin-bottom: 24px;
  }

  :deep(.ant-card-head) {
    min-height: 48px;
  }

  :deep(.ant-table-cell) {
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr > td) {
    transition: background 0.3s;
  }

  :deep(.ant-table-tbody > tr:hover > td) {
    background: #f5f5f5;
  }

  .button-icon {
    margin-left: 4px;
    vertical-align: -0.125em;
  }

  .empty-table {
    padding: 24px 0;
    text-align: center;
  }

  .empty-table p {
    margin: 8px 0;
  }

  :deep(.ant-table-container) {
    overflow-x: auto;
  }
</style>