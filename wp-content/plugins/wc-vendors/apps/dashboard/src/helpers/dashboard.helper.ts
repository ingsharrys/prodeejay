// Format currency with the right symbol and decimal places
const formatCurrency = (value: number): string => {
  const { currency_symbol, decimals, decimal_separator, thousand_separator, price_format } = window.wcv_dashboard_data

  if (typeof value !== 'number') {
    return '0.00'
  }
  // Format the number with proper separators
  let formattedNumber = value.toFixed(decimals)

  // Replace decimal point with decimal separator
  formattedNumber = formattedNumber.replace('.', decimal_separator)

  // Add thousand separators
  formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, thousand_separator)

  // Use WooCommerce price format string
  return price_format.replace('%1$s', currency_symbol).replace('%2$s', formattedNumber)
}

const i18n = () => window.wcv_dashboard_data.i18n

export { formatCurrency, i18n }
