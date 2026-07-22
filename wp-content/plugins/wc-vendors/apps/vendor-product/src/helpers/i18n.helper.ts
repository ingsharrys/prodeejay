const getI18n = (key: string): string => {
  return window.wcv_vendor_product_data?.i18n?.[key] || key
}

export { getI18n }

