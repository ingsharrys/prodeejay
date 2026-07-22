<script setup lang="ts">
  import { computed } from 'vue'
  import { Card, Button, Badge, notification, Typography, Skeleton } from 'ant-design-vue'
  import { KeyIcon, SettingsIcon } from 'lucide-vue-next'
  import { useDashboardStore } from '../stores/dashboard.store'
  import type { LicenseInfo } from '../types'
  import { activatePlugin, getPremiumPlugins } from '../api/DashboardAPI'
  import { i18n } from '@/helpers/dashboard.helper'
  const dashboardStore = useDashboardStore()

  const licenses = computed(() => dashboardStore.dashboardData?.data.license_status || [])

  const isLoading = computed(() => {
    return !dashboardStore.dashboardData
  })

  // Helper function to determine if license is installed
  const isLicenseInstalled = (license: LicenseInfo) => {
    return license.installed === true
  }

  // Helper function to determine if license is active
  const isLicenseActive = (license: LicenseInfo) => {
    // First check if it's installed
    if (!isLicenseInstalled(license)) {
      return false
    }

    return license.status === 'active' || license.active === true
  }

  // Helper function to get badge status
  const getBadgeStatus = (license: LicenseInfo) => {
    if (!isLicenseInstalled(license)) {
      return 'default' // Gray for not installed
    }
    return isLicenseActive(license) ? 'success' : 'error'
  }

  // Helper function to get status text
  const getStatusText = (license: LicenseInfo) => {
    if (!isLicenseInstalled(license)) {
      return i18n().licenses.notInstalled
    }
    return isLicenseActive(license) ? i18n().licenses.active : i18n().licenses.inactive
  }

  // Get the pricing URL from window data
  const getPricingUrl = () => {
    return window.wcv_dashboard_data?.pricing_url || '#'
  }

  const handleManageLicenses = () => {
    window.location.href = window.wcv_dashboard_data.manage_licenses_url
  }

  const getRequiresPluginName = (license: LicenseInfo) => {
    return license.need_to_activate ? Object.values(license.need_to_activate).join(', ') : ''
  }

  const handleActivatePlugin = async (pluginSlug: string) => {
    try {
      const response = await activatePlugin(pluginSlug)

      if (response.success) {
        notification.success({
          message: i18n().licenses.success,
          description: response.data || i18n().licenses.pluginActivatedSuccessfully,
          placement: 'topRight',
          duration: 4
        })

        const premiumPlugins = await getPremiumPlugins()
        if (dashboardStore.dashboardData && dashboardStore.dashboardData.data) {
          dashboardStore.dashboardData.data.license_status = premiumPlugins
        }
      } else {
        notification.error({
          message: i18n().licenses.error,
          description: response.data || i18n().licenses.failedToActivatePlugin,
          placement: 'topRight',
          duration: 4
        })
      }
    } catch (error) {
      notification.error({
        message: i18n().licenses.error,
        description: i18n().licenses.unexpectedError,
        placement: 'topRight',
        duration: 4
      })
    }
  }
</script>

<template>
  <Card class="license-info-card">
    <div class="header">
      <div class="title">
        <KeyIcon class="icon" :size="24" />
        {{ i18n().licenses.title }}
      </div>
    </div>

    <div class="license-list">
      <!-- Skeleton loading state -->
      <template v-if="isLoading">
        <div v-for="i in 3" :key="i" class="license-item">
          <Skeleton active :paragraph="{ rows: 1 }" :title="{ width: '50%' }" />
          <div class="license-status">
            <Skeleton.Button active size="small" shape="round" :style="{ width: '80px' }" />
          </div>
        </div>
      </template>

      <!-- Actual license items when loaded -->
      <template v-else>
        <div v-for="item in licenses" :key="item.key" class="license-item">
          <div class="license-name">
            {{ item.name }}
          </div>
          <!-- Show desc of not installed -->
          <div v-if="!isLicenseInstalled(item)" class="license-desc">
            <Typography.Text :style="{ color: '#8c8c8c', fontSize: '12px' }">
              {{ item.desc }}
            </Typography.Text>
          </div>
          <div class="license-action-link">
            <a v-if="!isLicenseInstalled(item)" :href="item.upgrade_link || getPricingUrl()" class="license-action-link"
              :title="i18n().licenses.getNow">
              {{ i18n().licenses.getNow }}
            </a>
            <Button
              v-else-if="!isLicenseActive(item) && isLicenseInstalled(item) && getRequiresPluginName(item).length === 0"
              type="link" :style="{ padding: 0 }" class="license-action-link" :title="i18n().licenses.activate"
              @click="handleActivatePlugin(item.basename || '')">
              {{ i18n().licenses.activate }}
            </Button>
            <div v-if="getRequiresPluginName(item).length > 0 && !isLicenseActive(item) && isLicenseInstalled(item)">
              <Typography.Text :style="{ color: '#8c8c8c', fontSize: '12px' }">
                {{ i18n().licenses.requires + ': ' + getRequiresPluginName(item) + ' ' + i18n().licenses.toBeActive }}
              </Typography.Text>
            </div>
          </div>
          <div v-if="isLicenseInstalled(item) && isLicenseActive(item) && item.expires" class="license-status-row">
            <div class="license-label">
              {{ i18n().licenses.expires }}
            </div>
            <div class="license-value">
              {{ item.expires || '-' }}
            </div>
          </div>
          <div class="license-status">
            <Badge :status="getBadgeStatus(item)" :text="getStatusText(item)" />
          </div>
        </div>
      </template>
    </div>

    <div class="footer">
      <template v-if="isLoading">
        <Skeleton.Button active block :style="{ height: '32px' }" />
      </template>
      <Button v-else type="default" block @click="handleManageLicenses">
        <SettingsIcon class="icon" :size="17" :style="{ marginRight: '8px', verticalAlign: 'middle' }" /> <span
          class="text">{{ i18n().licenses.manage }}</span>
      </Button>
    </div>
  </Card>
</template>

<style scoped>
  :deep(.ant-card-body) {
    padding: 0;
  }

  .license-info-card {
    border-radius: 8px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 0;
  }

  .header {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon {
    color: #52c41a;
  }

  .license-list {
    padding: 0;
  }

  .license-item {
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
  }

  .license-item:last-child {
    border-bottom: none;
  }

  .license-name {
    font-weight: 600;
    font-size: 16px;
    color: #262626;
    margin-bottom: 8px;
    max-width: 70%;
    overflow: hidden;

    word-break: break-word;
  }

  .license-status-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .license-label {
    color: #8c8c8c;
    font-size: 14px;
  }

  .license-value {
    font-size: 14px;
    color: #262626;
  }

  .license-status {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .license-action-link {
    font-size: 14px;
    color: #1890ff;
    text-decoration: none;
  }

  .footer {
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
  }
</style>