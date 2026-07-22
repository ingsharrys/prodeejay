jQuery(function($) {
  'use strict';

  var wcvProgressBar = {
    init: function() {
      $(document).on(
        'click',
        '.wcv-dismiss-sync-notice .notice-dismiss',
        wcvProgressBar.dismissNotice
      );
    },
    dismissNotice: function() {
      $.ajax({
        type: 'POST',
        url: window.wcv_progress_bar.ajax_url,
        dataType: 'json',
        data: {
          nonce: window.wcv_progress_bar.nonce,
          action: 'wcv_dismiss_sync_notice'
        }
      });
    }
  };

  wcvProgressBar.init();
});
