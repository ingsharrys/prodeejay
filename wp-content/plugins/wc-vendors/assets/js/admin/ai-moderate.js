/* global wcv_ai_moderate_params */
;(function($) {
  'use strict'

  /**
   * AI Moderate Manager Class
   * Manages the AI Moderate feature setup and Store Agent plugin integration
   */
  class AIModerate {
    /**
     * Constructor
     * @param {Object} params - Configuration parameters from WordPress
     */
    constructor(params) {
      if (!params) {
        return
      }

      this.params = params
      this.$ = $
      this.userInitiatedChange = false

      // DOM Elements
      this.$aiModerateCheckbox = null
      this.$productsLiveCheckbox = null
      this.$modal = null
      this.$step1 = null
      this.$step2 = null
      this.$step1Status = null
      this.$step2Status = null
      this.$step1Button = null
      this.$step2Button = null
      this.$cancelButton = null
      this.$closeButton = null

      // Bind methods to preserve context
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
      this.handleStep1ButtonClick = this.handleStep1ButtonClick.bind(this)
      this.handleStep2ButtonClick = this.handleStep2ButtonClick.bind(this)
      this.handleModalOverlayClick = this.handleModalOverlayClick.bind(this)
    }

    /**
     * Initialize the AI Moderate manager
     */
    init() {
      this.initializeDOMElements()

      if (!this.$aiModerateCheckbox || this.$aiModerateCheckbox.length === 0) {
        return
      }

      this.attachEventListeners()
      this.checkInitialState()
    }

    /**
     * Initialize DOM element references
     * @private
     */
    initializeDOMElements() {
      this.$aiModerateCheckbox = this.$('#wcvendors_capability_ai_moderate')
      this.$productsLiveCheckbox = this.$('#wcvendors_capability_products_live')
      this.$modal = this.$('#wcv-store-agent-modal')
      this.$step1 = this.$modal.find('.wcv-step-1')
      this.$step2 = this.$modal.find('.wcv-step-2')
      this.$step1Status = this.$modal.find('.wcv-step-1 .wcv-step-status')
      this.$step2Status = this.$modal.find('.wcv-step-2 .wcv-step-status')
      this.$step1Button = this.$modal.find('.wcv-step-1 .wcv-action-button')
      this.$step2Button = this.$modal.find(
        '.wcv-step-2 .wcv-action-button[data-action="check-connection"]'
      )
      this.$connectionMessage = this.$modal.find(
        '.wcv-step-2 .wcv-connection-message'
      )
      this.$cancelButton = this.$modal.find('.wcv-modal-cancel')
      this.$closeButton = this.$modal.find('.wcv-modal-close')
    }

    /**
     * Attach event listeners
     * @private
     */
    attachEventListeners() {
      this.$aiModerateCheckbox.on('change', this.handleCheckboxChange)
      this.$step1Button.on('click', this.handleStep1ButtonClick)
      this.$step2Button.on('click', this.handleStep2ButtonClick)
      this.$closeButton.on('click', () => this.hideModal())
      this.$cancelButton.on('click', () => this.hideModal())
      this.$modal.on('click', this.handleModalOverlayClick)
    }

    /**
     * Check initial state and validate if needed
     * @private
     */
    checkInitialState() {
      if (this.$aiModerateCheckbox.is(':checked')) {
        this.checkStoreAgentStatus()
      }
    }

    /**
     * Handle AI Moderate checkbox change event
     */
    handleCheckboxChange() {
      const isChecked = this.$aiModerateCheckbox.is(':checked')

      if (isChecked) {
        this.userInitiatedChange = true
        this.checkStoreAgentStatus()
      } else {
        this.$productsLiveCheckbox.prop('disabled', false)
        this.userInitiatedChange = false
      }
    }

    /**
     * Handle modal overlay click to close modal
     */
    handleModalOverlayClick(e) {
      if (this.$(e.target).is(this.$modal)) {
        this.hideModal()
      }
    }

    /**
     * Check Store Agent plugin status via AJAX
     */
    checkStoreAgentStatus() {
      this.$.ajax({
        url: this.params.ajax_url,
        type: 'POST',
        data: {
          action: 'wcv_check_store_agent_status',
          nonce: this.params.check_store_agent_nonce
        },
        success: response => {
          this.handleStoreAgentStatusResponse(response)
        },
        error: (xhr, status, error) => {
          this.handleStoreAgentStatusError(xhr, status, error)
        }
      })
    }

    /**
     * Handle successful Store Agent status response
     * @private
     */
    handleStoreAgentStatusResponse(response) {
      if (response.success) {
        const data = response.data
        if (data.installed && data.active && data.connected) {
          // Store Agent is installed, active, and connected - proceed
          this.disableProductsLive()
        } else {
          // Store Agent is not ready - show modal
          if (this.userInitiatedChange) {
            this.showModal(data)
          } else {
            // On page load, silently uncheck if not ready
            this.$aiModerateCheckbox.prop('checked', false)
          }
        }
      } else {
        if (this.userInitiatedChange) {
          this.showModal(null)
        } else {
          this.$aiModerateCheckbox.prop('checked', false)
        }
      }
    }

    /**
     * Handle Store Agent status error
     * @private
     */
    handleStoreAgentStatusError(xhr, status, error) {
      if (this.userInitiatedChange) {
        this.showModal(null)
      } else {
        this.$aiModerateCheckbox.prop('checked', false)
      }
    }

    /**
     * Show modal with appropriate steps based on Store Agent status
     * @param {Object|null} storeAgentStatus - Store Agent status object
     */
    showModal(storeAgentStatus) {
      this.resetModalSteps()
      this.updateStep1(storeAgentStatus)
      this.updateStep2(storeAgentStatus)
      this.$modal.show()

      // Uncheck AI Moderate checkbox since Store Agent is not ready
      this.$aiModerateCheckbox.prop('checked', false)
    }

    /**
     * Hide modal
     */
    hideModal() {
      this.$modal.fadeOut(300, () => {
        // Restore body scroll when modal is closed
        $('body').css('overflow', '')
      })
    }

    /**
     * Reset all modal steps to initial state
     * @private
     */
    resetModalSteps() {
      this.$step1.removeClass('wcv-step-completed')
      this.$step2.removeClass('wcv-step-completed')
      this.$step1Status
        .removeClass('wcv-step-completed')
        .addClass('wcv-step-pending')
        .text('')
      this.$step2Status
        .removeClass('wcv-step-completed')
        .addClass('wcv-step-pending')
        .text('')
      this.hideConnectionMessage()
    }

    /**
     * Update step 1 based on installation/activation status
     * @private
     */
    updateStep1(storeAgentStatus) {
      if (storeAgentStatus && storeAgentStatus.installed) {
        if (storeAgentStatus.active) {
          // Step 1 completed - installed and activated
          this.markStep1Completed()
          this.$step2.find('.wcv-step-content').show()
        } else {
          // Installed but not activated - show Activate button
          this.configureStep1ForActivation()
        }
      } else {
        // Not installed - show Install and Activate button
        this.configureStep1ForInstall()
      }
    }

    /**
     * Mark step 1 as completed
     * @private
     */
    markStep1Completed() {
      this.$step1.addClass('wcv-step-completed')
      this.$step1Status
        .removeClass('wcv-step-pending')
        .addClass('wcv-step-completed')
        .text(this.params.i18n_step_completed)
      this.$step1.find('.wcv-step-content').hide()
    }

    /**
     * Configure step 1 for activation
     * @private
     */
    configureStep1ForActivation() {
      this.$step1.removeClass('wcv-step-completed')
      this.$step1Status
        .removeClass('wcv-step-completed')
        .addClass('wcv-step-pending')
        .text('')
      this.$step1.find('.wcv-step-content').show()
      this.$step1Button
        .attr('data-action', 'activate')
        .find('.button-text')
        .text(this.params.i18n_activate)
      this.$step2.find('.wcv-step-content').hide()
    }

    /**
     * Configure step 1 for installation
     * @private
     */
    configureStep1ForInstall() {
      this.$step1.removeClass('wcv-step-completed')
      this.$step1Status
        .removeClass('wcv-step-completed')
        .addClass('wcv-step-pending')
        .text('')
      this.$step1.find('.wcv-step-content').show()
      this.$step1Button
        .attr('data-action', 'install-activate')
        .find('.button-text')
        .text(this.params.i18n_install_and_activate)
      this.$step2.find('.wcv-step-content').hide()
    }

    /**
     * Update step 2 based on connection status
     * @private
     */
    updateStep2(storeAgentStatus) {
      if (
        storeAgentStatus &&
        storeAgentStatus.installed &&
        storeAgentStatus.active
      ) {
        if (storeAgentStatus.connected) {
          // Step 2 completed - connected
          this.markStep2Completed()
        } else {
          // Not connected - show Connect button
          this.configureStep2ForConnection()
        }
      }
    }

    /**
     * Mark step 2 as completed
     * @private
     */
    markStep2Completed() {
      this.$step2.addClass('wcv-step-completed')
      this.$step2Status
        .removeClass('wcv-step-pending')
        .addClass('wcv-step-completed')
        .text(this.params.i18n_step_completed)
      this.$step2.find('.wcv-step-content').hide()
    }

    /**
     * Configure step 2 for connection
     * @private
     */
    configureStep2ForConnection() {
      this.$step2.removeClass('wcv-step-completed')
      this.$step2Status
        .removeClass('wcv-step-completed')
        .addClass('wcv-step-pending')
        .text('')
      this.$step2.find('.wcv-step-content').show()
      this.hideConnectionMessage()
    }

    /**
     * Disable products_live checkbox
     */
    disableProductsLive() {
      this.$productsLiveCheckbox.prop('checked', false)
      this.$productsLiveCheckbox.prop('disabled', true)
    }

    /**
     * Update step 2 after activation
     */
    updateStep2AfterActivation() {
      this.$.ajax({
        url: this.params.ajax_url,
        type: 'POST',
        data: {
          action: 'wcv_check_store_agent_status',
          nonce: this.params.check_store_agent_nonce
        },
        success: response => {
          this.handleStep2UpdateResponse(response)
        },
        error: (xhr, status, error) => {
          // Show step 2 anyway
          this.$step2.find('.wcv-step-content').show()
        }
      })
    }

    /**
     * Handle step 2 update response
     * @private
     */
    handleStep2UpdateResponse(response) {
      if (response.success) {
        const data = response.data
        if (data.installed && data.active) {
          // Step 1 is complete, now check step 2 (connection)
          if (data.connected) {
            // Step 2 completed - connected
            this.markStep2Completed()
            // All steps complete - close modal and enable feature
            setTimeout(() => {
              this.completeSetup()
            }, 500)
          } else {
            // Step 2 pending - not connected, show Connect button
            this.configureStep2ForConnection()
          }
        }
      }
    }

    /**
     * Complete setup process
     * @private
     */
    completeSetup() {
      this.hideModal()
      this.$aiModerateCheckbox.prop('checked', true)
      this.disableProductsLive()
      // Trigger save button click to save changes
      const $saveButton = this.$('.wcvendors-save-button')
      if ($saveButton.length > 0) {
        $saveButton.trigger('click')
      }
    }

    /**
     * Handle step 1 button click (Install/Activate)
     */
    handleStep1ButtonClick(e) {
      e.preventDefault()
      const $button = this.$(e.currentTarget)
      const action = $button.attr('data-action')
      const originalText = $button.find('.button-text').text()

      if (action === 'install-activate') {
        this.handleInstallActivate($button, originalText)
      } else if (action === 'activate') {
        this.handleActivate($button, originalText)
      }
    }

    /**
     * Handle install and activate action
     * @private
     */
    handleInstallActivate($button, originalText) {
      $button
        .prop('disabled', true)
        .find('.button-text')
        .text(this.params.i18n_installing)

      this.performPluginAction('install-activate', $button, originalText)
    }

    /**
     * Handle activate action
     * @private
     */
    handleActivate($button, originalText) {
      $button
        .prop('disabled', true)
        .find('.button-text')
        .text(this.params.i18n_activating)

      this.performPluginAction('activate', $button, originalText)
    }

    /**
     * Perform plugin installation/activation action
     * @private
     */
    performPluginAction(action, $button, originalText) {
      this.$.ajax({
        url: this.params.ajax_url,
        type: 'POST',
        data: {
          action: 'wcv_install_activate_plugin',
          nonce: this.params.install_plugin_nonce,
          plugin_slug: this.params.store_agent_slug,
          activate: 'true'
        },
        success: response => {
          if (response.success) {
            // Installation/activation successful - mark step 1 as completed
            this.markStep1Completed()
            // Check connection status and update step 2
            setTimeout(() => {
              this.updateStep2AfterActivation()
            }, 1000)
          } else {
            $button
              .prop('disabled', false)
              .find('.button-text')
              .text(originalText)
          }
        },
        error: () => {
          $button
            .prop('disabled', false)
            .find('.button-text')
            .text(originalText)
        }
      })
    }

    /**
     * Handle step 2 button click (Check Connection)
     */
    handleStep2ButtonClick(e) {
      e.preventDefault()
      const $button = this.$(e.currentTarget)
      const originalText = $button.find('.button-text').text()

      // Change button text to indicate checking
      $button
        .prop('disabled', true)
        .find('.button-text')
        .text(this.params.i18n_checking_connection)

      // Check connection status
      this.$.ajax({
        url: this.params.ajax_url,
        type: 'POST',
        data: {
          action: 'wcv_check_store_agent_status',
          nonce: this.params.check_store_agent_nonce
        },
        success: response => {
          this.handleConnectionCheckResponse(response, $button, originalText)
        },
        error: (xhr, status, error) => {
          // Show error message and re-enable button
          this.showConnectionMessage(this.params.i18n_connection_error, 'error')
          $button
            .prop('disabled', false)
            .find('.button-text')
            .text(originalText)
        }
      })
    }

    /**
     * Handle connection check response
     * @private
     */
    handleConnectionCheckResponse(response, $button, originalText) {
      if (response.success) {
        const data = response.data
        if (data.installed && data.active && data.connected) {
          // Connected! Show success message
          this.showConnectionMessage(
            this.params.i18n_connection_success,
            'success'
          )
          // Update UI and close modal after a delay
          setTimeout(() => {
            this.markStep2Completed()
            setTimeout(() => {
              this.completeSetup()
            }, 500)
          }, 1500)
        } else {
          // Not connected yet - show message and re-enable button
          this.showConnectionMessage(
            this.params.i18n_connection_not_ready,
            'error'
          )
          $button
            .prop('disabled', false)
            .find('.button-text')
            .text(originalText)
        }
      } else {
        // Error - show error message and re-enable button
        this.showConnectionMessage(this.params.i18n_connection_error, 'error')
        $button
          .prop('disabled', false)
          .find('.button-text')
          .text(originalText)
      }
    }

    /**
     * Show connection check message
     * @private
     */
    showConnectionMessage(message, type) {
      this.$connectionMessage
        .removeClass('wcv-message-success wcv-message-error')
        .addClass(`wcv-message-${type}`)
        .text(message)
        .fadeIn(200)
    }

    /**
     * Hide connection check message
     * @private
     */
    hideConnectionMessage() {
      this.$connectionMessage.fadeOut(200)
    }
  }

  // Initialize when DOM is ready
  $(document).ready(function() {
    if (typeof wcv_ai_moderate_params !== 'undefined') {
      const aiModerate = new AIModerate(wcv_ai_moderate_params)
      aiModerate.init()
    }
  })
})(jQuery)
