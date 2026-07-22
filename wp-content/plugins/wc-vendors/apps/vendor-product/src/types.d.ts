export interface AIReview {
  status?: string
  risk_score?: number
  vendor_feedback?: string
  admin_logic?: string
  audit_results?: {
    content_safety?: string
    pricing_integrity?: string
    visual_consistency?: string
  }
  suggestions?: Array<{
    field: string
    suggestion: string
  }>
  image_reviews?: Array<{
    image_id: number
    image_url: string
    reviewed: boolean
    completion?: {
      status: string
      is_appropriate: boolean
      risk_score: number
      analysis: {
        appropriateness: string
        quality: string
        compliance: string
        product_match: string
      }
      review_summary: string
    }
  }>
}

export interface Product {
  id: number
  name: string
  vendor_id: number
  vendor_name: string
  ai_review: AIReview | string
  date: string
  status: string
  permalink?: string
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total: number
  total_pages: number
}

export interface ProductsResponse {
  success: boolean
  data: Product[]
  pagination: PaginationMeta
}

export interface ApproveProductResponse {
  success: boolean
  message: string
}

export interface Vendor {
  id: number
  name: string
}

export interface VendorsResponse {
  success: boolean
  data: Vendor[]
}

