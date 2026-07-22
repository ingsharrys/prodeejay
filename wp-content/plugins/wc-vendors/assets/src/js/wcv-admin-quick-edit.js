jQuery(function() {
  jQuery('#the-list').on('click', '.editinline', function() {
    // Hide WP's native author select and route our vendor select into its place.
    // This rename is permanent for the page session — the condition prevents it
    // running again on subsequent Quick Edit opens.
    if (
      jQuery('.inline-edit-author').length &&
      jQuery('.inline-edit-author-new').length
    ) {
      jQuery('.inline-edit-author').hide()
      jQuery('.inline-edit-author').attr('class', 'inline-edit-author-old')
      jQuery('select[name=post_author]').attr('name', 'post_author-old')
      jQuery('select[name=post_author-new]').attr('name', 'post_author')
    }

    let post_id = jQuery(this)
      .closest('tr')
      .attr('id')

    post_id = post_id.replace('post-', '')

    const wcv_inline_data = jQuery('#vendor_' + post_id)
    const wc_inline_data = jQuery('#woocommerce_inline_' + post_id)

    const vendor_id = jQuery.trim(wcv_inline_data.find('.post_author').text())
    const vendor_name = jQuery.trim(
      wcv_inline_data.find('.post_author_name').text()
    )

    const product_type = wc_inline_data.find('.product_type').val()

    if (product_type === 'simple' || product_type === 'external') {
      jQuery('.vendor', '.inline-edit-row').show()
    } else {
      jQuery('.vendor', '.inline-edit-row').hide()
    }

    // Use the stable id (#post_author-new) set in PHP — unaffected by the name
    // rename above. Defer until after WP's handler has opened the row.
    // IIFE captures vendor_id/vendor_name by value so rapid successive clicks
    // on different rows don't overwrite each other's closure variables.
    ;(function(vid, vname) {
      setTimeout(function() {
        const $select = jQuery('#post_author-new')

        // Initialise Select2 once. On subsequent opens we only update the
        // selected option, avoiding the fragile destroy → re-init cycle.
        if (!$select.data('select2')) {
          $select.select2({
            dropdownParent: jQuery(document.body),
            minimumInputLength: 1,
            ajax: {
              delay: 300,
              url: ajaxurl,
              type: 'POST',
              dataType: 'json',
              data: function(params) {
                return {
                  action: 'wcv_search_vendors',
                  term: params.term,
                  _ajax_nonce: wcv_quick_edit_params.vendor_search_nonce
                }
              }
            }
          })
        }

        // Replace any stale option and pre-select the current vendor.
        $select.find('option').remove()
        if (vid && vname) {
          const option = new Option(vname, vid, true, true)
          $select.append(option).trigger('change')
        }
      }, 0)
    })(vendor_id, vendor_name)
  })

  jQuery(document).ready(function() {
    const $inputFeatured = jQuery('.featured input[name="_featured"]')
    const $selectFetured = jQuery('select.featured').closest('label')

    if (wcv_quick_edit_params.allow_featured === 'no') {
      $inputFeatured.parent().hide()
      $selectFetured.hide()
    }
  })
})
