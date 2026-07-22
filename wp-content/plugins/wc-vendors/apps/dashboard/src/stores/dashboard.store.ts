import { defineStore } from 'pinia'
import { getDashboardData, setVendorApproval } from '@/api/DashboardAPI'
import { ref } from 'vue'
import { notification } from 'ant-design-vue'
import { i18n } from '@/helpers/dashboard.helper'
import type { DashboardResponse, Period } from '../types'

export const useDashboardStore = defineStore('dashboard', () => {
  const dashboardData = ref<DashboardResponse | null>(null)
  const isLoading = ref<boolean>(false)
  const period = ref<Period>(window.wcv_dashboard_data.default_period)
  const startDate = ref<string | null>(null)
  const endDate = ref<string | null>(null)

  const fetchDashboardData = async () => {
    isLoading.value = true

    try {
      const response = await getDashboardData(period.value.value, startDate.value, endDate.value)
      dashboardData.value = response
    } catch (err: any) {
      notification.error({
        message: i18n().dashboard.errorLoadingDashboardData,
        description: err.response.data.message,
        placement: 'topRight',
        duration: 5
      })
    } finally {
      isLoading.value = false
    }
  }

  const setVendorApprovalAction = async (id: number, approval: string) => {
    isLoading.value = true
    const response = await setVendorApproval(id, approval)

    const { success, message } = response

    try {
      if (success) {
        notification.success({
          message,
          placement: 'topRight',
          duration: 5
        })
      } else {
        notification.error({
          message,
          placement: 'topRight',
          duration: 5
        })
      }
    } catch (err: any) {
      notification.error({
        message: i18n().dashboard.errorUpdatingVendorApproval,
        placement: 'topRight',
        duration: 5
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    dashboardData,
    isLoading,
    period,
    startDate,
    endDate,
    fetchDashboardData,
    setVendorApprovalAction
  }
})
