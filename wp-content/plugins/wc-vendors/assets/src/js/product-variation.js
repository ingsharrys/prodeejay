jQuery(function($) {
  $(document).ready(function() {
    $('select.variation_actions').select2({
      placeholder: wcv_product_variation.variation_actions_placeholder,
      allowClear: true
    })
  })
  const debug = false
  const parent_obj = {}
  let existing_attributes = {}

  // Allow variations sorting
  $('.wcv_variations', $('#wcv_variable_product_options')).sortable({
    items: '.wcv_variation',
    cursor: 'move',
    axis: 'y',
    handle: '.wcv-sort',
    scrollSensitivity: 40,
    forcePlaceholderSize: true,
    helper: 'clone',
    opacity: 0.65,
    stop: function() {
      wcv_product_variations_actions.variation_row_indexes()
    }
  })
  const openVariationDivEvent = new Event('open_variations')
  /**
   *  Utilities for variations
   */
  const wcv_utils = {
    // Create a variation attribute drop down
    create_variation_drop_down: function(
      taxonomy,
      options,
      taxonomy_label,
      position
    ) {
      const name = 'attribute_' + taxonomy + '[' + position + ']'
      const css_class = 'variation_attribute ' + taxonomy

      const taxonomy_dd = $('<select></select>')
        .attr('name', name)
        .attr('class', css_class)
        .data('taxonomy', taxonomy)

      taxonomy_dd.append(
        '<option value="">' +
          wcv_product_variation.i18n_any_label +
          ' ' +
          taxonomy_label +
          '</option>'
      )

      $.each(options, function(value, text) {
        taxonomy_dd.append(
          '<option value="' + value + '">' + text + '</option>'
        )
      })

      return taxonomy_dd
    },

    // Create the variations default drop down
    create_defaults_drop_down: function(taxonomy, options, taxonomy_label) {
      const name = 'default_attribute_' + taxonomy
      const css_class = 'defaut_attribute ' + taxonomy

      const taxonomy_dd = $('<select></select>')
        .attr('name', name)
        .attr('class', css_class)
        .data('current', '')
        .data('taxonomy', taxonomy)

      taxonomy_dd.append(
        '<option value="">' +
          wcv_product_variation.i18n_any_label +
          ' ' +
          taxonomy_label +
          '</option>'
      )

      $.each(options, function(value, text) {
        taxonomy_dd.append(
          '<option value="' + value + '">' + text + '</option>'
        )
      })

      return taxonomy_dd
    },

    // Sort select terms alphabetically
    sort_select_terms: function(select_element) {
      const $dd = select_element

      if ($dd.length > 0) {
        // make sure we found the select we were looking for

        // save the selected value
        const selectedVal = $dd.val()

        // get the options and loop through them
        const $options = $('option', $dd)
        const arrVals = []
        $options.each(function() {
          // push each option value and text into an array
          arrVals.push({
            val: $(this).val(),
            text: $(this).text()
          })
        })

        // sort the array by the value (change val to text to sort by text instead)
        arrVals.sort(function(a, b) {
          if (a.val > b.val) {
            return 1
          } else if (a.val === b.val) {
            return 0
          } else {
            return -1
          }
        })

        // loop through the sorted array and set the text/values to the options
        for (let i = 0, l = arrVals.length; i < l; i++) {
          $($options[i])
            .val(arrVals[i].val)
            .text(arrVals[i].text)
        }

        // set the selected value back
        $dd.val(selectedVal)

        return $dd
      }
    },

    update_variation_select_positions: function() {
      const attributes = $('#wcv-variation-attributes').data('variation_attr')

      $('.wcv_variation').each(function() {
        const $selects = $(this).find('select.variation_attribute')

        $selects.sort(function(a, b) {
          const an = attributes[$(a).data('taxonomy')].position
          const bn = attributes[$(b).data('taxonomy')].position

          if (an > bn) {
            return 1
          }
          if (an < bn) {
            return -1
          }

          return 0
        })

        $selects.detach().appendTo($(this).find('div.variations_wrapper'))
      })
    },

    update_default_select_positions: function() {
      const attributes = $('#wcv-variation-attributes').data('variation_attr')
      const $selects = $('.variation-default-values').find(
        'select.default_attribute'
      )

      $selects.sort(function(a, b) {
        const an = attributes[$(a).data('taxonomy')].position
        const bn = attributes[$(b).data('taxonomy')].position

        if (an > bn) {
          return 1
        }
        if (an < bn) {
          return -1
        }

        return 0
      })

      $selects.detach().appendTo('.variation-default-values')
    }
  }

  /**
   * Variations actions
   */
  const wcv_product_variations_actions = {
    /**
     * Initialize variations actions
     */
    init: function() {
      $('#wcv_variable_product_options')
        .on(
          'change',
          'input.variable_is_downloadable',
          this.variable_is_downloadable
        )
        .on('change', 'input.variable_is_virtual', this.variable_is_virtual)
        .on('change', 'input.variable_manage_stock', this.variable_manage_stock)
        .on('click', 'button.notice-dismiss', this.notice_dismiss)
        .on('click', 'h5 .wcv-sort', this.set_menu_order)
        .on('reload', this.reload)

      $(
        'input.variable_is_downloadable, input.variable_is_virtual, input.variable_manage_stock'
      ).change()
      $(document.body).on('wcv_variations_added', this.variation_added)
    },

    /**
     * Reload UI
     *
     * @param {Object} event
     * @param {Int} qty
     */
    reload: function() {
      wcv_product_variations_ajax.load_variations(1)
      wcv_product_variations_actions.variation_options()
    },

    /**
     * Check if variation is downloadable and show/hide elements
     */
    variable_is_downloadable: function() {
      $(this)
        .closest('.wcv_variation')
        .find('.show_if_variation_downloadable')
        .hide()

      if ($(this).is(':checked')) {
        $(this)
          .closest('.wcv_variation')
          .find('.show_if_variation_downloadable')
          .show()
        $(this)
          .closest('.wcv_variation')
          .height('auto')
      }
    },

    /**
     * Check if variation is virtual and show/hide elements
     */
    variable_is_virtual: function() {
      $(this)
        .closest('.wcv_variation')
        .find('.hide_if_variation_virtual')
        .show()

      if ($(this).is(':checked')) {
        $(this)
          .closest('.wcv_variation')
          .find('.hide_if_variation_virtual')
          .hide()
      }
    },

    /**
     * Check if variation manage stock and show/hide elements
     */
    variable_manage_stock: function() {
      $(this)
        .closest('.wcv_variation')
        .find('.show_if_variation_manage_stock')
        .hide()
      $(this)
        .closest('.wcv_variation')
        .find('.hide_if_variation_manage_stock')
        .show()

      if ($(this).is(':checked')) {
        $(this)
          .closest('.wcv_variation')
          .find('.show_if_variation_manage_stock')
          .show()
        $(this)
          .closest('.wcv_variation')
          .find('.hide_if_variation_manage_stock')
          .hide()
      }
    },

    /**
     * Notice dismiss
     */
    notice_dismiss: function() {
      $(this)
        .closest('div.notice')
        .remove()
    },

    /**
     * Update the input with provided value
     */
    update_input: function(value, field) {
      $('.' + field).val(value)
      return false
    },

    /**
     * Update price field up or down by number or percent
     */
    adjust_price: function(field, value, operator) {
      const somevalue = value

      $('.wcv_variation .' + field).each(function(index, el) {
        let temp_value = 0

        let current_price = parseFloat($(this).attr('value'))
        let new_price = 0

        if (current_price.length <= 0 || isNaN(current_price)) {
          current_price = 0
        }

        if (value.indexOf('%') >= 0) {
          temp_value = parseFloat(value.replace('%', ''))
          const percentage = (temp_value / 100) * parseFloat(current_price)
          new_price =
            operator === '+'
              ? parseFloat(current_price) + percentage
              : parseFloat(current_price) - percentage
        } else {
          temp_value = parseFloat(value)
          new_price =
            operator === '+'
              ? parseFloat(current_price) + temp_value
              : parseFloat(current_price) - temp_value
        }

        if (new_price < 0 || isNaN(new_price)) {
          new_price = 0
        }

        $(this).attr('value', new_price)
      })

      return false
    },

    /**
     * Run actions when variations is loaded
     *
     * @param {Object} event
     * @param {Int} needsUpdate
     */
    variations_loaded: function(event, needsUpdate) {
      needsUpdate = needsUpdate || false

      const wrapper = $('#wcv_variable_product_options')

      if (!needsUpdate) {
        // Show/hide downloadable, virtual and stock fields
        $(
          'input.variable_is_downloadable, input.variable_is_virtual, input.variable_manage_stock',
          wrapper
        ).change()

        // Open sale schedule fields when have some sale price date
        $('.wcv_variation', wrapper).each(function(index, el) {
          const $el = $(el)
          const date_from = $('.sale_price_dates_from', $el).val()
          const date_to = $('.sale_price_dates_to', $el).val()

          if (date_from !== '' || date_to !== '') {
            $('a.sale_schedule', $el).click()
          }
        })
      }

      // Allow sorting
      $('.wcv_variations', wrapper).sortable({
        items: '.wcv_variation',
        cursor: 'move',
        axis: 'y',
        handle: '.wcv-sort',
        scrollSensitivity: 40,
        forcePlaceholderSize: true,
        helper: 'clone',
        opacity: 0.65,
        stop: function() {
          wcv_product_variations_actions.variation_row_indexes()
        }
      })
    },

    /**
     * Run actions when added a variation
     *
     * @param {Object} event
     * @param {Int} qty
     */
    variation_added: function(event, qty) {
      if (qty === 1) {
        wcv_product_variations_actions.variations_loaded(null, true)
      }
    },

    /**
     * Lets the user manually input menu order to move items around pages
     */
    set_menu_order: function(event) {
      event.preventDefault()
      const $menu_order = $(this)
        .closest('.wcv_variation')
        .find('.variation_menu_order')
      const value = window.prompt(
        wcv_product_variation.i18n_enter_menu_order,
        $menu_order.val()
      )

      if (value != null) {
        // Set value, save changes and reload view
        $menu_order.val(parseInt(value, 10)).change()
        wcv_product_variations_ajax.save_variations()
      }
    },

    /**
     * Set menu order
     */
    variation_row_indexes: function() {
      const wrapper = $('#wcv_variable_product_options').find('.wcv_variations')
      const current_page = parseInt(wrapper.attr('data-page'), 10)
      const offset = parseInt(
        (current_page - 1) * wcv_product_variation.variations_per_page,
        10
      )

      $('.wcv_variations .wcv_variation').each(function(index, el) {
        $('.variation_menu_order', el)
          .val(
            parseInt($(el).index('.wcv_variations .wcv_variation'), 10) +
              1 +
              offset
          )
          .change()
      })
    }
  }

  /**
   * Variations media actions
   */
  const wcv_product_variations_media = {
    /**
     * Variation image object
     *
     * @type {Object}
     */
    setting_variation_image: null,

    mediaUploader: null,

    /**
     * Initialize media actions
     */
    init: function() {
      $('#wcv_variable_product_options').on(
        'drop',
        '.wcv-upload-files-input',
        this.add_image
      )

      $('#wcv_variable_product_options .wcv_remove').on(
        'click',
        this.remove_image
      )

      $('#wcv_variable_product_options').on(
        'click',
        '.wcv-browser-file',
        this.add_image
      )
    },

    uploadImage: function(file) {
      const formData = new FormData()
      formData.append('action', 'upload-attachment')
      formData.append('async-upload', file)
      formData.append(
        '_wpnonce',
        _wpPluploadSettings.defaults.multipart_params._wpnonce
      )
      let attachment_id = 0
      return new Promise((resolve, reject) => {
        $.ajax({
          url: wcv_product_variation.ajax_url,
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          dataType: 'json',
          async: false,
          success: function(response) {
            if (response.success) {
              attachment_id = response.data.id
              resolve(attachment_id)
            } else {
              alert('Error uploading file')
              reject(response)
            }
          },
          error: function(error) {
            alert('Error uploading file')
            reject(error)
          }
        })
      })
    },

    openMediaUploader: function(callback) {
      // Always create a new instance or clear previous handlers
      if (wcv_product_variations_media.mediaUploader) {
        // Remove all previous 'select' event handlers
        wcv_product_variations_media.mediaUploader.off('select')
      } else {
        wcv_product_variations_media.mediaUploader = wp.media.frames.file_frame = wp.media(
          {
            title: wcv_product_variation.i18n_choose_image,
            button: {
              text: wcv_product_variation.i18n_set_image
            },
            multiple: false
          }
        )
      }

      // Attach the new event handler
      wcv_product_variations_media.mediaUploader.on('select', function() {
        const attachment = wcv_product_variations_media.mediaUploader
          .state()
          .get('selection')
          .first()
          .toJSON()

        callback(attachment)
      })

      wcv_product_variations_media.mediaUploader.open()
    },

    /**
     * Added new image
     *
     * @param {Object} event
     */
    add_image: function(event) {
      const $this = $(this)
      const $parent = $this.closest('.upload_image')
      const $image_id = $parent.find('.upload_image_id')
      let file = null
      setting_variation_image = $parent

      const eventName = event.originalEvent.type
      if (eventName === 'drop') {
        file = event.originalEvent.dataTransfer.files[0]
      }

      if (file) {
        wcv_product_variations_media
          .uploadImage(file)
          .then(attachment_id => {
            wcv_product_variations_media.openMediaUploader(function(
              attachment
            ) {
              $image_id.val(attachment_id)
              $parent.find('img').attr('src', attachment.url)
              $parent.find('.product-variation-feat-upload ').addClass('hidden')
              $parent.find('.upload_image_button').removeClass('hide-all')
            })
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        wcv_product_variations_media.openMediaUploader(function(attachment) {
          $image_id.val(attachment.id)
          $parent.find('img').attr('src', attachment.url)
          $parent.find('.product-variation-feat-upload ').addClass('hidden')
          $parent.find('.upload_image_button').removeClass('hide-all')
        })
      }
    },

    remove_image: function(e) {
      e.preventDefault()
      const $this = $(this)
      const $parent = $this.closest('.upload_image')
      const $image_id = $parent.find('.upload_image_id')
      $image_id.val('')
      $parent
        .find('img')
        .attr('src', wcv_product_variation.wcv_woocommerce_placeholder_img_src)
      $parent.find('.upload_image_button').addClass('hide-all')
      $parent.find('.product-variation-feat-upload ').removeClass('hidden')
    },

    /**
     * Restore wp.media post ID.
     */
    restore_wp_media_post_id: function() {
      wp.media.model.settings.post.id = $('#post_id').val()
    }
  }

  /**
   * Product variations metabox ajax methods
   */
  const wcv_product_variations_ajax = {
    /**
     * Adding variation position - top or bottom
     */
    addingPosition: 'top',
    /**
     * Initialize variations ajax methods
     */
    init: function() {
      $('#wcv_variable_product_options').on(
        'click',
        '.remove_variation',
        this.remove_variation
      )

      $(document.body)
        .on(
          'change',
          '#wcv_variable_product_options .wcv_variations :input',
          this.input_changed
        )
        .on('change', '.variations-defaults select', this.defaults_changed)

      $('.wcv-metaboxes-wrapper').on(
        'change',
        'select.variation_grouped_actions',
        function() {
          const current_select_id = $(this).attr('id')
          wcv_product_variations_ajax.do_variation_action(current_select_id)
        }
      )

      $('.wcv_single_add_variation').on('click', function() {
        if ($(this).hasClass('bottom')) {
          wcv_product_variations_ajax.addingPosition = 'bottom'
        } else {
          wcv_product_variations_ajax.addingPosition = 'top'
        }
        wcv_product_variations_ajax.add_variation()
      })

      $('.wcv-metaboxes-wrapper').on(
        'change',
        'select.variation_actions',
        function() {
          const current_select_id = $(this).attr('id')
          wcv_product_variations_ajax.do_variation_action(current_select_id)
        }
      )

      $(document).on('click', '.wcv-accordion-title', function() {
        if ($(this).data('tab') === 'variations') {
          wcv_product_variations_ajax.check_for_attribute_changes()
        }
      })

      $(document.body).on(
        'woocommerce_added_attribute',
        wcv_product_variations_ajax.check_for_attribute_changes
      )

      $(document.body).on(
        'woocommerce_removed_attribute',
        wcv_product_variations_ajax.check_for_attribute_changes
      )

      // populate after doc ready as attributes aren't loaded otherwise
      $(document).ready(function() {
        const attributes = $('#wcv-variation-attributes').data('variation_attr')
        if ($.isEmptyObject(existing_attributes)) {
          existing_attributes = $.extend(
            {},
            wcv_product_variation.product_attrs
          )
        }
      })
    },

    /**
     * Check for attributes and adjust UI accordingly
     */
    check_for_attribute_changes: function() {
      const attributes = $('#wcv-variation-attributes').data('variation_attr')
      if ($.isEmptyObject(existing_attributes)) {
        existing_attributes = $.extend({}, attributes)
      }

      // Compare objects
      if (!areObjectsEqual(existing_attributes, attributes)) {
        // Objects are different - handle changes
        if (
          areObjectsEqual(
            Object.keys(existing_attributes),
            Object.keys(attributes)
          )
        ) {
          // Same keys but different values
          wcv_utils.update_variation_select_positions()
          wcv_utils.update_default_select_positions()
        } else if (
          Object.keys(existing_attributes).length >
          Object.keys(attributes).length
        ) {
          // Handle removed attributes
          if (
            Object.keys(existing_attributes).length ===
            Object.keys(attributes).length
          ) {
            $.each(existing_attributes, function(taxonomy, data) {
              const terms = _.omit(
                data.values,
                Object.keys(attributes[taxonomy].values)
              )
              if (!$.isEmptyObject(terms)) {
                wcv_product_variations_ajax.update_variations_ui(
                  taxonomy,
                  terms,
                  'term',
                  '-'
                )
              }
            })
          } else {
            const removed = _.omit(existing_attributes, Object.keys(attributes))
            $.each(removed, function(index, data) {
              wcv_product_variations_ajax.update_variations_ui(
                index,
                data,
                'attribute',
                '-'
              )
              wcv_product_variations_ajax.update_defaults_ui(
                index,
                data,
                'attribute',
                '-'
              )
            })
          }
        } else {
          // Handle added attributes
          if (
            Object.keys(existing_attributes).length ===
            Object.keys(attributes).length
          ) {
            $.each(attributes, function(taxonomy, data) {
              const terms = _.omit(
                data.values,
                Object.keys(existing_attributes[taxonomy].values)
              )
              if (!$.isEmptyObject(terms)) {
                wcv_product_variations_ajax.update_variations_ui(
                  taxonomy,
                  terms,
                  'term',
                  '+'
                )
              }
            })
          } else {
            const added = _.omit(attributes, Object.keys(existing_attributes))
            $.each(added, function(index, data) {
              wcv_product_variations_ajax.update_variations_ui(
                index,
                data,
                'attribute',
                '+'
              )
              wcv_product_variations_ajax.update_defaults_ui(
                index,
                data,
                'attribute',
                '+'
              )
            })
          }
        }

        // Clone the new attributes to keep track
        existing_attributes = jQuery.extend({}, attributes)
      }

      // Show the toolbar or notice
      if (jQuery.isEmptyObject(attributes)) {
        $('.variations-toolbar').hide()
        $('.variations_notice').show()
      } else {
        $('.variations-toolbar').show()
        $('.variations_notice').hide()
      }

      // Update the variation count if required
      wcv_product_variations_ajax.check_total_variations()
      document.dispatchEvent(openVariationDivEvent)
    },

    /**
     * Update the Variations UI when a change has been detected
     */
    update_variations_ui: function(taxonomy, data, element_type, operator) {
      const attributes = $('#wcv-variation-attributes').data('variation_attr')

      wcv_product_variations_ajax.block()
      let sort_required

      if (Object.keys(attributes).length === 0) {
        $('.wcv_variation').each(function() {
          $(this).remove()
        })
        $('.wcv_variations')
          .attr('data-attributes', JSON.stringify(attributes))
          .attr('data-total', 0)
        $('.variations_notice').removeClass('hide-all')
        $('#wcv-attr-message').removeClass('hide-all')
        $('.wcv_single_add_variation').addClass('hide-all')
        wcv_product_variations_counts.update_variations_count(0)
        wcv_product_variations_ajax.unblock()
        return false
      }

      $('.wcv_variation').each(function(position, el) {
        switch (element_type) {
          case 'attribute':
            if (operator === '-') {
              $(this)
                .find('select.' + taxonomy)
                .remove()
            } else {
              const drop_down = wcv_utils.create_variation_drop_down(
                taxonomy,
                data.values,
                data.label,
                position
              )
              $(this)
                .find('.variation_title')
                .append(drop_down)

              wcv_utils.update_variation_select_positions()
              wcv_utils.update_default_select_positions()
            }
            break
          case 'term':
            if (operator === '-') {
              const current_select = $(this).find('select.' + taxonomy)
              $.each(data, function(value, text) {
                current_select.find('[value="' + value + '"]').remove()
              })
            } else {
              let current_select = $(this).find('select.' + taxonomy)
              $.each(data, function(key, value) {
                current_select.append(
                  $('<option></option>')
                    .attr('value', key)
                    .text(value)
                )
              })
              current_select = wcv_utils.sort_select_terms(current_select)
            }
            break
          default:
            break
        }
      })

      wcv_product_variations_ajax.unblock()
    },

    update_defaults_ui: function(taxonomy, data, element_type, operator) {
      switch (element_type) {
        case 'attribute':
          if (operator === '-') {
            $('.variations-defaults')
              .find('select.' + taxonomy)
              .remove()
          } else {
            const drop_down = wcv_utils.create_defaults_drop_down(
              taxonomy,
              data.values,
              data.label
            )
            $('.variation-default-values').append(drop_down)
            wcv_utils.update_variation_select_positions()
            wcv_utils.update_default_select_positions()
          }
          break
        case 'term':
          if (operator === '-') {
            const current_select = $(this).find('select.' + taxonomy)
            $.each(data, function(value, text) {
              current_select.find('[value="' + value + '"]').remove()
            })
          } else {
            let current_select = $(this).find('select.' + taxonomy)
            $.each(data, function(key, value) {
              current_select.append(
                $('<option></option>')
                  .attr('value', key)
                  .text(value)
              )
            })
            current_select = wcv_utils.sort_select_terms(current_select)
          }
          break
        default:
          break
      }
    },

    /**
     * Check the total variation count
     */
    check_total_variations: function() {
      const total_variations = $('.wcv_variation').length

      // Remove the defaults toolbar if there are no variations
      if (total_variations === 0) {
        $('.variations-defaults').remove()
      }

      return false
    },

    /**
     * Block edit screen
     */
    block: function() {
      $('#wcv_variable_product_options').block({
        message: null,
        overlayCSS: {
          background: '#fff',
          opacity: 0.6
        }
      })
    },

    /**
     * Unblock edit screen
     */
    unblock: function() {
      $('#wcv_variable_product_options').unblock()
    },

    /**
     *    Load default attributes drop downs
     */
    load_default_attributes: function() {
      if ($('.wcv_variation').length === 0) {
        const data = {
          action: 'wcv_json_default_variation_attributes',
          attributes: $('#wcv-variation-attributes').data('variation_attr'),
          security: wcv_product_variation.wcv_add_variation_nonce
        }

        $.post(wcv_product_variation.ajax_url, data, function(response) {
          const default_attributes = $(response)
          $('.toolbar-variations-defaults').prepend(default_attributes)
          $('.toolbar-variations-defaults').show()
        })
      }
    },

    /**
     * Add variation
     *
     * @return {Bool}
     */
    add_variation: function() {
      wcv_product_variations_ajax.block()
      if (!parent_obj || Object.keys(parent_obj).length === 0) {
        wcv_product_variations_ajax.populate_parent()
      }
      const data = {
        action: 'wcv_json_add_variation',
        loop: $('.wcv_variation').length,
        parent_data: parent_obj,
        attributes: $('#wcv-variation-attributes').data('variation_attr'),
        security: wcv_product_variation.wcv_add_variation_nonce
      }

      $.post(wcv_product_variation.ajax_url, data, function(response) {
        const variation = $(response)
        wcv_product_variations_ajax.load_default_attributes()
        switch (wcv_product_variations_ajax.addingPosition) {
          case 'top':
            $('#wcv_variable_product_options')
              .find('.wcv_variations')
              .prepend(variation)
            break
          case 'bottom':
            $('#wcv_variable_product_options')
              .find('.wcv_variations')
              .append(variation)
            break
        }
        $('#wcv_variable_product_options').trigger('wcv_variations_added', 1)
        $('.wcv_single_add_variation.bottom')
          .closest('.hide-all')
          .removeClass('hide-all')
        // Initialize datetime pickers for newly added variation
        $(document).trigger('wcv-datetime-field-added')
        wcv_product_variations_ajax.unblock()
        document.dispatchEvent(openVariationDivEvent)
      })

      return false
    },

    /**
     * Remove variation
     *
     * @return {Bool}
     */
    remove_variation: function() {
      if (window.confirm(wcv_product_variation.i18n_remove_variation)) {
        const $parent = $(this).closest('.wcv_variation')
        const variation_id = $parent.attr('rel')
        const loop = $parent.data('loop')
        $parent.remove()
        wcv_product_variations_ajax.add_deleted_variation(variation_id, loop)
        wcv_product_variations_counts.update_variations_count(-1)
        wcv_product_variations_ajax.check_total_variations()
        document.dispatchEvent(openVariationDivEvent)
        return false
      }
    },

    /**
     * Add a variation_id to the deleted list
     */
    add_deleted_variation: function(variation_id, loop) {
      // Only run this for variations that have come from the db
      if (variation_id !== 0) {
        let variation_ids = $('#wcv_deleted_variations').data('variations')
        const tempObj = {}

        if (jQuery.isEmptyObject(variation_ids)) {
          variation_ids = []
        }
        tempObj.loop = loop
        tempObj.id = variation_id
        variation_ids.push(tempObj)
        $('#wcv_deleted_variations').data('variations', variation_ids)
        $('#wcv_deleted_variations').val(JSON.stringify(variation_ids))
        return false
      }
    },

    /**
     * Delete all variations from the UI and set the delete all for the backend
     */
    delete_all_variations: function() {
      $('.wcv_variation').each(function() {
        const variation_id = $(this).attr('rel')
        const loop = $(this).data('loop')
        $(this).remove()
        wcv_product_variations_ajax.add_deleted_variation(variation_id, loop)
        wcv_product_variations_counts.update_variations_count(-1)
        wcv_product_variations_ajax.check_total_variations()
      })

      return false
    },

    /**
     * Link all variations (or at least try :p)
     *
     * @return {Bool}
     */
    link_all_variations: function() {
      if (window.confirm(wcv_product_variation.i18n_link_all_variations)) {
        wcv_product_variations_ajax.block()
        const available_variations = []
        const existing_variations = $('.wcv_variation').length
        wcv_product_variations_ajax.populate_parent()
        // Get available variations set in the UI
        $('.wcv_variation').each(function(index, el) {
          const existing_variation = {}

          // check to see if ANY of the selects are missing a value
          const missing_attribute = $(this)
            .find('.variation_attribute')
            .filter(function() {
              return this.value === ''
            })

          // Exit the loop
          if (missing_attribute.length) {
            return true
          }

          $(this)
            .find('.variation_attribute')
            .each(function() {
              existing_variation[
                $(this)
                  .attr('name')
                  .split('[')[0]
              ] = $(this).val()
            })

          available_variations.push(existing_variation)
        })

        // Load all variations via ajax
        const data = {
          action: 'wcv_json_link_all_variations',
          parent_data: parent_obj,
          loop: $('.wcv_variation').length,
          attributes: $('#wcv-variation-attributes').data('variation_attr'),
          available_variations,
          security: wcv_product_variation.wcv_json_link_all_variations_nonce
        }

        $.post(wcv_product_variation.ajax_url, data, function(response) {
          const variations = $(response)
          wcv_product_variations_ajax.load_default_attributes()
          $('#wcv_variable_product_options')
            .find('.wcv_variations')
            .prepend(variations)
          const variations_count =
            parseInt($('.wcv_variation').length) - parseInt(existing_variations)

          // Display how many variations were added
          if (variations_count === 1) {
            window.alert(
              variations_count +
                ' ' +
                wcv_product_variation.i18n_variation_added
            )
          } else if (variations_count === 0 || variations_count > 1) {
            window.alert(
              variations_count +
                ' ' +
                wcv_product_variation.i18n_variations_added
            )
          } else {
            window.alert(wcv_product_variation.i18n_no_variations_added)
          }

          wcv_product_variations_counts.update_variations_count(
            variations_count
          )

          $('#wcv_variable_product_options').trigger(
            'wcv_variations_added',
            variations_count
          )
          // Initialize datetime pickers for newly added variations
          $(document).trigger('wcv-datetime-field-added')
          wcv_product_variations_ajax.unblock()
        })

        return false
      }
    },

    /**
     * Add new class when have changes in some input
     */
    input_changed: function() {
      $(this)
        .closest('.wcv_variation')
        .addClass('variation-needs-update')

      $(
        'button.cancel-variation-changes, button.save-variation-changes'
      ).removeAttr('disabled')

      $('#wcv_variable_product_options').trigger('wcv_variations_input_changed')
    },

    /**
     * Populate parent
     */
    populate_parent: function() {
      parent_obj.title = $('#post_title').val()
      parent_obj.sku = $('#_sku').val()
      parent_obj.weight = $('#_weight').val()
      parent_obj.length = $('#_length').val()
      parent_obj.width = $('#_width').val()
      parent_obj.height = $('#_height').val()
      parent_obj.tax_status = $('#_tax_status').val()
    },

    /**
     * Added new .variation-needs-update class when defaults is changed
     */
    defaults_changed: function() {
      $(this)
        .closest('#wcv_variable_product_options')
        .find('.wcv_variation:first')
        .addClass('variation-needs-update')

      $('#wcv_variable_product_options').trigger(
        'wcv_variations_defaults_changed'
      )
    },

    /**
     * Actions
     */
    do_variation_action: function(current_select_id) {
      const do_variation_action = $('#' + current_select_id).val()
      let data = {}
      const changes = 0
      let value

      if (do_variation_action === '-1') {
        return
      }

      // populate the parent object
      wcv_product_variations_ajax.populate_parent()

      switch (do_variation_action) {
        case 'add_variation':
          wcv_product_variations_ajax.add_variation()
          return
        case 'link_all_variations':
          wcv_product_variations_ajax.link_all_variations()
          return
        case 'delete_all':
          if (
            window.confirm(wcv_product_variation.i18n_delete_all_variations)
          ) {
            if (window.confirm(wcv_product_variation.i18n_last_warning)) {
              wcv_product_variations_ajax.delete_all_variations()
            }
          }
          break
        case 'toggle_variable_enabled':
        case 'toggle_variable_is_downloadable':
        case 'toggle_variable_is_virtual':
        case 'toggle_variable_manage_stock':
          const selector = do_variation_action.replace(/toggle_/, '') // eslint-disable-line no-case-declarations
          $(`.${selector}`).prop('checked', !$(`.${selector}`).prop('checked'))
          $(`.${selector}`).trigger('change')
          break
        case 'variable_regular_price_increase':
        case 'variable_regular_price_decrease':
        case 'variable_sale_price_increase':
        case 'variable_sale_price_decrease':
          if (
            (value = window.prompt(
              wcv_product_variation.i18n_enter_a_value_fixed_or_percent
            ))
          ) {
            const operator =
              do_variation_action.indexOf('increase') > -1 ? '+' : '-'
            const field =
              do_variation_action.indexOf('increase') > -1
                ? do_variation_action.substring(
                    0,
                    do_variation_action.indexOf('_increase')
                  )
                : do_variation_action.substring(
                    0,
                    do_variation_action.indexOf('_decrease')
                  )

            if (value !== null) {
              if (value.indexOf('%') >= 0) {
                value =
                  accounting.unformat(
                    value.replace(/%/, ''),
                    wcv_product_variation.mon_decimal_point
                  ) + '%'
              } else {
                value = accounting.unformat(
                  value,
                  wcv_product_variation.mon_decimal_point
                )
              }
            }
            wcv_product_variations_actions.adjust_price(
              field,
              String(value),
              operator
            )
          }
          break
        case 'variable_regular_price':
          value = window.prompt(wcv_product_variation.i18n_enter_a_value)
          wcv_product_variations_actions.update_input(
            value,
            'variable_regular_price'
          )
          break
        case 'variable_sale_price':
          value = window.prompt(wcv_product_variation.i18n_enter_a_value)
          wcv_product_variations_actions.update_input(
            value,
            'variable_sale_price'
          )
          break
        case 'variable_stock':
          value = window.prompt(wcv_product_variation.i18n_enter_a_value)
          wcv_product_variations_actions.update_input(value, 'variable_stock')
          break
        case 'variable_weight':
          value = window.prompt(wcv_product_variation.i18n_enter_a_value)
          wcv_product_variations_actions.update_input(value, 'variable_weight')
          break
        case 'variable_length':
          value = window.prompt(wcv_product_variation.i18n_enter_a_value)
          wcv_product_variations_actions.update_input(value, 'variable_length')
          break
        case 'variable_width':
          value = window.prompt(wcv_product_variation.i18n_enter_a_value)
          wcv_product_variations_actions.update_input(value, 'variable_width')
          break
        case 'variable_height':
          value = window.prompt(wcv_product_variation.i18n_enter_a_value)
          wcv_product_variations_actions.update_input(value, 'variable_height')
          break
        case 'variable_download_limit':
          value = window.prompt(wcv_product_variation.i18n_enter_a_value)
          wcv_product_variations_actions.update_input(
            value,
            'variable_download_limit'
          )
          break
        case 'variable_download_expiry':
          value = window.prompt(wcv_product_variation.i18n_enter_a_value)
          wcv_product_variations_actions.update_input(
            value,
            'variable_download_expiry'
          )
          break
        case 'variable_sale_schedule':
          date_from = window.prompt(
            wcv_product_variation.i18n_scheduled_sale_start
          )
          date_to = window.prompt(wcv_product_variation.i18n_scheduled_sale_end)

          if (date_from === null) {
            date_from = false
          }
          wcv_product_variations_actions.update_input(
            date_from,
            'sale_price_dates_from'
          )

          if (date_to === null) {
            date_to = false
          }
          wcv_product_variations_actions.update_input(
            date_to,
            'sale_price_dates_to'
          )
          break
        default:
          $('select#' + current_select_id).trigger(do_variation_action)
          data = $('select#' + current_select_id).triggerHandler(
            do_variation_action + '_ajax_data',
            data
          )
          break
      }
    }
  }

  /**
   * Product variations counts
   */
  const wcv_product_variations_counts = {
    /**
     * Initialize products variations meta box
     */
    init: function() {
      $(document.body).on('wcv_variations_added', this.update_single_quantity)
    },

    /**
     * Set variations count
     *
     * @param {Int} qty
     *
     * @return {Int}
     */
    update_variations_count: function(qty) {
      const wrapper = $('#wcv_variable_product_options').find('.wcv_variations')
      const total = parseInt(wrapper.attr('data-total'), 10) + qty
      const displaying_num = $('.variations-pagenav .displaying-num')
      // Set the new total of variations
      wrapper.attr('data-total', total)

      if (total === 1) {
        displaying_num.text(
          wcv_product_variation.i18n_variation_count_single.replace(
            '%qty%',
            total
          )
        )
      } else {
        displaying_num.text(
          wcv_product_variation.i18n_variation_count_plural.replace(
            '%qty%',
            total
          )
        )
      }

      return total
    },

    /**
     * Update variations quantity when add a new variation
     *
     * @param {Object} event
     * @param {Int} qty
     */
    update_single_quantity: function(event, qty) {
      if (qty === 1) {
        const page_nav = $('.variations-pagenav')

        wcv_product_variations_counts.update_variations_count(qty)

        if (page_nav.is(':hidden')) {
          $('option, optgroup', '.variation_actions').show()
          $('.variation_actions').val('add_variation')
          $('#wcv_variable_product_options')
            .find('.toolbar')
            .show()
          page_nav.show()
          $('.pagination-links', page_nav).hide()
        }
      }
    }
  }

  // Meta-Boxes - Open/close
  $('.wcv_product_variations')
    .on('click', '.variation_title', function(event) {
      if ($(event.target).filter(':input, option, .wcv-sort').length) {
        return
      }
      $(this)
        .closest('.wcv_variation')
        .find('.wcv-metabox-content')
        .stop()
        .slideToggle()
      $(this)
        .closest('.wcv_variation')
        .toggleClass('closed')
    })
    .on('click', '.expand_all', function() {
      $(this)
        .closest('.wcv-metaboxes-wrapper')
        .find('.wcv-metabox > .wcv-metabox-content')
        .show()
      $(this)
        .closest('.wcv-metaboxes-wrapper')
        .find('.wcv_variation')
        .removeClass('closed')
      return false
    })
    .on('click', '.close_all', function() {
      $(this)
        .closest('.wcv-metaboxes-wrapper')
        .find('.wcv-metabox > .wcv-metabox-content')
        .hide()
      $(this)
        .closest('.wcv-metaboxes-wrapper')
        .find('.wcv_variation')
        .addClass('closed')
      return false
    })

  // File inputs
  $('.wcv_product_variations').on(
    'click',
    '.downloadable_files a.insert',
    function() {
      $(this)
        .closest('.downloadable_files')
        .find('tbody')
        .append($(this).data('row'))
      return false
    }
  )

  $('.wcv_product_variations').on(
    'click',
    '.downloadable_files a.delete',
    function() {
      $(this)
        .closest('tr')
        .remove()
      return false
    }
  )

  $('.wcv_product_variations').on('click', '.sale_schedule', function() {
    $('.sale_price_dates_fields').show()
    $(this).hide()
    $('.cancel_sale_schedule').show()
    return false
  })

  $('.wcv_product_variations').on('click', '.cancel_sale_schedule', function() {
    $('.sale_price_dates_fields').hide()
    $(this).hide()
    $('.sale_schedule').show()
    return false
  })

  $('#show_variation_actions').on('click', function(e) {
    const variation_actions = $('#variation_actions_single')
    variation_actions.toggleClass('hide-all')
    let rotate = 90

    if (variation_actions.hasClass('hide-all')) {
      rotate = 0
    } else {
      rotate = 90
    }

    $(this)
      .find('.wcv-icon')
      .css('transform', 'rotate(' + rotate + 'deg)')
    e.preventDefault()
  })

  wcv_product_variations_actions.init()
  wcv_product_variations_media.init()
  wcv_product_variations_ajax.init()
  wcv_product_variations_counts.init()

  const mobileVariationSelectPos = () => {
    const vaTitle = document.querySelectorAll('.variation_title')
    vaTitle.forEach(vt => {
      const variationWrapper = vt.querySelector('.variations_wrapper')
      const variationWrapperChilds = variationWrapper.childElementCount
      if (variationWrapperChilds > 1) {
        variationWrapper.classList.add('order')
      } else {
        variationWrapper.classList.remove('order')
      }
    })
  }

  if (document.querySelector('.variation_title')) {
    mobileVariationSelectPos()
  }

  document.addEventListener('open_variations', mobileVariationSelectPos)
})

// Helper function to do deep comparison of objects
function areObjectsEqual(obj1, obj2) {
  // Handle null/undefined
  if (obj1 === null || obj2 === null) {
    return obj1 === obj2
  }

  // Handle non-objects (including primitives and functions)
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2
  }

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false
    }
    return obj1.every((item, index) => areObjectsEqual(item, obj2[index]))
  }

  // Handle different types (one is array, other is object)
  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  // Check if they have same number of keys
  if (keys1.length !== keys2.length) {
    return false
  }

  // Check each key-value pair recursively
  return keys1.every(key => {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return false
    }
    return areObjectsEqual(obj1[key], obj2[key])
  })
}
