<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { Card, Tag, Button, Typography, Space, notification, Avatar } from 'ant-design-vue'
  import { DownloadOutlined, RocketOutlined } from '@ant-design/icons-vue'
  import type { PromotionPlugin } from '../types/promo.types'
  import { installAndActivatePlugin, activatePlugin } from '../api/DashboardAPI'
  import { i18n } from '@/helpers/dashboard.helper'
  
  const installing = ref(false)
  const activating = ref(false)
  const pluginInstalled = ref(false)
  const pluginActive = ref(false)

  const promotionPlugin = computed(() => window.wcv_dashboard_data?.promotion_plugin as PromotionPlugin || null)
  const isInstalled = computed(() => pluginInstalled.value || promotionPlugin.value?.isInstalled || false)
  const isActive = computed(() => pluginActive.value || promotionPlugin.value?.isActive || false)
  const isDisabled = computed(() => isActive.value)

  const handleInstallAndActivate = async () => {
    if (!promotionPlugin.value) return
    
    installing.value = true
    try {
      const response = await installAndActivatePlugin(promotionPlugin.value.slug)
      if (response.success) {
        notification.success({
          message: i18n().promo.installSuccessfully,
          description: i18n().promo.installAndActivateSuccessfully,
          placement: 'topRight',
          duration: 4
        })
        // Update local state
        pluginInstalled.value = true
        pluginActive.value = true
        // Update global data
        if (window.wcv_dashboard_data?.promotion_plugin) {
          window.wcv_dashboard_data.promotion_plugin.isInstalled = true
          window.wcv_dashboard_data.promotion_plugin.isActive = true
        }
      } else {
        notification.error({
          message: i18n().promo.installFailed,
          description: response.data || i18n().promo.installAndActivateFailed,
          placement: 'topRight',
          duration: 4
        })
      }
    } catch (error) {
      notification.error({
        message: i18n().promo.installFailed,
        description: error instanceof Error ? error.message : i18n().promo.installAndActivateFailed,
        placement: 'topRight',
        duration: 4
      })
    } finally {
      installing.value = false
    }
  }

  const handleActivate = async () => {
    if (!promotionPlugin.value) return
    activating.value = true
    try {
      const response = await activatePlugin(promotionPlugin.value.basename)
      if (response.success) {
        notification.success({
          message: i18n().promo.activateSuccessfully,
          description: response.data || i18n().promo.pluginActivatedSuccessfully,
          placement: 'topRight',
          duration: 4
        })
        // Update local state
        pluginActive.value = true
        // Update global data
        if (window.wcv_dashboard_data?.promotion_plugin) {
          window.wcv_dashboard_data.promotion_plugin.isActive = true
        }
      } else {
        notification.error({
          message: i18n().promo.activateFailed,
          description: response.data || i18n().promo.activateFailed,
          placement: 'topRight',
          duration: 4
        })
      }
    } catch (error) {
      notification.error({
        message: i18n().promo.activateFailed,
        description: error instanceof Error ? error.message : i18n().promo.activateFailed,
        placement: 'topRight',
        duration: 4
      })
    } finally {
      activating.value = false
    }
  }

  const buttonColor = computed(() => {
    if (isDisabled.value) {
      return { backgroundColor: '#d1d5db', borderColor: '#d1d5db' }
    }
    if (isInstalled.value && !isActive.value) {
      return { backgroundColor: '#f59e0b', borderColor: '#f59e0b' }
    }
    return { backgroundColor: '#16a34a', borderColor: '#16a34a' }
  })

  const handleButtonClick = () => {
    if (isDisabled.value) return
    if (!isInstalled.value) {
      handleInstallAndActivate()
    } else if (!isActive.value) {
      handleActivate()
    }
  }

  const isLoading = computed(() => installing.value || activating.value)

  const buttonText = computed(() => {
    if (installing.value) {
      return i18n().promo.installing
    }
    if (activating.value) {
      return i18n().promo.activating
    }
    if (isDisabled.value) {
      return i18n().promo.activated
    }
    if (!isInstalled.value) {
      return i18n().promo.installAndActivateButton
    }
    if (!isActive.value) {
      return i18n().promo.activateNowButton
    }
    return ''
  })

</script>

<template>
  <Card
    v-if="promotionPlugin"
    class="promo-card"
  >
    <Space direction="vertical" :size="12" style="width: 100%">
      <Space :size="8" wrap style="margin-bottom: 18px;">
        <Tag :bordered="false" class="plugin-tag" :color="promotionPlugin.type === 'free' ? 'geekblue' : 'yellow'">
          {{ promotionPlugin.type === 'free' ? i18n().promo.free : i18n().promo.premium }}
        </Tag>
        <Tag :bordered="false" class="plugin-tag" color="gold">{{ i18n().promo.recommended }}</Tag>
      </Space>

      <Space :size="12" align="start">
        <Avatar :src="promotionPlugin.icon" shape="square" :alt="promotionPlugin.name" size="large" />
        <Typography.Title :level="5" style="margin-bottom: 0; margin-top: 0; line-height: 1.2">
          {{ promotionPlugin.name }}
        </Typography.Title>
      </Space>

      <Typography.Paragraph type="secondary" style="margin-bottom: 0;">
          {{ promotionPlugin.description }}
      </Typography.Paragraph>
      
      <Button
        :type="isDisabled ? 'default' : 'primary'"
        block
        :loading="isLoading"
        :disabled="isDisabled"
        @click="handleButtonClick"
        :style="buttonColor"
      >
        <template #icon v-if="!isDisabled && !isLoading">
          <DownloadOutlined v-if="!isInstalled" />
          <RocketOutlined v-else />
        </template>
        {{ buttonText }}
      </Button>
    </Space>
  </Card>
</template>

<style scoped>
.promo-card {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.promo-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease-in-out;
}

.plugin-logo {
  margin: 4px 0;
}

.plugin-tag {
  transform: scale(1.1);
  border-radius: 16px;
  padding: 2px 14px;
  font-weight: 500;
}

:deep(.ant-btn-primary:not(:disabled):hover) {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
}

:deep(.ant-btn-primary:not(:disabled):active) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>