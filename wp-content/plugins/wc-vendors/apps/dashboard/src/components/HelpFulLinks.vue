<script setup lang="ts">
  import { Card } from 'ant-design-vue'
  import {
    BookOpen,
    Settings,
    TrendingUp,
    FileText,
    HelpCircle,
    ExternalLink
  } from 'lucide-vue-next'
  import { HelpfulResource } from '../types'
  import { ref } from 'vue'
  import { i18n } from '@/helpers/dashboard.helper'
  // Data for helpful resources
  const resourceLinks: HelpfulResource[] = ref(window.wcv_dashboard_data.helpful_resources)

  // Map resource types to Lucide icons
  const iconMap = {
    guide: BookOpen,
    settings: Settings,
    growth: TrendingUp,
    documentation: FileText,
    support: HelpCircle,
    default: ExternalLink
  }

  // Get icon component based on resource type
  const getIcon = (type: string) => {
    return iconMap[type as keyof typeof iconMap] || iconMap.default
  }
</script>

<template>
  <Card class="helpful-links-card">
    <div class="header">
      <div class="title">
        <BookOpen class="icon" :size="24" />
        {{ i18n().resources.title }}
      </div>
    </div>

    <div class="resource-list">
      <div v-for="(item, index) in resourceLinks" :key="index" class="resource-item">
        <a :href="item.url" class="resource-content" target="_blank" rel="noopener">
          <div class="icon-container" :style="{ backgroundColor: item.iconBg }">
            <component :is="getIcon(item.type)" :size="20" :color="item.iconColor" />
          </div>
          <div class="resource-text">
            <div class="resource-title">{{ item.title }}
              <ExternalLink class="icon" :size="12" />
            </div>
            <div class="resource-description">{{ item.description }}</div>
          </div>
        </a>
      </div>
    </div>
  </Card>
</template>

<style scoped>
  :deep(.ant-card-body) {
    padding: 0;
  }

  .helpful-links-card {
    border-radius: 8px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    overflow: hidden;
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
    color: #1677ff;
  }

  .resource-list {
    padding: 12px 0;
  }

  .resource-item {
    padding: 20px;
    position: relative;
    border-bottom: 1px solid #f0f0f0;
  }

  .resource-item:last-child {
    border-bottom: none;
  }

  .resource-content {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: inherit;
  }

  .resource-content:active,
  .resource-content:focus {
    outline: none;
    box-shadow: none;
  }

  .resource-content:hover .resource-title {
    color: #1677ff;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .resource-text {
    display: flex;
    flex-direction: column;
  }

  .resource-title {
    font-weight: 600;
    font-size: 14px;
    color: #262626;
    margin-bottom: 2px;
    transition: color 0.3s;
  }

  .resource-description {
    color: #8c8c8c;
    font-size: 12px;
  }
</style>