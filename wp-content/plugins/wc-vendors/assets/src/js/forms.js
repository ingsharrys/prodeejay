/**
This is used to init the forms on the front end.
 */
/* global jQuery, Ink, wcv_frontend_forms */
(function($, Ink) {
  $(window).on('load', function() {
    validate_forms();
    showPayoutMethod();
    if (!$('#_wcv_vendor_enable_store_notice').is(':checked')) {
      $('#wp-_wcv_vendor_store_notice-wrap').slideUp();
    } else {
      $('#wp-_wcv_vendor_store_notice-wrap').slideDown();
    }

    $('#_wcv_vendor_enable_store_notice').click(function() {
      $('#wp-_wcv_vendor_store_notice-wrap').slideToggle();
    });

    $('#_wcv_shipping_type').on('change', function() {
      var selected_value = $(this).val();
      if (selected_value == 'flat') {
        $('#shipping-flat-rates').removeClass('hidden');
        $('#shipping-country-rates').addClass('hidden');
      } else if (selected_value == 'country') {
        $('#shipping-flat-rates').addClass('hidden');
        $('#shipping-country-rates').removeClass('hidden');
      } else {
        $('#shipping-flat-rates').addClass('hidden');
        $('#shipping-country-rates').addClass('hidden');
      }
    });
  });

  $(window).on(
    'load',
    // Hide flat and country rates using JS
    debounce(function() {
      var selected_value = wcv_frontend_forms.vendor_select
        ? $('#_wcv_shipping_type').val()
        : wcv_frontend_forms.shipping_type;

      if (selected_value === 'flat') {
        $('#shipping-flat-rates').removeClass('hidden');
        $('#shipping-country-rates').addClass('hidden');
      } else if (selected_value === 'country') {
        $('#shipping-flat-rates').addClass('hidden');
        $('#shipping-country-rates').removeClass('hidden');
      } else {
        if ('country' === wcv_frontend_forms.shipping_type) {
          $('#shipping-flat-rates').addClass('hidden');
          $('#shipping-country-rates').removeClass('hidden');
        } else if ('flat' === wcv_frontend_forms.shipping_type) {
          $('#shipping-flat-rates').removeClass('hidden');
          $('#shipping-country-rates').addClass('hidden');
        }
      }
    }, 100)
  );

  function validate_forms() {
    window.Parsley.on(
      'form:error',
      debounce(function() {
        $('html, body').animate(
          {
            scrollTop: $('.parsley-error:first').offset().top - 200
          },
          'slow'
        );

        $('.parsley-error:first').focus();
      }, 100)
    );

    if (!$('.wcv-form').length) {
      return;
    }

    var formInstance = Ink.Common_1.getInstance('.wcv-form')[0];

    if (typeof formInstance === 'undefined') {
      return;
    }

    var oldHandler = formInstance._options.onError;

    /**
     * Custom validation error handler. Scrolls the erroring field
     * into view.
     *
     * @param FormValidator.FormElement[] errors
     */
    formInstance._options.onError = function(errors) {
      if (errors.length < 1) {
        return;
      }

      /* Get first element with errors */
      var $element = $(errors[0].getElement());

      /* If the element is being displayed in a tab pane, focus that tab */
      var $pane = $element.closest('.tabs-content');

      if ($pane && !$pane.hasClass('active')) {
        var tabsInstance = Ink.Common_1.getInstance('.wcv-tabs')[0];

        if (typeof tabsInstance !== 'undefined') {
          tabsInstance.changeTab('#' + $pane.attr('id'));
        }
      }

      /* Scroll element into view */
      var $group = $element.closest('.control-group');

      $('html, body').animate(
        {
          scrollTop: $group.offset().top
        },
        {
          duration: 500
        }
      );

      /* Call original error handler, if any */
      if (typeof oldHandler !== 'undefined') {
        oldHandler(errors);
      }
    };
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  $('form').on('submit', function(e) {
    var formHasError = false;
    var htmlMessage = window.wcv_frontend_general.required_file_msg;
    // Validate file uploaders
    $('.wcv-file-uploader').each(function() {
      var fieldHasError = false;
      if ($(this).attr('required') !== undefined) {
        var fieldId = $(this).attr('id');
        fieldHasError = validateFileUploader(fieldId, htmlMessage);
      }

      var tabId = $(this)
        .closest('.tabs-content')
        .first()
        .attr('id');

      if (fieldHasError) {
        $('a.' + tabId).addClass('parsley-error');
        formHasError = true;
      } else {
        $('a.' + tabId).removeClass('parsley-error');
      }
    });

    if (formHasError) {
      e.preventDefault();
    }
  });

  $(document).on('input change', '.wcv-file-uploader', function() {
    if ($(this).attr('required') !== undefined) {
      var fieldId = $(this).attr('id');
      var messageBoxId = $('#' + fieldId).data('msg-id');

      var tabId = $(this)
        .closest('.tabs-content')
        .first()
        .attr('id');

      if ($('#' + fieldId).val() != 0 && $('#' + fieldId).val() != '') {
        $('#' + messageBoxId)
          .html('')
          .removeClass('parsley-error');

        $('.' + tabId).removeClass('parsley-error');
      }
    }
  });

  var validateFileUploader = function(fieldId, htmlMessage) {
    var fieldHasError = false;
    var messageBoxId = $('#' + fieldId).data('msg-id');
    if ($('#' + fieldId).val() == 0 || $('#' + fieldId).val() == '') {
      $('#' + messageBoxId)
        .html(htmlMessage)
        .addClass('parsley-error');
      fieldHasError = true;
    } else {
      $('#' + messageBoxId)
        .html('')
        .removeClass('parsley-error');
    }

    return fieldHasError;
  };

  const showPayoutMethod = () => {
    const selectedMethod = $('#wcv_commission_payout_method').val();
    const $paypalPayoutFields = $('#wcv-paypal-payout-fields');
    const $bankPayoutFields = $('#wcv-bank-payout-fields');
    const $stripeConnectSection = $('#stripe-connect-vendor');
    switch (selectedMethod) {
      case 'paypal':
        showPayoutMethodField($paypalPayoutFields);
        break;
      case 'bank':
        showPayoutMethodField($bankPayoutFields);
        break;
      case 'stripe-connect':
        showPayoutMethodField($stripeConnectSection);
        break;
      default:
        hideAllPayoutFields();
        break;
    }
  };

  // Preferred commission payout method.
  $('#wcv_commission_payout_method').on('change', showPayoutMethod);

  $('#wcv_paypal_masspay_wallet').on('change', function() {
    showSelectedWallet();
  });

  const showSelectedWallet = function() {
    const venmoWalletWrapper = $('#wcv_paypal_masspay_venmo_id_wrapper');
    const paypalWalletWrapper = $('#wcv_paypal_masspay_email_address_wrapper');
    const selectedWallet = $('#wcv_paypal_masspay_wallet').val();

    switch (selectedWallet) {
      case 'paypal':
        $(venmoWalletWrapper).hide();
        $(paypalWalletWrapper).show();
        break;
      case 'venmo':
        $(venmoWalletWrapper).show();
        $(paypalWalletWrapper).hide();
        break;
      default:
        $(venmoWalletWrapper).hide();
        $(paypalWalletWrapper).hide();
        break;
    }
  };

  const showPayoutMethodField = function($field) {
    hideAllPayoutFields();

    $field.show();
  };

  const hideAllPayoutFields = function() {
    $('.wcv-payout-method').hide();
    $('.wcv_stripe_connect_container').hide();
  };
})(jQuery, Ink.UI);
