<script setup lang="ts">
  import { onMounted, defineAsyncComponent } from 'vue'
  import { Row, Col } from 'ant-design-vue'
  import { useDashboardStore } from '../stores/dashboard.store'

  const Filter = defineAsyncComponent(() => import('./Filter.vue'))
  const Metrics = defineAsyncComponent(() => import('./Metrics.vue'))
  const TopVendors = defineAsyncComponent(() => import('./TopVendors.vue'))
  const PendingVendors = defineAsyncComponent(() => import('./PendingVendors.vue'))
  const HelpFulLinks = defineAsyncComponent(() => import('./HelpFulLinks.vue'))
  const LicenseInfo = defineAsyncComponent(() => import('./LicenseInfo.vue'))
  const CrossPromo = defineAsyncComponent(() => import('./CrossPromo.vue'))
  const dashboardStore = useDashboardStore()

  onMounted(() => {
    dashboardStore.fetchDashboardData()
  })

</script>
<template>
  <div class="dashboard-container">
    <Col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :xxl="20" class="main-content">
    <!-- Header Section (Filter) -->
    <Row>
      <Col :span="24">
      <div class="filter-card">
        <Filter />
      </div>
      </Col>
    </Row>

    <!-- Main Content and Sidebar -->
    <Row :gutter="24">
      <!-- Main Content (Left) -->
      <Col :xs="24" :sm="24" :md="24" :lg="18" :xl="18" :xxl="20">
      <!-- Metrics Section -->
      <Metrics />

      <!-- Vendors Sections -->
      <TopVendors />
      <PendingVendors />
      </Col>

      <!-- Sidebar (Right) -->
      <Col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" :xxl="4" class="sidebar-column">
      <CrossPromo />
      <HelpFulLinks />
      <LicenseInfo />
      </Col>
    </Row>
    </Col>
  </div>
</template>

<style scoped>
  .dashboard-container {
    padding: 0;
    background-color: #F0F0F1;
    min-height: 100vh;
  }

  .filter-card {
    margin-bottom: 24px;
  }

  .sidebar-column {
    position: sticky;
    top: 24px;
    height: fit-content;
    align-self: flex-start;
  }

  @media (max-width: 992px) {
    .sidebar-column {
      position: static;
    }
  }

  @media (max-width: 768px) {
    .dashboard-container {
      padding: 16px;
    }
  }
</style>