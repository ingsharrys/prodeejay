import { defineStore } from 'pinia'
import { ref } from 'vue'
import { notification } from 'ant-design-vue'
import { getProducts, approveProduct, requestProductChange, unpublishProduct, getVendors } from '../api/ProductAPI'
import { getI18n } from '../helpers/i18n.helper'
import type { Product, Vendor, PaginationMeta } from '../types'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const vendors = ref<Vendor[]>([])
  const isLoading = ref<boolean>(false)
  const isLoadingVendors = ref<boolean>(false)
  const status = ref<'published' | 'pending' | 'draft'>('published')
  const search = ref<string>('')
  const selectedVendorId = ref<number | undefined>(undefined)
  const pagination = ref<PaginationMeta>({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0
  })

  const fetchProducts = async (page?: number) => {
    isLoading.value = true
    try {
      const params: any = {
        status: status.value,
        page: page ?? pagination.value.current_page,
        per_page: pagination.value.per_page
      }
      if (search.value) {
        params.search = search.value
      }
      if (selectedVendorId.value) {
        params.vendor_id = selectedVendorId.value
      }
      const response = await getProducts(params)
      if (response.success) {
        products.value = response.data
        if (response.pagination) {
          pagination.value = response.pagination
        }
      } else {
        notification.error({
          message: getI18n('error') || 'Error',
          description: getI18n('failedToLoadProducts') || 'Failed to load products',
          placement: 'topRight',
          duration: 5
        })
      }
    } catch (err: any) {
      notification.error({
        message: getI18n('error') || 'Error',
        description: err.response?.data?.message || getI18n('failedToLoadProducts') || 'Failed to load products',
        placement: 'topRight',
        duration: 5
      })
    } finally {
      isLoading.value = false
    }
  }

  const fetchVendors = async () => {
    isLoadingVendors.value = true
    try {
      const response = await getVendors()
      if (response.success) {
        vendors.value = response.data
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      notification.error({
        message: getI18n('error') || 'Error',
        description: error.message || getI18n('failedToLoadVendors') || 'Failed to load vendors',
        placement: 'topRight',
        duration: 5
      })
    } finally {
      isLoadingVendors.value = false
    }
  }

  const approveProductAction = async (productId: number) => {
    isLoading.value = true
    try {
      const response = await approveProduct(productId)
      if (response.success) {
        await fetchProducts()
        notification.success({
          message: getI18n('success') || 'Success',
          description: response.message || getI18n('productApprovedSuccessfully') || 'Product approved successfully',
          placement: 'topRight',
          duration: 5
        })
      } else {
        notification.error({
          message: getI18n('error') || 'Error',
          description: response.message || getI18n('failedToApproveProduct') || 'Failed to approve product',
          placement: 'topRight',
          duration: 5
        })
      }
    } catch (err: any) {
      notification.error({
        message: getI18n('error') || 'Error',
        description: err.response?.data?.message || getI18n('failedToApproveProduct') || 'Failed to approve product',
        placement: 'topRight',
        duration: 5
      })
    } finally {
      isLoading.value = false
    }
  }

  const requestProductChangeAction = async (productId: number, message?: string, includeSuggestions?: boolean) => {
    isLoading.value = true
    try {
      const response = await requestProductChange(productId, message, includeSuggestions)
      if (response.success) {
        await fetchProducts()
        notification.success({
          message: getI18n('success') || 'Success',
          description: response.message || getI18n('changeRequestSentSuccessfully') || 'Change request sent successfully',
          placement: 'topRight',
          duration: 5
        })
      } else {
        notification.error({
          message: getI18n('error') || 'Error',
          description: response.message || getI18n('failedToRequestChange') || 'Failed to request change',
          placement: 'topRight',
          duration: 5
        })
      }
    } catch (err: any) {
      notification.error({
        message: getI18n('error') || 'Error',
        description: err.response?.data?.message || getI18n('failedToRequestChange') || 'Failed to request change',
        placement: 'topRight',
        duration: 5
      })
    } finally {
      isLoading.value = false
    }
  }

  const unpublishProductAction = async (productId: number) => {
    isLoading.value = true
    try {
      const response = await unpublishProduct(productId)
      if (response.success) {
        await fetchProducts()
        notification.success({
          message: getI18n('success') || 'Success',
          description: response.message || getI18n('productUnpublishedSuccessfully') || 'Product unpublished successfully',
          placement: 'topRight',
          duration: 5
        })
      } else {
        notification.error({
          message: getI18n('error') || 'Error',
          description: response.message || getI18n('failedToUnpublishProduct') || 'Failed to unpublish product',
          placement: 'topRight',
          duration: 5
        })
      }
    } catch (err: any) {
      notification.error({
        message: getI18n('error') || 'Error',
        description: err.response?.data?.message || getI18n('failedToUnpublishProduct') || 'Failed to unpublish product',
        placement: 'topRight',
        duration: 5
      })
    } finally {
      isLoading.value = false
    }
  }

  const setStatus = (newStatus: 'published' | 'pending' | 'draft') => {
    status.value = newStatus
    pagination.value.current_page = 1
    fetchProducts(1)
  }

  const setSearch = (searchValue: string) => {
    search.value = searchValue
    pagination.value.current_page = 1
    fetchProducts(1)
  }

  const setVendorFilter = (vendorId: number | undefined) => {
    selectedVendorId.value = vendorId
    pagination.value.current_page = 1
    fetchProducts(1)
  }

  const setPage = (page: number) => {
    pagination.value.current_page = page
    fetchProducts(page)
  }

  const setPageSize = (pageSize: number) => {
    pagination.value.per_page = pageSize
    pagination.value.current_page = 1
    fetchProducts(1)
  }

  return {
    products,
    vendors,
    isLoading,
    isLoadingVendors,
    status,
    search,
    selectedVendorId,
    pagination,
    fetchProducts,
    fetchVendors,
    approveProductAction,
    requestProductChangeAction,
    unpublishProductAction,
    setStatus,
    setSearch,
    setVendorFilter,
    setPage,
    setPageSize
  }
})

