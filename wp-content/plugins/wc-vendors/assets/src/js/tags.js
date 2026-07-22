/*global wcv_tag_search_params */
jQuery(function($) {
  function getEnhancedSelectFormatString() {
    return {
      language: {
        errorLoading: function() {
          // Workaround for https://github.com/select2/select2/issues/4355 instead of i18n_ajax_error.
          return wcv_tag_search_params.i18n_searching;
        },
        inputTooLong: function(args) {
          var overChars = args.input.length - args.maximum;

          if (1 === overChars) {
            return wcv_tag_search_params.i18n_input_too_long_1;
          }

          return wcv_tag_search_params.i18n_input_too_long_n.replace(
            '%qty%',
            overChars
          );
        },
        inputTooShort: function(args) {
          var remainingChars = args.minimum - args.input.length;

          if (1 === remainingChars) {
            return wcv_tag_search_params.i18n_input_too_short_1;
          }

          return wcv_tag_search_params.i18n_input_too_short_n.replace(
            '%qty%',
            remainingChars
          );
        },
        loadingMore: function() {
          return wcv_tag_search_params.i18n_load_more;
        },
        maximumSelected: function(args) {
          if (args.maximum === 1) {
            return wcv_tag_search_params.i18n_selection_too_long_1;
          }

          return wcv_tag_search_params.i18n_selection_too_long_n.replace(
            '%qty%',
            args.maximum
          );
        },
        noResults: function() {
          return wcv_tag_search_params.i18n_no_matches;
        },
        searching: function() {
          return wcv_tag_search_params.i18n_searching;
        }
      }
    };
  }

  $(document.body).on('wcv-search-tag-init', function() {
    // Ajax product tag search box
    $(':input.wcv-tag-search')
      .filter(':not(.enhanced)')
      .each(function() {
        var select2_args = {
          allowClear: !!$(this).data('allow_clear'),
          placeholder: $(this).data('placeholder'),
          tags: $(this).data('tags'),
          tokenSeparators: wcv_tag_search_params.separator,
          minimumInputLength: $(this).data('minimum_input_length')
            ? $(this).data('minimum_input_length')
            : '2',
          maximum: wcv_tag_search_params.tag_limit,
          escapeMarkup: function(m) {
            return m;
          },
          ajax: {
            url: wcv_tag_search_params.ajax_url,
            dataType: 'json',
            delay: 250,
            data: function(params) {
              return {
                term: params.term,
                action: $(this).data('action') || 'wcv_json_search_tags',
                security: wcv_tag_search_params.nonce
              };
            },
            processResults: function(data) {
              var terms = [];
              if (data) {
                $.each(data, function(id, text) {
                  terms.push({ id: id, text: text });
                });
              }
              return { results: terms };
            },
            cache: true
          }
        };

        select2_args = $.extend(
          select2_args,
          getEnhancedSelectFormatString(wcv_tag_search_params)
        );

        $(this)
          .select2(select2_args)
          .addClass('enhanced');
      });
  });

  $(document).ready(function() {
    $(document.body).trigger('wcv-search-tag-init');
  });
});
