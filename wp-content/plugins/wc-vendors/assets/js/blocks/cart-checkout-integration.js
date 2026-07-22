;(function() {
  if (
    typeof window.wc === 'undefined' ||
    typeof window.wc.wcSettings === 'undefined' ||
    typeof window.wc.wcBlocksRegistry === 'undefined'
  ) {
    return
  }
  const settings = window.wc.wcSettings.getSetting(
    'wcvendors_test_gateway_data',
    {}
  )
  const label = settings.title || settings.fallback_title

  const Content = () => {
    return window.wp.element.createElement('div', {
      dangerouslySetInnerHTML: {
        // Content sanitized via wp_kses_post() in PHP.
        __html: window.wp.htmlEntities.decodeEntities(
          settings.description || settings.fallback_description
        )
      }
    })
  }

  const WCVendorsTestGateway = {
    name: 'wcvendors_test_gateway',
    label: label,
    content: window.wp.element.createElement(Content),
    edit: window.wp.element.createElement(Content),
    canMakePayment: () => true,
    ariaLabel: label, // sanitized via esc_html() in PHP.
    supports: {
      features: settings.supports
    }
  }

  window.wc.wcBlocksRegistry.registerPaymentMethod(WCVendorsTestGateway)
})()
