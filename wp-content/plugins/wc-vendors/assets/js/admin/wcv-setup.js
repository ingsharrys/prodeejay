(function($) {
  $(document).ready(function() {
    const $setupButton = $('#wcvendors-one-click-setup');
    const $setupContainer = $setupButton.closest('.wcv-setup-content');
    const $allButtons = $('.wcv-setup-actions .button');
    const $returnToDashboard = $('.wcv-return-to-dashboard');
    $setupButton.on('click', function(e) {
      e.preventDefault();

      const confirmPrompt = confirm(window.wcv_setup.one_click_setup_confirm);
      if (!confirmPrompt) return;

      // Add loading state
      $setupContainer.addClass('wcv-setup-loading');
      $allButtons.prop('disabled', true);

      // Remove any existing messages
      $('.wcv-setup-message').remove();

      // Make AJAX request
      $.ajax({
        url: window.wcv_setup.one_click_setup_url,
        type: 'POST',
        data: {
          action: 'wcvendors_one_click_setup',
          nonce: window.wcv_setup.nonce
        },
        success: function(response) {
          if (response.success) {
            // Show success message
            $setupContainer.append(`
              <div class="wcv-setup-message success">
                ${response.data.message || window.wcv_setup.redirect_message}
              </div>
            `);

            if (response.data.redirect_url) {
              setTimeout(function() {
                window.location.href = response.data.redirect_url;
              }, 3000);
            } else {
              // Redirect to dashboard after a short delay
              setTimeout(function() {
                window.location.href = window.wcv_setup.redirect_url;
              }, 3000);
            }
          } else {
            // Show error message
            $setupContainer.append(`
              <div class="wcv-setup-message error">
                ${response.data.message ||
                  window.wcv_setup.redirect_message_error}
              </div>
            `);
            // Re-enable buttons on error
            $allButtons.prop('disabled', false);
          }
        },
        error: function(xhr, status, error) {
          let errorMessage = window.wcv_setup.redirect_message_error;

          // Try to parse error response if available
          if (
            xhr.responseJSON &&
            xhr.responseJSON.data &&
            xhr.responseJSON.data.message
          ) {
            errorMessage = xhr.responseJSON.data.message;
          } else if (xhr.responseText) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.data && response.data.message) {
                errorMessage = response.data.message;
              }
            } catch (e) {
              console.error('Error parsing response:', e);
            }
          }

          // Show error message
          $setupContainer.append(`
            <div class="wcv-setup-message error">
              ${errorMessage}
            </div>
          `);

          // Re-enable buttons on error
          $allButtons.prop('disabled', false);
        },
        complete: function() {
          // Remove loading state
          $setupContainer.removeClass('wcv-setup-loading');
        }
      });
    });
    $returnToDashboard.on('click', function(e) {
      e.preventDefault();
      const $this = $(this);
      const step = $this.data('step');
      if (step === 'welcome') {
        let confirmPrompt = confirm(window.wcv_setup.skip_wizard_confirm);
        if (!confirmPrompt) return;
        window.location.href = window.wcv_setup.skip_wizard_url;
      } else {
        let href = $this.attr('href');
        window.location.href = href;
      }
    });
  });
})(jQuery);
