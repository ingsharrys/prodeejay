/* global wcv_frontend_product */

/* Front end product meta boxes */
jQuery(function($) {
  $(document).ready(function() {
    hideEmptyTabs();
    // PRODUCT TYPE SPECIFIC OPTIONS
    $('select#product-type')
      .on('change', function() {
        // Get value
        var select_val = $(this).val();
        document
          .getElementById('product-meta-accordion')
          .setAttribute('data-type', select_val);
        if ('variable' === select_val) {
          $('input#_manage_stock').trigger('change');
          $('input#_downloadable').prop('checked', false);
          $('input#_virtual').removeAttr('checked');
        } else if ('grouped' === select_val) {
          $('input#_downloadable').prop('checked', false);
          $('input#_virtual').removeAttr('checked');
        } else if ('external' === select_val) {
          $('input#_downloadable').prop('checked', false);
          $('input#_virtual').removeAttr('checked');
        }

        show_and_hide_panels();
        hideEmptyTabs();
        activateFirstVisibleTab();
        $('body').trigger(
          'woocommerce-product-type-change',
          select_val,
          $(this)
        );

        // Re init select2
        $('.wcv-tabs')
          .find('select.select2')
          .select2();
      })
      .trigger('change');

    $('input#_downloadable, input#_virtual').on('change', function() {
      show_and_hide_panels();
    });

    // Sale price schedule
    $('.sale_price_dates_fields').each(function() {
      var sale_schedule_set = false;

      $('.sale_price_dates_fields')
        .find('input')
        .each(function() {
          if ($(this).val() != '') {
            sale_schedule_set = true;
          }
        });

      if (sale_schedule_set) {
        $('.sale_schedule').hide();
        $('.sale_price_dates_fields').show();
      } else {
        $('.sale_schedule').show();
        $('.sale_price_dates_fields').hide();
      }
    });

    $('.sale_schedule').on('click', function() {
      $('.sale_price_dates_fields').show();
      $(this).hide();
      $('.cancel_sale_schedule').show();
      return false;
    });

    $('.cancel_sale_schedule').on('click', function() {
      $('.sale_price_dates_fields').hide();
      $(this).hide();
      $('.sale_schedule').show();
      return false;
    });

    function activateFirstVisibleTab() {
      const wcvTabTarget = document.getElementById('product-meta-accordion');
      if (!wcvTabTarget) return;

      requestAnimationFrame(() => {
        const tabs = wcvTabTarget.querySelectorAll('.wcv-accordion-title');
        for (const tab of tabs) {
          if (tab.offsetWidth > 0 && tab.offsetHeight > 0) {
            if (!tab.classList.contains('active')) {
              tab.click();
            }
            break;
          }
        }
      });
    }

    function hideEmptyTabs() {
      const tabs = document.querySelectorAll('.wcv-accordion-title');
      for (const tab of tabs) {
        let parent = tab.parentNode;
        const tabContent = parent.querySelector('.tabs-content');
        const tabContentChildren = tabContent.children;
        const childCount = tabContentChildren.length;
        let isHidden = 0;

        Array.from(tabContentChildren).forEach(child => {
          if (child.style.display === 'none' || child.children.length == 0) {
            isHidden++;
          }
        });

        if (isHidden === childCount) {
          parent.style.display = 'none';
          parent.classList.add('hide-all');
        } else {
          tab.classList.remove('is_hidden');
          parent.classList.remove('is_hidden');
          parent.classList.remove('hide-all');
        }
      }
    }

    function show_and_hide_panels() {
      var product_type = $('#product-type').val();
      var is_virtual = $('#_virtual').is(':checkbox')
        ? $('input#_virtual:checked').length
        : $('#_virtual').val();
      var is_downloadable = $('#_downloadable').is(':checkbox')
        ? $('input#_downloadable:checked').length
        : $('#_downloadable').val();

      // Hide/Show all with rules
      var hide_classes = '.hide_if_downloadable, .hide_if_virtual';
      var show_classes =
        '.show_if_downloadable, .show_if_virtual, .show_if_external, .show_if_booking';

      $.each(wcv_frontend_product.product_types, function(index, value) {
        hide_classes = hide_classes + ', .hide_if_' + value;
        show_classes = show_classes + ', .show_if_' + value;
      });

      $(hide_classes)
        .show()
        .removeClass('is_hidden');
      $(hide_classes)
        .find('input')
        .removeClass('is_hidden');
      $(show_classes)
        .hide()
        .addClass('is_hidden');
      $(show_classes)
        .find('input')
        .addClass('is_hidden');

      // Shows rules
      if (is_downloadable) {
        $('.show_if_downloadable')
          .show()
          .removeClass('is_hidden');
        $('.show_if_downloadable')
          .find('input')
          .removeClass('is_hidden');

        // For auction products, only show General tab when downloadable is checked
        if (product_type === 'auction') {
          $('.show_if_downloadable_auction')
            .show()
            .removeClass('hide-all');
        }
      } else if (product_type === 'auction') {
        // Hide General tab for auction products when downloadable is not checked
        $('.show_if_downloadable_auction')
          .hide()
          .addClass('hide-all');
      }

      if (is_virtual) {
        $('.show_if_virtual')
          .show()
          .removeClass('is_hidden');
        $('.show_if_virtual')
          .find('input')
          .removeClass('is_hidden');
        $('ul.tabs-nav li').removeClass('active');
      }

      $('.show_if_' + product_type)
        .show()
        .removeClass('is_hidden');
      $('.show_if_' + product_type)
        .find('input')
        .removeClass('is_hidden');

      // Hide rules
      if (is_downloadable) {
        $('.hide_if_downloadable')
          .hide()
          .addClass('is_hidden');
        $('.hide_if_downloadable')
          .find('input')
          .addClass('is_hidden');
      }
      if (is_virtual) {
        $('.hide_if_virtual')
          .hide()
          .addClass('is_hidden');
        $('.hide_if_virtual')
          .find('input')
          .addClass('is_hidden');
      }

      if (product_type == 'grouped') {
        $('.linked_product')
          .parent()
          .addClass('active');
        $('#linked_product')
          .removeClass('hide-all')
          .addClass('active');
      }

      $('.hide_if_' + product_type)
        .hide()
        .addClass('is_hidden');
      $('.hide_if_' + product_type)
        .find('input')
        .addClass('is_hidden');
      $('input#_manage_stock').trigger('change');

      // Disable required for demensions fields if virtual
      const isDemensionFieldsRequired =
        wcv_frontend_product.is_demensions_required;
      if (isDemensionFieldsRequired && is_virtual) {
        $('input#_length, input#_width, input#_height').prop('required', false);
      } else if (isDemensionFieldsRequired) {
        $('input#_length, input#_width, input#_height').prop('required', true);
      }

      // reset form validation for fields that have been hidden.
      if (jQuery('.wcv-form').length && !jQuery('.wcv-search-form').length) {
        if (!$('.wcv-form').hasClass('wcv-form-exclude')) {
          $('.wcv-form')
            .parsley()
            .reset();
        }
      }
    }

    // STOCK OPTIONS
    $('input#_manage_stock')
      .on('change', function() {
        if ($(this).is(':checked')) {
          $('div.stock_fields')
            .show()
            .removeClass('is_hidden');
          $('div.stock_fields')
            .find('input')
            .removeClass('is_hidden');
          $('.stock_status_field').hide();
          if (!$('.wcv-form').hasClass('wcv-form-exclude')) {
            $('.wcv-form')
              .parsley()
              .reset();
          }
        } else {
          var product_type = $('select#product-type').val();

          $('div.stock_fields')
            .hide()
            .addClass('is_hidden');
          $('div.stock_fields')
            .find('input')
            .addClass('is_hidden');
          $('.stock_status_field:not( .hide_if_' + product_type + ' )').show();
          if (!$('.wcv-form').hasClass('wcv-form-exclude')) {
            $('.wcv-form')
              .parsley()
              .reset();
          }
        }
      })
      .change();

    // FEATURED IMAGE
    // Setting uploader type to true allows multiple selections as required by gallery
    // todo make translatable
    function featured_image_uploader() {
      var media_uploader, json;

      var title = $('.wcv-featuredimg').data('title');
      var button_text = $('.wcv-featuredimg').data('button_text');

      if (undefined !== media_uploader) {
        media_uploader.open();
        return;
      }

      media_uploader = wp.media({
        title: title,
        button: {
          text: button_text
        },
        multiple: false // Set to true to allow multiple files to be selected
      });

      media_uploader.on('select', function() {
        json = media_uploader
          .state()
          .get('selection')
          .first()
          .toJSON();

        if (0 > $.trim(json.url.length)) {
          return;
        }

        var attachment_image_url = json.sizes.thumbnail
          ? json.sizes.thumbnail.url
          : json.url;

        $('.wcv-featuredimg')
          .find('img')
          .remove();
        $('.wcv-featuredimg').prepend(
          '<img src="' +
            attachment_image_url +
            '" alt="' +
            json.caption +
            '" title="' +
            json.title +
            '" style="max-width: 100%;" />'
        );
        $('.wcv-featuredimg').addClass('has-image');
        $('#_featured_image_id').val(json.id);
        $('.wcv_featured_image_msg').html('');
        $('.wcv-media-uploader-featured-replace').removeClass('hidden');
        $('.wcv-media-uploader-featured-delete').removeClass('hidden');
        $('.product-feat-image-upload .file-upload-wrapper').addClass('hidden');
      });

      media_uploader.open();
    }

    $('.wcv-media-uploader-featured-delete').on('click', function(e) {
      e.preventDefault();
      //reset the data so that it can be removed and saved.
      $('.wcv-featuredimg')
        .find('img')
        .remove();
      $('.wcv-featuredimg').removeClass('has-image');
      $('#_featured_image_id').val('');
      $('.wcv-media-uploader-featured-delete').addClass('hidden');
      $('.wcv-media-uploader-featured-replace').addClass('hidden');
      $('.product-feat-image-upload .file-upload-wrapper').removeClass(
        'hidden'
      );
    });

    $('.wcv-media-uploader-featured-replace').on('click', function() {
      featured_image_uploader();
      return false;
    });

    /**
     * PRODUCT IMAGE GALLERY
     */

    // Check maximum gallery images when an attachment is selected
    $(document).on('click', '.attachment', function() {
      var selected_count = $('.attachment.selected').length;
      var gallery_max = $('#product_images_container').data(
        'gallery_max_upload'
      );
      var max_selected_notice = $('#product_images_container').data(
        'gallery_max_selected_notice'
      );

      if (selected_count > gallery_max) {
        $('.max-gallery-selected-warning').remove();
        $(
          '.media-frame-toolbar .media-toolbar .media-toolbar-secondary'
        ).prepend(
          '<div class="woocommerce-info max-gallery-selected-warning">' +
            max_selected_notice +
            '</div>'
        );
        $('.media-button-select').attr('disabled', true);
      }

      if (selected_count <= gallery_max) {
        $('.max-gallery-selected-warning').remove();
        $('.media-button-select').attr('disabled', false);
      }
    });

    // Product Gallery Uploader
    function product_gallery_uploader() {
      var media_uploader;
      var $image_gallery_ids = $('#product_image_gallery');
      var $product_images = $('#product_images_container ul.product_images');
      var attachment_ids = $image_gallery_ids.val();
      var gallery_max = $('#product_images_container').data(
        'gallery_max_upload'
      );
      var max_selected_notice = $('#product_images_container').data(
        'gallery_max_selected_notice'
      );

      if (undefined !== media_uploader) {
        media_uploader.open();
        return;
      }

      // Create the media frame.
      media_uploader = wp.media.frames.file_frame = wp.media({
        // Set the title of the modal.
        title: 'Choose or Upload Images',
        button: {
          text: 'Use Image(s)'
        },
        library: {
          type: 'image'
        },
        multiple: true
      });

      media_uploader.on('select', function() {
        var selection = media_uploader.state().get('selection');
        var attachment_image;

        $('.max-gallery-images-exceeded-warning').remove();
        var count_selected_attachments = 0;

        selection.map(function(attachment) {
          attachment = attachment.toJSON();

          if (attachment.id && !check_gallery_count()) {
            attachment_ids = attachment_ids
              ? attachment_ids + ',' + attachment.id
              : attachment.id;
            attachment_image = attachment.sizes.thumbnail
              ? attachment.sizes.thumbnail.url
              : attachment.url;

            $product_images
              .find('.file-upload-wrapper')
              .before(
                '<li class="wcv-gallery-image" data-attachment_id="' +
                  attachment.id +
                  '">' +
                  '<img src="' +
                  attachment_image +
                  '" />' +
                  '<ul class="actions">' +
                  '<li><a href="#" class="delete" title="Delete image">' +
                  '<svg class="wcv-icon wcv-icon-md"><use xlink:href="' +
                  wcv_frontend_product.assets_url +
                  'svg/wcv-icons.svg#wcv-icon-times"></use></svg>' +
                  '</a></li>' +
                  '</ul>' +
                  '</li>'
              );

            $('.wcv_gallery_msg').html('');
          }

          count_selected_attachments++;
        });

        $image_gallery_ids.val(attachment_ids);

        if (count_selected_attachments > gallery_max) {
          var message =
            '<div class="max-gallery-images-exceeded-warning">' +
            max_selected_notice +
            '</div>';
          $('#product_images_container').append(message);
        }
      });

      media_uploader.on('close', function() {
        $('.attachment.selected').removeClass('selected');
      });

      if (check_gallery_count()) {
        var gallery_max_msg = $('#product_images_container').data(
          'gallery_max_notice'
        );
        alert(gallery_max_msg);
      } else {
        // Open the modal
        media_uploader.open();
      }
    }
    if (document.getElementById('product_images')) {
      var galleryMutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (
            mutation.addedNodes.length > 0 ||
            mutation.removedNodes.length > 0
          ) {
            const gallery_count = $('#product_images').children().length;
            const maxUpload = $('#product_images_container').data(
              'gallery_max_upload'
            );

            if (gallery_count > maxUpload) {
              $('.product-imgs-gallery-upload')
                .find('.file-upload-wrapper')
                .addClass('hide-all');
            } else {
              $('.product-imgs-gallery-upload')
                .find('.file-upload-wrapper')
                .removeClass('hide-all');
            }
            if (gallery_count > 1) {
              $(
                '.product-imgs-gallery-upload .wcv-upload-files-input'
              ).addClass('small');
              mutation.target.classList.add('has-images');
            } else {
              $(
                '.product-imgs-gallery-upload .wcv-upload-files-input'
              ).removeClass('small');
              mutation.target.classList.remove('has-images');
            }
          }
        });
      });

      galleryMutationObserver.observe(
        document.getElementById('product_images'),
        {
          childList: true
        }
      );
    }

    // Refresh media library
    function refreshMediaLibrary(newFileId, frame) {
      frame.setState('insert');
      const attachment = wp.media.attachment(newFileId);
      attachment.fetch();
      if (frame.content.get() !== null) {
        frame.content.get().collection.props.set({ ignore: +new Date() });
        frame.content.get().options.selection.add(attachment);
      } else {
        frame.library.props.set({ ignore: +new Date() });
      }
    }

    // Remove images
    $('#product_images_container').on('click', 'a.delete', function(e) {
      var $image_gallery_ids = $('#product_image_gallery');

      e.preventDefault();
      $(this)
        .closest('li.wcv-gallery-image')
        .remove();

      var attachment_ids = '';

      $('#product_images_container ul li.wcv-gallery-image')
        .css('cursor', 'default')
        .each(function() {
          var attachment_id = jQuery(this).attr('data-attachment_id');
          attachment_ids = attachment_ids + attachment_id + ',';
        });
      attachment_ids = attachment_ids.replace(/,\s*$/, '');

      $image_gallery_ids.val(attachment_ids);

      // remove any lingering tooltips
      $('#tiptip_holder').removeAttr('style');
      $('#tiptip_arrow').removeAttr('style');

      const countImg = $image_gallery_ids.val().split(',').length;
      const maxUpload = $('#product_images_container').data(
        'gallery_max_upload'
      );

      if (countImg < maxUpload) {
        $('.product-imgs-gallery-upload')
          .find('.file-upload-wrapper')
          .removeClass('hidden');
      }

      return false;
    });

    $('.product-imgs-gallery-upload .wcv-browser-file').on('click', function(
      e
    ) {
      e.preventDefault();
      product_gallery_uploader();
      return false;
    });

    function check_gallery_count() {
      var gallery_count = $('.wcv-gallery-image').length;
      var gallery_max =
        $('#product_images_container').data('gallery_max_upload') - 1;

      return gallery_count > gallery_max ? true : false;
    }

    //
    // File downloads
    //

    // File inputs
    $('#files_download').on(
      'click',
      '.downloadable_files a.insert',
      function() {
        $(this)
          .closest('.downloadable_files')
          .find('tbody')
          .append($(this).data('row'));
        return false;
      }
    );

    $('#files_download').on(
      'click',
      '.downloadable_files a.delete',
      function() {
        $(this)
          .closest('tr')
          .remove();
        return false;
      }
    );

    // Uploading files
    var downloadable_file_frame,
      file_path_field,
      file_id_field,
      file_display_field;
    $(document).on('change', '.file_display', function(e) {
      e.preventDefault();
      const $el = $(this);
      file_path_field = $el.closest('tr').find('.file_url');
      const value = $el.val();
      const mime_types = wcv_frontend_product.mime_types.join('|');
      const regrex_string = `^.*.(${mime_types})$`;
      const regrex_file_type = new RegExp(regrex_string, 'gm');
      if (
        value &&
        wcv_frontend_product.wcv_file_display !== 'file_url' &&
        regrex_file_type.test(value)
      ) {
        file_path_field.val(value);
      }
    });

    $(document).on('click', '.upload_file_button', function(event) {
      var $el = $(this);

      file_path_field = $el.closest('tr').find('.file_url');
      file_id_field = $el.closest('tr').find('.file_id');
      file_display_field = $el.closest('tr').find('.file_display');

      event.preventDefault();

      // If the media frame already exists, reopen it.
      if (downloadable_file_frame) {
        downloadable_file_frame.open();
        return;
      }

      var downloadable_file_states = [
        // Main states.
        new wp.media.controller.Library({
          library: wp.media.query(),
          multiple: true,
          title: $el.data('choose'),
          priority: 20,
          filterable: 'uploaded'
        })
      ];

      // Create the media frame.
      downloadable_file_frame = wp.media.frames.downloadable_file = wp.media({
        // Set the title of the modal.
        title: $el.data('choose'),
        library: {
          type: ''
        },
        button: {
          text: $el.data('update')
        },
        multiple: true,
        states: downloadable_file_states
      });

      // When an image is selected, run a callback.
      downloadable_file_frame.on('select', function() {
        var file_path = '';
        var file_display = '';
        var file_id = 0;
        var selection = downloadable_file_frame.state().get('selection');

        selection.map(function(attachment) {
          if (wcv_frontend_product.wcv_file_display == 'file_url') {
            file_display = attachment.attributes.url;
          } else {
            file_display = attachment.attributes.filename;
          }

          attachment = attachment.toJSON();

          if (attachment.url) {
            file_path = attachment.url;
          }

          if (attachment.id) {
            file_id = attachment.id;
          }
        });

        file_path_field.val(file_path);
        file_display_field.val(file_display);
        file_id_field.val(file_id);
      });

      // Set post to 0 and set our custom type
      downloadable_file_frame.on('ready', function() {
        downloadable_file_frame.uploader.options.uploader.params = {
          type: 'downloadable_product'
        };
      });

      // Finally, open the modal.
      downloadable_file_frame.open();
    });

    // Download ordering
    $('.downloadable_files tbody').sortable({
      items: 'tr',
      cursor: 'move',
      axis: 'y',
      handle: 'td.sort',
      scrollSensitivity: 40,
      forcePlaceholderSize: true,
      helper: 'clone',
      opacity: 0.65
    });

    //
    // Shipping Rates
    //

    // Flat Rates
    function enable_disable(disable_input, toggle_inputs) {
      if ($(disable_input).is(':checked')) {
        toggle_inputs.prop('disabled', true);

        toggle_inputs.each(function() {
          if ($(this).is(':checkbox')) {
            $(this).removeAttr('checked');
          } else {
            $(this).val('');
          }
        });
      } else {
        toggle_inputs.prop('disabled', false);
      }
    }

    // Disable national shipping
    $('#_shipping_fee_national_disable').change(function() {
      enable_disable($(this), $('.wcv-disable-national-input'));
    });
    // Toggle Free shipping
    $('#_shipping_fee_national_free').on('change', function() {
      enable_disable($(this), $('#_shipping_fee_national'));
      enable_disable($(this), $('#_national_minimum_shipping_fee'));
      enable_disable($(this), $('#_national_maximum_shipping_fee'));
      enable_disable($(this), $('#_national_free_shipping_product'));
    });

    // International
    // Disable international shipping
    $('#_shipping_fee_international_disable').on('change', function() {
      enable_disable($(this), $('.wcv-disable-international-input'));
    });
    // Free shipping
    $('#_shipping_fee_international_free').on('change', function() {
      enable_disable($(this), $('#_shipping_fee_international'));
      enable_disable($(this), $('#_international_minimum_shipping_fee'));
      enable_disable($(this), $('#_international_maximum_shipping_fee'));
      enable_disable($(this), $('#_international_free_shipping_product'));
    });

    // Country Rates
    $('#shipping').on('click', '.wcv_shipping_rates a.insert', function() {
      var select2_args = {
        placeholderOption: 'first',
        width: '100%'
      };
      // Add a row counter for tracking qty
      var count_row = $('#wcv_shipping_rates_table tbody tr').length;
      // count_row++;
      var new_row_data = $(this).data('row');
      var new_row = new_row_data.replace(
        'id="_wcv_shipping_overrides_"',
        'id="_wcv_shipping_overrides_' + count_row + '"'
      );
      new_row = new_row.replace(
        'name="_wcv_shipping_overrides_"',
        'name="_wcv_shipping_overrides_' + count_row + '"'
      );
      $(this)
        .closest('.wcv_shipping_rates')
        .find('tbody')
        .append(new_row)
        .find('select')
        .select2(select2_args);

      return false;
    });

    $('#shipping').on('click', '.wcv_shipping_rates a.delete', function() {
      $(this)
        .closest('tr')
        .remove();
      return false;
    });

    // shipping rate ordering
    $('.wcv_shipping_rates tbody').sortable({
      items: 'tr',
      cursor: 'move',
      axis: 'y',
      handle: 'td.sort',
      scrollSensitivity: 40,
      forcePlaceholderSize: true,
      helper: 'clone',
      opacity: 0.65
    });

    // Enable selects to use the select2 enhanced select
    // $('.select2').each(function() {
    //   if (!$(this).hasClass('select2-hidden-accessible')) {
    //     $(this).select2();
    //   }
    // });
    // Categories
    $('.category-select2').select2({
      maximumSelectionLength: wcv_frontend_product.category_limit,
      language: {
        maximumSelected: function(args) {
          return args.maximum != 1
            ? wcv_frontend_product.select2_maximumSelected_plural
            : wcv_frontend_product.select2_maximumSelected_single;
        },
        loadingMore: function() {
          return wcv_frontend_product.select2_loadingMore;
        },
        errorLoading: function() {
          return wcv_frontend_product.select2_errorLoading;
        },
        noResults: function() {
          return wcv_frontend_product.select2_noResults;
        },
        searching: function() {
          return wcv_frontend_product.select2_searching;
        },
        removeAllItems: function() {
          return wcv_frontend_product.select2_removeAllItems;
        }
      }
    });

    show_and_hide_panels();

    // On load shipping enable and disable
    enable_disable(
      $('#_shipping_fee_national_free'),
      $('#_shipping_fee_national')
    );
    enable_disable(
      $('#_shipping_fee_international_free'),
      $('#_shipping_fee_international')
    );
    enable_disable(
      $('#_shipping_fee_national_disable'),
      $('.wcv-disable-national-input')
    );
    enable_disable(
      $('#_shipping_fee_international_disable'),
      $('.wcv-disable-international-input')
    );

    // Product Confirm Delete
    $('.confirm_delete').on('click', function(e) {
      if (!confirm($(this).data('confirm_text'))) {
        e.preventDefault();
      }
    });

    // ATTRIBUTE TABLES

    // Initial order
    var woocommerce_attribute_items = $('.product_attributes')
      .find('.woocommerce_attribute')
      .get();

    woocommerce_attribute_items.sort(function(a, b) {
      var compA = parseInt($(a).attr('rel'), 10);
      var compB = parseInt($(b).attr('rel'), 10);
      return compA < compB ? -1 : compA > compB ? 1 : 0;
    });

    $(woocommerce_attribute_items).each(function(idx, itm) {
      $('.product_attributes').append(itm);
    });

    $('.product_attributes .woocommerce_attribute').each(function(index, el) {
      if ($(el).css('display') !== 'none' && $(el).is('.taxonomy')) {
        $('select.attribute_taxonomy')
          .find('option[value="' + $(el).data('taxonomy') + '"]')
          .attr('disabled', 'disabled');
      }
    });

    // Close  / Expand
    $('.wcv_product_attributes')
      .on('click', '.wcv-metabox .wcv-attr-header', function(event) {
        if ($(event.target).filter(':input, option, .sort').length) {
          return;
        }

        $(this)
          .next('.wcv-metabox-content')
          .stop()
          .slideToggle();
        $(this)
          .closest('.wcv-metabox')
          .toggleClass('closed');

        const select = $(this)
          .siblings('.wcv_attribute_data')
          .find('select');
        if (
          select.length > 0 &&
          !select.hasClass('select2-hidden-accessible')
        ) {
          select.select2();
        }
      })
      .on('click', '.expand_all', function() {
        $(this)
          .closest('.wcv_product_attributes')
          .find('.wcv-metabox')
          .removeClass('closed')
          .find('.wcv-metabox-content')
          .slideDown();
        return false;
      })
      .on('click', '.close_all', function() {
        $(this)
          .closest('.wcv_product_attributes')
          .find('.wcv-metabox')
          .addClass('closed')
          .find('.wcv-metabox-content')
          .slideUp();
        return false;
      });
    $('.wcv-metabox.closed').each(function() {
      $(this)
        .find('.wcv-metabox-content')
        .hide();
    });

    $(function() {
      // Add rows
      $('select.attribute_taxonomy').on('change', function() {
        var size = $('.product_attributes .woocommerce_attribute').length;
        var attribute = $(this).val();
        const $attributesDiv = $('.wcv_product_attributes');

        $attributesDiv.block({
          message: null,
          overlayCSS: {
            background: '#fff',
            opacity: 0.6
          }
        });

        if (attribute) {
          var $attributes = $('.product_attributes');
          var product_type = $('#product-type').val();
          var data = {
            action: 'wcv_json_add_attribute',
            taxonomy: attribute,
            i: size,
            security: wcv_frontend_product.wcv_add_attribute_nonce
          };

          $.post(wcv_frontend_product.ajax_url, data, function(response) {
            if (response.error) {
              // Error
              window.alert(response.error);
            } else {
              $attributes.append(response);
              // trigger click event to open the attribute
              $attributes
                .find('.woocommerce_attribute:last .wcv-attr-header')
                .click();
              $('select.attribute_values')
                .filter(':not(.select12-hidden-accessible)')
                .select2();

              if (product_type !== 'variable') {
                $attributes.find('.enable_variation').hide();
              }

              $(document.body).trigger('wc-enhanced-select-init');
              attribute_row_indexes();

              $(document.body).trigger('woocommerce_added_attribute');
            }
            $attributesDiv.unblock();
          });

          if (attribute) {
            $('select.attribute_taxonomy')
              .find('option[value="' + attribute + '"]')
              .attr('disabled', 'disabled');
            $('select.attribute_taxonomy').val('');
          }

          return false;
        }
      });

      // Select all terms
      $('.product_attributes').on(
        'click',
        'button.select_all_attributes',
        function() {
          var index_value = $(this)
            .parent()
            .data('index_value');

          $('#attribute_values_' + index_value + ' > option').prop(
            'selected',
            'selected'
          );
          $('#attribute_values_' + index_value).trigger('change');

          validateAttributesRequired();

          return false;
        }
      );

      // Unselect all terms
      $('.product_attributes').on(
        'click',
        'button.select_no_attributes',
        function() {
          var index_value = $(this)
            .parent()
            .data('index_value');
          var taxonomy = $(this)
            .parent()
            .data('taxonomy');

          $('#attribute_values_' + index_value + ' > option').removeAttr(
            'selected'
          );
          $('#attribute_values_' + index_value).trigger('change');

          if ($('#attribute_variation_' + index_value).is(':checked')) {
            remove_attribute_variations(taxonomy);
          }

          validateAttributesRequired();

          return false;
        }
      );

      // Add attribute variations based on the selected attribute values for this attribute
      function add_attribute_variation(values, taxonomy, position, label) {
        // get existing variation attributes if there is any
        var wcv_variation_attributes = $('#wcv-variation-attributes').data(
          'variation_attr'
        );

        // create the empty object first if required
        if (jQuery.isEmptyObject(wcv_variation_attributes)) {
          wcv_variation_attributes = {};
        }

        var attr_var = {};

        attr_var['values'] = values;
        attr_var['position'] = position;
        attr_var['name'] = taxonomy;
        attr_var['label'] = label;

        wcv_variation_attributes[taxonomy] = attr_var;

        $('#wcv-variation-attributes').data(
          'variation_attr',
          wcv_variation_attributes
        );

        $('.wcv_single_add_variation').removeClass('hide-all');

        return false;
      } // add_attribute_variation()

      // Remove the attribute variations
      function remove_attribute_variations(taxonomy) {
        var wcv_variation_attributes = $('#wcv-variation-attributes').data(
          'variation_attr'
        );

        if (!jQuery.isEmptyObject(wcv_variation_attributes)) {
          // remove the attribute from the global object
          delete wcv_variation_attributes[taxonomy];

          $('#wcv-variation-attributes').data(
            'variation_attr',
            wcv_variation_attributes
          );
        }

        return false;
      } // remove_attribute_variations()

      // Toggle attributes available or not to variations
      function toggle_attributes(el, position, label) {
        var attr_obj = {};
        var taxonomy = el.parent().data('taxonomy');
        var index_value = el.parent().data('index_value');
        var data;

        if ($('#attribute_variation_' + index_value).is(':checked')) {
          if (el.is('input')) {
            data = el.val().split(wcv_frontend_product.wc_deliminator);

            $.each(data, function(index, value) {
              if ($.trim(value).length > 0) {
                attr_obj[$.trim(value).toLowerCase()] = $.trim(value);
              }
            });
          } else {
            el.select2();
            data = el.select2('data');

            $.each(data, function(index, value) {
              attr_obj[value.id] = value.text;
            });
          }
        }

        // Only fire if there are values to add
        if (!jQuery.isEmptyObject(attr_obj)) {
          add_attribute_variation(attr_obj, taxonomy, position, label);
        } else {
          remove_attribute_variations(taxonomy);
        }
      } // toggle_attributes()

      function load_attributes() {
        $('.attribute_values').each(function() {
          var index_value = $(this)
            .parent()
            .data('index_value');
          var position = $('#attribute_position_' + index_value).val();
          var label = $(this)
            .closest('.woocommerce_attribute')
            .data('label');

          toggle_attributes($(this), position, label);
        });
      } // load_attributes()

      $('.product_attributes').on('change', '.attribute_values', function() {
        var index_value = $(this)
          .parent()
          .data('index_value');
        var position = $('#attribute_position_' + index_value).val();
        var label = $(this)
          .closest('.woocommerce_attribute')
          .data('label');

        validateAttributesRequired();

        toggle_attributes($(this), position, label);
      });

      // fire if adding or removing this attribute from available variations
      $('.product_attributes').on(
        'change',
        '.wcv_variation_checkbox',
        function() {
          var index_value = $(this)
            .closest('.woocommerce_attribute')
            .data('index_value');

          var taxonomy = $(this)
            .closest('.woocommerce_attribute')
            .data('taxonomy');
          var label = $(this)
            .closest('.woocommerce_attribute')
            .data('label');
          var position = $('#attribute_position_' + index_value).val();

          var el = $('#attribute_values_' + index_value);

          if ($(this).is(':checked')) {
            toggle_attributes(el, position, label);
            $(document.body).trigger('woocommerce_added_attribute');
          } else {
            remove_attribute_variations(taxonomy);
            $(document.body).trigger('woocommerce_removed_attribute');
          }
        }
      );

      $('.product_attributes').on('click', '.remove_row', function() {
        if (window.confirm(wcv_frontend_product.remove_attribute)) {
          var $parent = $(this).closest('.woocommerce_attribute');

          if ($parent.is('.taxonomy')) {
            $parent.find('select, input[type=text]').val('');
            $parent.hide();
            $('.attribute_taxonomy')
              .find('option[value="' + $parent.data('taxonomy') + '"]')
              .removeAttr('disabled');
          } else {
            $parent.find('select, input[type=text]').val('');
            $parent.hide();
            attribute_row_indexes();
          }

          remove_attribute_variations($parent.data('taxonomy'));

          validateAttributesRequired();
          $(document.body).trigger('woocommerce_removed_attribute');
        }
        return false;
      });

      // Attribute ordering
      $('.product_attributes').sortable({
        items: '.woocommerce_attribute',
        cursor: 'move',
        axis: 'y',
        handle: 'h5',
        scrollSensitivity: 40,
        forcePlaceholderSize: true,
        helper: 'clone',
        opacity: 0.65,
        placeholder: 'wcv-metabox-sortable-placeholder',
        start: function(event, ui) {
          ui.item.css('background-color', '#f6f6f6');
        },
        stop: function(event, ui) {
          var index_value = ui.item.data('index_value');
          ui.item.removeAttr('style');
          attribute_row_indexes(index_value);
        }
      });

      // Adjust attribute row indexes then toggle the object storage
      function attribute_row_indexes() {
        $('.product_attributes .woocommerce_attribute').each(function(
          index,
          el
        ) {
          $('.attribute_position', el).val(
            parseInt(
              $(el).index('.product_attributes .woocommerce_attribute'),
              10
            )
          );
          // toggle after sorting to ensure positions are correct
          var index_value = $(this).data('index_value');
          el = $('#attribute_values_' + index_value);
          var position = $('#attribute_position_' + index_value).val();
          var label = $(this).data('label');
          toggle_attributes(el, position, label);
        });
      }

      attribute_row_indexes();
      load_attributes();
    }); // end function wrapper for attribute variation detection

    //
    // Add a new attribute (via ajax)
    //
    //
    $('.product_attributes').on(
      'click',
      'button.add_new_attribute',
      function() {
        $('.product_attributes').block({
          message: null,
          overlayCSS: { background: '#fff', opacity: 0.6 }
        });

        var index_value = $(this)
          .parent()
          .data('index_value');
        var attr_select = $('#attribute_values_' + index_value);
        var taxonomy = $(this)
          .parent()
          .data('taxonomy');
        var new_attribute_name = window.prompt(
          wcv_frontend_product.new_attribute_prompt
        );

        if (new_attribute_name) {
          var data = {
            action: 'wcv_json_add_new_attribute',
            taxonomy: taxonomy,
            term: new_attribute_name,
            security: wcv_frontend_product.wcv_add_attribute_nonce
          };

          $.post(wcv_frontend_product.ajax_url, data, function(response) {
            if (response.error) {
              // Error
              window.alert(response.error);
            } else if (response.slug) {
              // Success
              attr_select.append(
                $('<option />')
                  .attr('value', response.slug)
                  .prop('selected', 'selected')
                  .text(response.name)
              );
              attr_select.trigger('change');
              $(attr_select)
                .select2('destroy')
                .select2();
            }

            $('.product_attributes').unblock();
          });
        } else {
          $('.product_attributes').unblock();
        }

        return false;
      }
    );

    // Hook to parsley form validation
    window.Parsley.on('form:submit', function() {
      return validateAttributesRequired();
    });

    // Check for required fields
    $('#wcv-product-edit').on('submit', function(e) {
      var validationFailed = false;

      // Check if featured image is required
      if (wcv_frontend_product.require_featured_image == 1) {
        if ($('#_featured_image_id').val() === '') {
          $('.wcv_featured_image_msg').html(
            wcv_frontend_product.require_featured_image_msg
          );
          e.preventDefault();
          validationFailed = true;
        }
      }

      // Check if gallery images are required
      if (wcv_frontend_product.require_gallery_image == 1) {
        if ($('#product_image_gallery').val() === '') {
          $('.wcv_gallery_msg').html(
            wcv_frontend_product.require_gallery_image_msg
          );
          e.preventDefault();
          validationFailed = true;
        }
      }

      // // Download file is required
      if (wcv_frontend_product.require_download_file == 1) {
        var $download_file_table = $('.download_file_table');
        var file_count = $download_file_table.length;
        var validated = true;
        const inputType = $('#_downloadable').attr('type');

        if (
          (inputType === 'hidden' && $('#_downloadable').val() === 'yes') ||
          (inputType === 'checkbox' && $('#_downloadable').is(':checked'))
        ) {
          if ($('.downloadable_files').length) {
            if ($download_file_table.find('.download_file').length == 0) {
              validated = false;
            }

            if (file_count > 0) {
              $('.download_file').each(function() {
                if (
                  $(this)
                    .find('td.file_name')
                    .find('input')
                    .val() === '' ||
                  $(this)
                    .find('td.file_url')
                    .find('input')
                    .val() === ''
                ) {
                  validated = false;
                }
              });
            } else {
              validated = false;
            }

            if (!validated) {
              $('.downloadable_files').append(
                '<span class="wcv_required_form_msg">' +
                  wcv_frontend_product.require_download_file_msg +
                  '</span>'
              );
              $('.download_file_table').css({
                color: '#b94a48',
                'background-color': '#f2dede',
                border: '1px solid #cc0000'
              });
              // Scroll to the download file table
              e.preventDefault();
              validationFailed = true;
              document
                .getElementById('files_download')
                .scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      } // END:  Download file is required

      // Check attributes validation
      if (!validateAttributesRequired()) {
        validationFailed = true;
      }

      const saveBtn = $('#product_save_button');
      if (saveBtn.length) {
        if (validationFailed) {
          // Re-enable the button if validation failed
          saveBtn.removeAttr('disabled');
        } else {
          // Disable the button only if validation passed
          saveBtn.attr('disabled', 'disabled');
        }
      }
    });
    // END: Check for required fields

    var validateAttributesRequired = function() {
      var attributesValid = true;
      // Attributes required
      if ($('li a.attributes').length) {
        if (wcv_frontend_product.require_attributes == 1) {
          var attribute_container_count = $('.woocommerce_attribute ').length;

          if (attribute_container_count > 0) {
            $('.wcv_attribute_data').each(function() {
              if (
                !$(this)
                  .find('.attribute_values')
                  .val()
              ) {
                $('.attributes-validation-error').html(
                  '<span class="wcv_required_form_msg">' +
                    wcv_frontend_product.require_attributes_msg +
                    '</span>'
                );
                $('a.tabs-tab.attributes').css(
                  'background-color',
                  'rgba(150,8,12,.55)'
                );
                $('a.tabs-tab.attributes').css(
                  'color',
                  'rgba(255,255,255,.55)'
                );

                attributesValid = false;
              } else {
                $('.attributes-validation-error').html('');
                $('a.tabs-tab.attributes').css('background-color', '');
                $('a.tabs-tab.attributes').css('color', '');
              }
            });
          } else {
            $('.attributes-validation-error').html(
              '<span class="wcv_required_form_msg">' +
                wcv_frontend_product.require_attributes_msg +
                '</span><br />'
            );
            $('a.tabs-tab.attributes').css(
              'background-color',
              'rgba(150,8,12,.55)'
            );
            $('a.tabs-tab.attributes').css('color', 'rgba(255,255,255,.55)');

            attributesValid = false;
          }
        }
      } // END:  Attributes required

      return attributesValid;
    };

    //Remove all field on shipping tab
    if (!wcv_frontend_product.shipping_system_enabled) {
      $('#shipping').html('');
    }

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      $('.wcv-upload-files-input').on(eventName, function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      $('.wcv-upload-files-input').on(eventName, function() {
        $(this).addClass('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      $('.wcv-upload-files-input').on(eventName, function() {
        $(this).removeClass('is-dragover');
      });
    });

    const uploadImage = function(file) {
      var formData = new FormData();
      formData.append('action', 'upload-attachment');
      formData.append('async-upload', file);
      formData.append(
        '_wpnonce',
        _wpPluploadSettings.defaults.multipart_params._wpnonce
      );
      let attachment_id = 0;

      $.ajax({
        url: wcv_frontend_product.ajax_url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        async: false,
        success: function(response) {
          if (response.success) {
            attachment_id = response.data.id;
          } else {
            throw new Error(response.data.message || 'Unknown error');
          }
        },
        error: function(error) {
          alert('Error uploading file');
        }
      });
      return attachment_id;
    };

    $('.product-feat-image-upload .wcv-upload-files-input').on('drop', function(
      e
    ) {
      $(this).addClass('is-uploading');
      const files = Array.from(e.originalEvent.dataTransfer.files);
      const promiseUpload = [];
      files.forEach(file => {
        promiseUpload.push(uploadImage(file));
      });

      Promise.all(promiseUpload).then(attachment_ids => {
        featured_image_uploader();
        $(this).removeClass('is-uploading');
      });

      $(this).removeClass('is-uploading');
    });

    $('.product-feat-image-upload .wcv-browser-file').on('click', function(e) {
      e.preventDefault();
      featured_image_uploader();
      return false;
    });

    $('.product-imgs-gallery-upload .wcv-upload-files-input').on(
      'drop',
      function(e) {
        $(this).addClass('is-uploading');
        const files = Array.from(e.originalEvent.dataTransfer.files);
        const promiseUpload = [];
        files.forEach(file => {
          promiseUpload.push(uploadImage(file));
        });

        Promise.all(promiseUpload).then(attachment_ids => {
          product_gallery_uploader();
          $(this).removeClass('is-uploading');
        });

        $(this).removeClass('is-uploading');
      }
    );

    $('.wcv-exporter-wrapper .select2').select2();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Function to count checked checkboxes
  const countCheckedCheckboxes = () => {
    const checkboxes = document.querySelectorAll('.wcv_variation_checkbox');
    let count = 0;
    let countAttrValue = false;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        count++;
      }
    });
    const attributeValues = document.querySelectorAll('.attribute_values');
    for (let i = 0; i < attributeValues.length; i++) {
      if (attributeValues[i].value) {
        countAttrValue = true;
        break;
      }
    }
    if (count > 0 && countAttrValue) {
      document.getElementById('wcv-attr-message').classList.add('hide-all');
      document.querySelectorAll('.variations-toolbar').forEach(toolbar => {
        toolbar.classList.remove('hide-all');
      });
    } else {
      document.getElementById('wcv-attr-message').classList.remove('hide-all');
      document.querySelectorAll('.variations-toolbar').forEach(toolbar => {
        toolbar.classList.add('hide-all');
      });
    }
  };

  // Add event listeners to checkboxes
  const addCheckboxListeners = () => {
    const checkboxes = document.querySelectorAll('.wcv_variation_checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.removeEventListener('change', countCheckedCheckboxes); // Remove existing listener to avoid duplicates
      checkbox.addEventListener('change', countCheckedCheckboxes);
    });
  };

  const attributesElement = document.getElementById('attributes');

  if (attributesElement) {
    // Initial count and listeners
    countCheckedCheckboxes();
    addCheckboxListeners();
    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          addCheckboxListeners();
          countCheckedCheckboxes();
        }
      });
    });

    // Start observing the attributes element for changes
    observer.observe(attributesElement, {
      childList: true,
      subtree: true
    });
  }

  const calculateExtraSpace = containerSelector => {
    // Select the grid container
    const wrapper = document.getElementById('product-imgs-gallery-upload');
    if (!wrapper) {
      return;
    }
    const wrapperPadding = getComputedStyle(wrapper).paddingLeft;
    const gridContainer = document.getElementById(containerSelector);
    const styles = getComputedStyle(gridContainer);

    // Get container width
    const containerWidth =
      Math.round(wrapper.clientWidth) - parseFloat(wrapperPadding);

    // Calculate total width occupied by grid cells
    const cellWidth = parseFloat(styles.gridTemplateColumns.split(' ')[0]); // Assuming uniform cell width
    const columnCount = Math.floor(containerWidth / cellWidth);
    // Calculate total gap space
    const gapSize = parseFloat(styles.columnGap) || 0; // Handle no gap case
    const totalGapWidth = gapSize * (columnCount - 1);
    const totalCellWidth = cellWidth * columnCount;
    // Total occupied width by the grid
    const totalOccupiedWidth = totalCellWidth + totalGapWidth;

    document.getElementById(
      'product-imgs-gallery-parent'
    ).style.width = `${totalOccupiedWidth}px`;

    if (window.innerWidth < 768) {
      wrapper.classList.remove('wcv-flex-end');
      wrapper.classList.add('wcv-flex-center');
    }
  };

  calculateExtraSpace('product_images');
  window.addEventListener('resize', function() {
    calculateExtraSpace('product_images');
  });
});
