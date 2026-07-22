/**
 * Country and states select functionality for vendor settings forms.
 *
 * Change states dropdown options to match selected country.
 */
jQuery(function($) {
  /**
   * Initialize country and state fields
   */
  var wcv_country_state_fields = {
    states: null,
    init: function() {
      if (typeof window.wcv_countries_states.countries !== 'undefined') {
        this.states = $.parseJSON(
          window.wcv_countries_states.countries.replace(/&quot;/g, '"')
        );
      }

      $('.js_field-country')
        .select2()
        .change(this.change_country);
      $('.js_field-country').trigger('change', [true]);
      $(document.body).on('change', '.js_field-state', this.change_state);
    },

    change_country: function(e, stickValue) {
      if (typeof stickValue === 'undefined') {
        stickValue = false;
      }

      if (wcv_country_state_fields.states === null) {
        return;
      }

      var $this = $(this),
        country = $this.val(),
        $state = $this.parents('.tabs-content').find(':input.js_field-state'),
        $parent = $state.parent(),
        input_name = $state.attr('name'),
        input_id = $state.attr('id'),
        stickstatefield = 'woocommerce.stickState-' + country,
        value = $this.data(stickstatefield)
          ? $this.data(stickstatefield)
          : $state.val(),
        placeholder = $state.attr('placeholder'),
        $newstate;
      const isStateRequired = $state.prop('required');

      if (stickValue) {
        $this.data('woocommerce.stickState-' + country, value);
      }

      // Remove the previous DOM element
      $parent
        .show()
        .find('.select2-container')
        .remove();

      // Create new DOM element to append to replace the removed one.
      if (!$.isEmptyObject(wcv_country_state_fields.states[country])) {
        var state = wcv_country_state_fields.states[country],
          $defaultOption = $('<option value=""></option>').text(
            wcv_countries_states.i18n_select_state_text
          );

        $newstate = $('<select style="100%;"></select>')
          .prop('id', input_id)
          .prop('name', input_name)
          .prop('placeholder', placeholder)
          .addClass('js_field-state')
          .append($defaultOption);

        $.each(state, function(index) {
          var $option = $('<option></option>')
            .prop('value', index)
            .text(state[index]);
          $newstate.append($option);
        });

        $newstate.val(value);

        $state.replaceWith($newstate);

        if (isStateRequired) {
          $newstate.prop('required', true);
        }

        $newstate
          .show()
          .select2({
            width: 'resolve'
          })
          .hide()
          .change();
      } else {
        $newstate = $('<input type="text" />')
          .prop('id', input_id)
          .prop('name', input_name)
          .prop('placeholder', placeholder)
          .addClass('js_field-state regular-text')
          .val(value);
        $state.replaceWith($newstate);
        if (isStateRequired) {
          $newstate.prop('required', true);
        }
      }
      $(document.body).trigger('wcv-country-change', [
        country,
        $(this).closest('div')
      ]);
    },

    change_state: function() {
      // Here we will find if state value on a select has changed and stick it to the country data
      var $this = $(this),
        state = $this.val(),
        $country = $this.parents('.form-table').find(':input.js_field-country'),
        country = $country.val();

      $country.data('woocommerce.stickState-' + country, state);
    }
  };

  wcv_country_state_fields.init();
});
