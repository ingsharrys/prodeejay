declare global {
  interface Window {
    wcv_vendor_product_data: {
      rest_url: string
      nonce: string
      pluginDirUrl: string
      i18n?: {
        [key: string]: string
      }
    }
  }
}

window.wcv_vendor_product_data = window.wcv_vendor_product_data || {}

export { }

