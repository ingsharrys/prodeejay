import axios from 'axios'
import type { ProductsResponse, ApproveProductResponse, VendorsResponse } from '../types'

const axiosClient = axios.create({
  baseURL: window.wcv_vendor_product_data.rest_url,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  config => {
    config.headers['X-WP-Nonce'] = window.wcv_vendor_product_data.nonce
    return config
  },
  async error => {
    return await Promise.reject(error)
  }
)

interface GetProductsParams {
  status?: 'published' | 'pending' | 'draft' | 'all'
  search?: string
  vendor_id?: number
  page?: number
  per_page?: number
}

const getProducts = async (params?: GetProductsParams): Promise<ProductsResponse> => {
  const response = await axiosClient.get('/products', { params })
  return response.data
}

const approveProduct = async (productId: number): Promise<ApproveProductResponse> => {
  const response = await axiosClient.post(`/products/${productId}/approve`)
  return response.data
}

const requestProductChange = async (productId: number, message?: string, includeSuggestions?: boolean): Promise<ApproveProductResponse> => {
  const response = await axiosClient.post(`/products/${productId}/request-change`, { message, include_suggestions: includeSuggestions })
  return response.data
}

const unpublishProduct = async (productId: number): Promise<ApproveProductResponse> => {
  const response = await axiosClient.post(`/products/${productId}/unpublish`)
  return response.data
}

const getVendors = async (): Promise<VendorsResponse> => {
  const response = await axiosClient.get('/products/vendors')
  return response.data
}

export { getProducts, approveProduct, requestProductChange, unpublishProduct, getVendors }

