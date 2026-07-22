<script setup lang="ts">
  import { computed } from 'vue'
  import { Card, Flex, Typography, Skeleton } from 'ant-design-vue'
  import { DollarSign, ShoppingCart, Percent } from 'lucide-vue-next'
  import { useDashboardStore } from '../stores/dashboard.store'
  import { i18n, formatCurrency } from '@/helpers/dashboard.helper'

  const dashboardStore = useDashboardStore()

  // Computed properties for the metrics
  const revenue = computed(() => {
    return dashboardStore.dashboardData?.data?.revenue || 0
  })

  const commissions = computed(() => {
    return dashboardStore.dashboardData?.data?.commissions || 0
  })

  const orders = computed(() => {
    return dashboardStore.dashboardData?.data?.orders || 0
  })

  const isLoading = computed(() => {
    return dashboardStore.isLoading
  })
</script>

<template>
  <div class="metrics-container">
    <Flex wrap="wrap" gap="middle" justify="space-between">
      <!-- Skeleton Cards when loading -->
      <template v-if="isLoading">
        <Card v-for="i in 3" :key="i" :bordered="false" class="metric-card">
          <div class="card-content">
            <Skeleton.Avatar :size="64" active shape="circle" class="mb-16" />
            <Skeleton active title :paragraph="{ rows: 1, width: '80%' }" />
          </div>
        </Card>
      </template>

      <!-- Actual Cards when data is loaded -->
      <template v-else>
        <!-- Revenue Card -->
        <Card :bordered="false" class="metric-card">
          <div class="card-content">
            <div class="icon-wrapper revenue-bg">
              <DollarSign size="24" color="#356D1D" />
            </div>
            <Typography.Text class="metric-title">
              {{ i18n().metrics.marketplaceRevenue }}
            </Typography.Text>
            <Typography.Title :level="2" class="metric-value revenue-color">
              {{ formatCurrency(revenue) }}
            </Typography.Title>
          </div>
        </Card>

        <!-- Orders Card -->
        <Card :bordered="false" class="metric-card">
          <div class="card-content">
            <div class="icon-wrapper orders-bg">
              <ShoppingCart size="24" color="#2158DB" />
            </div>
            <Typography.Text class="metric-title">
              {{ i18n().metrics.marketplaceOrders }}
            </Typography.Text>
            <Typography.Title :level="2" class="metric-value orders-color">
              {{ orders }}
            </Typography.Title>
          </div>
        </Card>

        <!-- Commissions Card -->
        <Card :bordered="false" class="metric-card">
          <div class="card-content">
            <div class="icon-wrapper commission-bg">
              <Percent size="24" color="#6B2CEC" />
            </div>
            <Typography.Text class="metric-title">
              {{ i18n().metrics.marketplaceCommissions }}
            </Typography.Text>
            <Typography.Title :level="2" class="metric-value commission-color">
              {{ formatCurrency(commissions) }}
            </Typography.Title>
          </div>
        </Card>
      </template>
    </Flex>
  </div>
</template>

<style scoped>
  .metrics-container {
    margin-bottom: 24px;
  }

  .metric-card {
    flex: 1;
    min-width: 280px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    background-color: white;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 16px;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-bottom: 16px;
  }

  .revenue-bg {
    background-color: #e9f5e6;
  }

  .orders-bg {
    background-color: #e6eefe;
  }

  .commission-bg {
    background-color: #f2eaff;
  }

  .metric-title {
    font-size: 16px;
    color: #6c757d;
    margin-bottom: 8px;
  }

  .metric-value {
    margin: 8px 0 0 0 !important;
    font-weight: 600 !important;
  }

  .revenue-color {
    color: #4caf50 !important;
  }

  .orders-color {
    color: #2196f3 !important;
  }

  .commission-color {
    color: #9c27b0 !important;
  }

  .mb-16 {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .metric-card {
      min-width: 100%;
      margin-bottom: 16px;
    }
  }
</style>