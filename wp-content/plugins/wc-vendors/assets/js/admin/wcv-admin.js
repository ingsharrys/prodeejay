;(function($) {
  const install_button = $('.product-addons-button-install')
  const switch_cc_block_button = $('#wcv-switch-to-classic-cart-checkout')
  const script_params = window.wcv_admin_script_params
  const wc_decimal = script_params.wc_decimal.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )
  const the_number_of_decimals = script_params.the_number_of_decimals
  const commissionInputPattern = `^(?:[0-9]|[1-9][0-9]|100)(?:[${wc_decimal}][0-9]{1,${the_number_of_decimals}})?$`
  const commissionInput = $('.wcv-commission-rate-input')
  const commissionInputForm = commissionInput.closest('form')

  const WCV_CMS_ERROR_CLASS = 'wcv-commission-error'
  const WCV_CMS_ERROR_INPUT_CLASS = 'wcv-error'

  commissionInput.on('change focusout', function() {
    const value = $(this)
      .val()
      .trim()

    if (value === '') {
      commissionInput.next(`.${WCV_CMS_ERROR_CLASS}`).remove()
      commissionInput.removeClass(WCV_CMS_ERROR_INPUT_CLASS)
      return
    }

    commissionInput.next(`.${WCV_CMS_ERROR_CLASS}`).remove()
    commissionInput.removeClass(WCV_CMS_ERROR_INPUT_CLASS)
    if (!value.match(commissionInputPattern)) {
      commissionInput.addClass(WCV_CMS_ERROR_INPUT_CLASS)
      commissionInput.after(
        `<div class="${WCV_CMS_ERROR_CLASS}">${script_params.commission_rate_error_message}</div>`
      )
    }
  })

  commissionInputForm.on('submit', function(e) {
    if (commissionInput.hasClass(WCV_CMS_ERROR_INPUT_CLASS)) {
      e.preventDefault()
      return false
    }
    return true
  })

  install_button.on('click', function(e) {
    e.preventDefault()
    const button = $(this)
    const button_text = button.children('.product-addons-button-text')
    const spinner = button.children('.wcv-loading-spinner')
    const install_staus = button.next('.product-addons-install-status')

    button.attr('disabled', 'disabled')
    button_text.text(script_params.installing_text)
    spinner.addClass('active')

    $.ajax({
      url: ajaxurl,
      type: 'POST',
      data: {
        action: 'wcv_install_activate_plugin',
        plugin_slug: button.data('plugin_slug'),
        activate: button.data('activate'),
        nonce: script_params.install_nonce
      }
    })
      .done(function(response) {
        if (response.success && !response.success) {
          button.removeAttr('disabled')
          spinner.removeClass('active')
          button_text.text(script_params.try_again_text)
          install_staus.text(response.data).addClass('active')
        } else {
          button
            .addClass('installed')
            .removeClass('product-addons-button-install')
          button_text.text(script_params.installed_text)
          spinner.removeClass('active')
          install_staus.text(script_params.installed_message).addClass('active')
        }
      })
      .fail(function(error) {
        button.removeAttr('disabled')
        button_text.text(script_params.try_again_text)
        spinner.removeClass('active')
        install_staus.addClass('active').text(error.responseJSON.data)
      })
  })

  switch_cc_block_button.on('click', function(e) {
    const nonce = wcv_admin_script_params.switch_cc_blocks_nonce
    const notice_container = $('#wcv-switch-to-classic-cart-checkout-notice')
    $.post(
      ajaxurl,
      {
        action: 'wcvendors_switch_to_classic_cart_checkout',
        nonce: nonce
      },
      function(response) {
        if (response.success) {
          notice_container
            .addClass('notice-success')
            .removeClass('notice-error')
            .html(`<p>${response.data.message}</p>`)
            .show()
        }
      }
    )
  })

  $('#acfwf-promo-install').on('click', function() {
    const $this = $(this)
    const plugin_slug = $this.data('plugin_slug')
    const activate = $this.data('activate')
    const spinner = $this.children('.wcv-loading-spinner')
    const button_text = $this.children('.button-text')
    spinner.addClass('active')
    button_text.text(script_params.installing_text)
    $this.attr('disabled', true)
    const data = {
      action: 'wcv_install_activate_plugin',
      plugin_slug: plugin_slug,
      nonce: script_params.install_nonce,
      activate: activate
    }
    $.ajax({
      url: ajaxurl,
      type: 'POST',
      data: data
    })
      .done(function(response) {
        if (response.success) {
          $this.addClass('installed')
          $this.attr('disabled', true)
          $('#acfwf-promo-install')
            .parent()
            .addClass('disabled')
          $('#acfwf-promo-activate')
            .parent()
            .removeClass('disabled')
          $('#acfwf-promo-activate').attr('disabled', false)
          spinner.removeClass('active')
          button_text.text(script_params.installed_text)
        }
      })
      .fail(function(error) {
        spinner.removeClass('active')
        button_text.text(script_params.try_again_text)
      })
  })

  $('#acfwf-promo-activate').on('click', function() {
    const $this = $(this)
    const plugin_slug = $this.data('plugin_slug')
    const activate = $this.data('activate')
    const spinner = $this.children('.wcv-loading-spinner')
    const button_text = $this.children('.button-text')
    spinner.addClass('active')
    button_text.text(script_params.activating_text)
    $this.attr('disabled', true)
    const data = {
      action: 'wcv_install_activate_plugin',
      plugin_slug: plugin_slug,
      nonce: script_params.install_nonce,
      activate: activate
    }
    $.ajax({
      url: ajaxurl,
      type: 'POST',
      data: data
    })
      .done(function(response) {
        if (response.success) {
          spinner.removeClass('active')
          button_text.text(script_params.activated_text)
          $this.parent().addClass('disabled')
          $this.attr('disabled', true)
          $('#acfwf-after-installed').show()
        }
      })
      .fail(function(error) {
        spinner.removeClass('active')
        button_text.text(script_params.try_again_text)
      })
  })
})(jQuery)
