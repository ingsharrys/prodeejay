/* eslint-disable no-console */
jQuery(function($) {
  'use strict';

  var wcv_datetime_picker = {
    init: function() {
      var options = {
        disableMobile: true,
        clickOpens: true,
        allowInput: true,
        allowInvalidPreload: true,
        locale: window.wcv_datepicker.locale,
        dateFormat: window.wcv_datepicker.date_format,
        defaultDate: '',
        wrap: false
      };

      wcv_datetime_picker.initDatePickers(options);
      wcv_datetime_picker.initDateTimePickers(options);
      wcv_datetime_picker.initTimePickers(options);
    },

    initDatePickers: function(options) {
      // Initialize all date pickers
      var dateFieldsClass = $('.wcv-datepicker:not(.flatpickr-input)');

      if ($('.wcv-datepicker').length > 0) {
        options.onReady = wcv_datetime_picker.onReady;
        $(dateFieldsClass).flatpickr(options);
      }
    },

    initDateTimePickers: function(options) {
      // Initialize datetime picker if the wcv-datetime picker class is available

      var dateTimeFields = $('.wcv-datetime-picker:not(.flatpickr-input)');

      if ($('.wcv-datetime-picker').length > 0) {
        options.enableTime = true;
        options.dateFormat =
          window.wcv_datepicker.date_format +
          ' ' +
          wcv_datetime_picker.getTimeFormat();
        options.onReady = wcv_datetime_picker.onReady;
        $(dateTimeFields).flatpickr(options);
      }
    },

    initTimePickers: function(options) {
      var timeFields = $('.wcv-time-picker:not(.flatpickr-input', options);

      options.enableTime = true;
      options.noCalendar = true;
      options.dateFormat = wcv_datetime_picker.getTimeFormat();

      if ($('.wcv-time-picker.wcv-init-picker').length > 0) {
        options.onReady = wcv_datetime_picker.onReady;
        $(timeFields).flatpickr(options);
      }
    },

    onReady: function() {
      $('.wcv-datepicker.wcv-init-picker').removeClass('wcv-init-picker');
      $('.wcv-datetime-picker.wcv-init-picker').removeClass('wcv-init-picker');
      $('.wcv-time-picker.wcv-init-picker').removeClass('wcv-init-picker');
    },

    getTimeFormat: function() {
      var timeFormat = window.wcv_datepicker.time_format;
      var hourFormat = timeFormat[0];

      switch (hourFormat) {
        case 'g':
          timeFormat = timeFormat.replace('g', 'G');
          break;
        default:
          break;
      }

      switch (timeFormat[timeFormat.length - 1]) {
        case 'a':
        case 'A':
          timeFormat = timeFormat.toUpperCase().replace('A', 'K');
      }

      return timeFormat;
    }
  };

  wcv_datetime_picker.init();

  /**
   * Trigger this event to reinitialize the date and time pickers if necessary.
   */
  $(document).on('wcv-datetime-field-added', wcv_datetime_picker.init);
});
