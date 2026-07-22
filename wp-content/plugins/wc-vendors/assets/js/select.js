/*global wcv_product_select_params */
jQuery(function($) {
  function getEnhancedSelectFormatString() {
    var formatString = {
      formatMatches: function(matches) {
        if (1 === matches) {
          return wcv_product_select_params.i18n_matches_1;
        }

        return wcv_product_select_params.i18n_matches_n.replace(
          '%qty%',
          matches
        );
      },
      formatNoMatches: function() {
        return wcv_product_select_params.i18n_no_matches;
      },
      formatAjaxError: function(jqXHR, textStatus, errorThrown) {
        return wcv_product_select_params.i18n_ajax_error;
      },
      formatInputTooShort: function(input, min) {
        var number = min - input.length;

        if (1 === number) {
          return wcv_product_select_params.i18n_input_too_short_1;
        }

        return wcv_product_select_params.i18n_input_too_short_n.replace(
          '%qty%',
          number
        );
      },
      formatInputTooLong: function(input, max) {
        var number = input.length - max;

        if (1 === number) {
          return wcv_product_select_params.i18n_input_too_long_1;
        }

        return wcv_product_select_params.i18n_input_too_long_n.replace(
          '%qty%',
          number
        );
      },
      formatSelectionTooBig: function(limit) {
        if (1 === limit) {
          return wcv_product_select_params.i18n_selection_too_long_1;
        }

        return wcv_product_select_params.i18n_selection_too_long_n.replace(
          '%qty%',
          limit
        );
      },
      formatLoadMore: function(pageNumber) {
        return wcv_product_select_params.i18n_load_more;
      },
      formatSearching: function() {
        return wcv_product_select_params.i18n_searching;
      }
    };

    return formatString;
  }

  $(document.body).on('wcv-select-init', function() {
    // Ajax product search box
    $(':input.wc-product-search')
      .filter(':not(.enhanced)')
      .each(function() {
        var select2_args = {
          allowClear: !!$(this).data('allow_clear'),
          placeholder: $(this).data('placeholder'),
          minimumInputLength: 1,
          escapeMarkup: function(m) {
            return m;
          },
          ajax: {
            url: wcv_product_select_params.ajax_url,
            dataType: 'json',
            delay: 250,
            data: function(params) {
              return {
                term: params.term,
                action: $(this).data('action') || 'wcv_json_search_products',
                security: wcv_product_select_params.nonce
              };
            },
            processResults: function(data) {
              var terms = [];
              if (data) {
                $.each(data, function(id, text) {
                  terms.push({ id: id, text: text });
                });
              }
              return {
                results: terms
              };
            },
            cache: true
          }
        };

        select2_args = $.extend(select2_args, getEnhancedSelectFormatString());

        $(this)
          .select2(select2_args)
          .addClass('enhanced');

        if ($(this).data('sortable')) {
          var $select = $(this);
          var $list = $(this)
            .next('.select2-container')
            .find('ul.select2-selection__rendered');

          $list.sortable({
            placeholder: 'ui-state-highlight select2-selection__choice',
            forcePlaceholderSize: true,
            items: 'li:not(.select2-search__field)',
            tolerance: 'pointer',
            stop: function() {
              $(
                $list
                  .find('.select2-selection__choice')
                  .get()
                  .reverse()
              ).each(function() {
                var id = $(this).data('data').id;
                var option = $select.find('option[value="' + id + '"]')[0];
                $select.prepend(option);
              });
            }
          });
          // Keep multiselects ordered alphabetically if they are not sortable.
        } else if ($(this).prop('multiple')) {
          $(this).on('change', function() {
            var $children = $(this).children();
            $children.sort(function(a, b) {
              var atext = a.text.toLowerCase();
              var btext = b.text.toLowerCase();

              if (atext > btext) {
                return 1;
              }
              if (atext < btext) {
                return -1;
              }
              return 0;
            });
            $(this).html($children);
          });
        }
      });
  });

  $(document).ready(function() {
    $(document.body).trigger('wcv-select-init');
  });
});
