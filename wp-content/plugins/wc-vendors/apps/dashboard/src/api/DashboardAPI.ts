import axios from 'axios'
import { DashboardResponse, LicenseInfo } from '../types'

const axiosClient = axios.create({
  baseURL: window.wcv_dashboard_data.rest_url,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  config => {
    config.headers['X-WP-Nonce'] = window.wcv_dashboard_data.nonce
    return config
  },
  async error => {
    return await Promise.reject(error)
  }
)

const getDashboardData = async (period: string, startDate: string | null, endDate: string | null): Promise<DashboardResponse> => {
  const response = await axiosClient.get('/reports', {
    params: {
      period,
      start_date: startDate,
      end_date: endDate
    }
  })
  return response.data
}

const getPremiumPlugins = async (): Promise<LicenseInfo[]> => {
  const response = await axiosClient.get('/reports/premium-plugins')
  if (response.data.success) {
    return response.data.data
  }
  return []
}

const activatePlugin = async (pluginSlug: string) => {
  const nonce = window.wcv_dashboard_data.activate_plugin_nonce
  const ajaxUrl = window.wcv_dashboard_data.ajax_url
  const action = 'wcv_activate_plugin'
  const formData = new FormData()
  formData.append('action', action)
  formData.append('plugin_slug', pluginSlug)
  formData.append('nonce', nonce)
  const response = await axios.post(ajaxUrl, formData)
  return response.data
}

const installAndActivatePlugin = async (pluginSlug: string) => {
  const nonce = window.wcv_dashboard_data.install_nonce
  const ajaxUrl = window.wcv_dashboard_data.ajax_url
  const action = 'wcv_install_activate_plugin'
  const formData = new FormData()
  formData.append('action', action)
  formData.append('plugin_slug', pluginSlug)
  formData.append('nonce', nonce)
  formData.append('activate', 'true')
  const response = await axios.post(ajaxUrl, formData)
  return response.data
}

const setVendorApproval = async (id: number, approval: string) => {
  const response = await axiosClient.post(`/vendors/action/${id}/${approval}`)
  return response.data
}

export { getDashboardData, activatePlugin, setVendorApproval, getPremiumPlugins, installAndActivatePlugin }
