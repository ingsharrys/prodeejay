;(function($, Ink) {
  $(document).ready(function($) {
    $(document).on('click', '.wcv-shade.wcv-fade.visible', function(event) {
      if (event.target.closest('.wcv-modal')) {
        return
      }

      const modalElement = $(this).find('.wcv-modal')[0]
      if (!modalElement) {
        return
      }

      try {
        const modal = Ink.UI.Modal_1.getInstance(modalElement)
        if (modal) {
          modal.dismiss()
        }
      } catch (error) {
        console.error('Error dismissing modal:', error)
      }
    })

    const extraMenu = $('.wcv-dashboard-menu.secondary')
    const toggleButton = $('#dashboard-menu-item-more-button')
    const primaryMenu = $('.wcv-dashboard-menu.primary')
    const menuContainer = $('#wcv-navigation')

    const moveItemsToExtraMenu = function() {
      const menuContainerWidth = menuContainer.width()
      const moreButtonWidth = toggleButton.outerWidth(true)
      const GAP_WIDTH = 24 // Define gap width between items
      let totalWidth = 0
      let breakpoint = -1

      // Store original order of all menu items
      const originalItems = []
      primaryMenu.find('li').each(function() {
        originalItems.push($(this))
      })
      extraMenu.find('li').each(function() {
        originalItems.push($(this))
      })

      // Reset - move all items back to primary menu in original order
      extraMenu.empty()
      primaryMenu.empty()
      originalItems.forEach(item => {
        item
          .css('opacity', 0.5)
          .appendTo(primaryMenu)
          .animate({ opacity: 1 }, 100)
      })

      // Hide the more button initially
      toggleButton.hide()

      // Calculate total width and find breakpoint
      primaryMenu.find('li').each(function(index, element) {
        const itemWidth = $(this).outerWidth(true)
        // Add gap width except for the first item
        if (index > 0) {
          totalWidth += GAP_WIDTH
        }
        totalWidth += itemWidth

        if (
          totalWidth + moreButtonWidth > menuContainerWidth &&
          breakpoint === -1
        ) {
          breakpoint = index
        }
      })

      // If we found a breakpoint, move items to extra menu while preserving order
      if (breakpoint !== -1) {
        toggleButton.show().css('display', 'flex')
        primaryMenu.find('li').each(function(index) {
          if (index >= breakpoint) {
            $(this).appendTo(extraMenu)
          }
        })
      }
    }

    moveItemsToExtraMenu()

    $(window).on('resize', moveItemsToExtraMenu)

    const addDividerToNav = function() {
      const breakItem =
        $('#dashboard-menu-item-view-store').length > 0
          ? $('#dashboard-menu-item-view-store')
          : $('#dashboard-menu-item-settings')

      $('<li class="wcv-dashboard-menu-divider"></li>').insertBefore(breakItem)
    }

    addDividerToNav()

    $('a.mark-order-unshipped').on('click', function(e) {
      if (!confirm(wcvendor_dashboard.mark_unshipped_confirm)) {
        e.preventDefault()
      }
    })

    $('.wcv-store-setup-dismiss').on('click', function(e) {
      e.preventDefault()
      $.ajax({
        url: wcvendor_dashboard.ajax_url,
        type: 'POST',
        data: {
          action: 'wcv_dismiss_store_setup_step_section',
          nonce: wcvendor_dashboard.dashboard_nonce
        },
        success: function(response) {
          if (response.success) {
            $('.wcv-store-setup-steps-wrapper').remove()
          }
        },
        error: function(error) {
          console.error(error)
        }
      })
    })

    // Cache static DOM references — these elements don't change after init.
    const setupContainer = $('.wcv-store-setup-steps')
    const setupProgressContainer = $('.wcv-store-setup-progress-bar')
    const setupProgress = $('.wcv-store-setup-progress-bar-fill')
    const firstStep = $('.wcv-store-setup-step:first')
    const lastStep = $('.wcv-store-setup-step:last')
    const firstStepIcon = $('.wcv-store-setup-step-icon:first')
    const lastStepIcon = $('.wcv-store-setup-step-icon:last')

    function updateSetupProgress() {
      const isDesktop = $(window).width() > 768
      const hasSteps = firstStep.length && lastStep.length

      // Re-query completed step on each call — it changes as the user progresses.
      const lastCompleteStep = $('.wcv-store-setup-step.completed:last')

      if (hasSteps) {
        if (isDesktop) {
          const firstPos = firstStep.position()
          const lastPos = lastStep.position()
          const lastW = lastStep.width()
          setupProgressContainer.css({
            width: `${lastPos.left - firstPos.left + lastW}px`,
            height: '8px',
            top: `${firstPos.top + 72}px`,
            left: '50%'
          })
        } else {
          const setupContainerH =
            lastStepIcon.offset().top - firstStepIcon.offset().top
          const firstPos = firstStep.position()
          setupProgressContainer.css({
            width: '3px',
            height: `${setupContainerH}px`,
            top: `${firstPos.top + 40}px`,
            left: `${firstPos.left + 18}px`
          })
        }
      }

      if (lastCompleteStep.length) {
        const nextStep = lastCompleteStep.next()
        if (isDesktop) {
          const lastPos = lastStep.position()
          const lastW = lastStep.width()
          const containerLeft = setupContainer.position().left
          const progressW =
            nextStep.length && nextStep.position().left !== lastPos.left
              ? nextStep.position().left - containerLeft + lastW / 2
              : lastPos.left - containerLeft + lastW
          setupProgress.css('width', `${progressW}px`)
        } else {
          const progressH =
            nextStep.length &&
            nextStep.position().top !== lastStep.position().top
              ? nextStep.find('.wcv-store-setup-step-icon').offset().top -
                firstStepIcon.offset().top
              : lastStepIcon.offset().top - firstStepIcon.offset().top
          setupProgress.css({ width: '3px', height: `${progressH}px` })
        }
      }
    }

    updateSetupProgress()

    let resizeTimer
    $(window).on('resize', function() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateSetupProgress, 100)
    })

    $(document).on('click', function(event) {
      const target = $(event.target)
      if (!target.closest('#dashboard-menu-item-more-button').length) {
        toggleButton.removeClass('show')
        extraMenu.removeClass('show')
      } else {
        if (toggleButton.length && extraMenu.length) {
          extraMenu.toggleClass('show')
          toggleButton.toggleClass('show')
        }
      }
    })

    $('.wcv-custom-select').each(function() {
      buildCustomSelect(this)
    })

    $('.wcv-open-popup-add-note').on('click', function(e) {
      const modalId = e.target.getAttribute('data-modal')

      const modal = document.getElementById(modalId)
      modal.dispatchEvent(new Event('click'))
    })

    let selectedCountry = $('#_wcv_store_country').val()

    $('#_wcv_store_country').on('change', function() {
      selectedCountry = $(this).val()
      $('#wcv-country-code-select')
        .val(selectedCountry)
        .trigger('change')
    })

    const country_codes = wcvendor_dashboard.countries_phone_codes.map(
      country => {
        return {
          id: country.code,
          text: `${country.flag} ${country.name} ${country.dial_code}`,
          flag: country.flag,
          name: country.name,
          dial_code: country.dial_code,
          selected: country.code === selectedCountry
        }
      }
    )

    const countryCodeSelectionTemplate = function(state) {
      if (!state.id) {
        return state.text
      }
      const flagAndDialCode = state.flag + '  ' + state.dial_code
      return flagAndDialCode
    }

    $('#wcv-country-code-select').select2({
      templateSelection: countryCodeSelectionTemplate,
      data: country_codes,
      dropdownAutoWidth: true,
      value: selectedCountry
    })

    $(document).on('mouseenter', '.wcv-tip', showTooltip)
    $(document).on('mouseleave', '.wcv-tip', function(event) {
      const tooltip = event.currentTarget
      if (!tooltip) {
        return
      }
      const content = tooltip.querySelector('.content')
      const arrow = tooltip.querySelector('.arrow')

      if (!content || !arrow) {
        return
      }

      content.style.display = 'none'
      arrow.style.display = 'none'
    })

    addAccordion()
    productEditAccordion()

    // Handle tabs-tab click to update form action
    $(document).on('click', '.tabs-tab', function(e) {
      const href = $(this).attr('href')
      const form = $('#wcv-store-settings')

      if (href && form.length) {
        form.attr('action', href)
      }
    })

    // Sticky nav
    const stickyNav = $('#wcv-navigation.wcv-sticky')
    if (stickyNav.length) {
      const navOffset = stickyNav.offset().top
      const spacer = $('<div class="wcv-sticky-spacer"></div>').css({
        height: stickyNav.outerHeight(),
        display: 'none'
      })
      stickyNav.after(spacer)

      let scrollTicking = false
      let resizeTicking = false

      $(window).on('scroll.wcvStickyNav', function() {
        if (!scrollTicking) {
          window.requestAnimationFrame(function() {
            if ($(window).scrollTop() >= navOffset) {
              if (!stickyNav.hasClass('is-stuck')) {
                const navWidth = stickyNav.outerWidth()
                spacer.show()
                stickyNav.addClass('is-stuck').css('width', navWidth)
              }
            } else {
              stickyNav.removeClass('is-stuck').css('width', '')
              spacer.hide()
            }
            scrollTicking = false
          })
          scrollTicking = true
        }
      })

      $(window).on('resize.wcvStickyNav', function() {
        if (!resizeTicking) {
          window.requestAnimationFrame(function() {
            if (stickyNav.hasClass('is-stuck')) {
              stickyNav.css('width', spacer.outerWidth())
            }
            resizeTicking = false
          })
          resizeTicking = true
        }
      })
    }

    // Store settings tabs — responsive "More" overflow dropdown
    ;(function initStoreTabsOverflow() {
      const wrapper = document.querySelector('.wcv-tabs-overflow-wrapper')
      if (!wrapper) return

      const nav = wrapper.querySelector('.tabs-nav')
      const moreContainer = wrapper.querySelector('.wcv-more-tabs')
      const moreBtn = wrapper.querySelector('.wcv-more-btn')
      const dropdown = wrapper.querySelector('.wcv-more-dropdown')

      if (!nav || !moreContainer || !moreBtn || !dropdown) return

      const allItems = Array.from(nav.querySelectorAll(':scope > li'))

      function recalculate() {
        // 1. Reset — show all tabs so we can measure their natural widths.
        allItems.forEach(li => li.classList.remove('wcv-tab-overflow'))
        moreContainer.classList.remove('wcv-more-visible')
        dropdown.innerHTML = ''
        moreBtn.classList.remove('wcv-more-btn--active')

        // 2. Measure. offsetWidth forces a synchronous reflow.
        const wrapperWidth = wrapper.offsetWidth
        const itemWidths = allItems.map(li => li.offsetWidth)
        const totalWidth = itemWidths.reduce((sum, w) => sum + w, 0)

        if (totalWidth <= wrapperWidth) {
          return // All tabs fit — nothing more to do.
        }

        // 3. Show the More button and measure how much width it needs.
        moreContainer.classList.add('wcv-more-visible')
        const moreBtnWidth = moreContainer.offsetWidth
        const available = wrapperWidth - moreBtnWidth

        // 4. Find the first tab index that causes overflow.
        let cumWidth = 0
        let overflowStart = allItems.length
        for (let i = 0; i < allItems.length; i++) {
          cumWidth += itemWidths[i]
          if (cumWidth > available) {
            overflowStart = i
            break
          }
        }

        // 5. Mark overflowing tabs as hidden.
        for (let i = overflowStart; i < allItems.length; i++) {
          allItems[i].classList.add('wcv-tab-overflow')
        }

        // 6. Ensure the active tab is always visible in the main row.
        const activeIndex = allItems.findIndex(li =>
          li.classList.contains('active')
        )
        if (activeIndex >= overflowStart && overflowStart > 0) {
          // Swap: hide the last visible tab, show the active one.
          allItems[overflowStart - 1].classList.add('wcv-tab-overflow')
          allItems[activeIndex].classList.remove('wcv-tab-overflow')
        }

        // 7. Populate the dropdown with clones of the overflow tabs.
        const overflowItems = allItems.filter(li =>
          li.classList.contains('wcv-tab-overflow')
        )

        if (overflowItems.length === 0) {
          moreContainer.classList.remove('wcv-more-visible')
          return
        }

        overflowItems.forEach(function(originalLi) {
          const originalAnchor = originalLi.querySelector('a')
          if (!originalAnchor) return
          const clone = originalLi.cloneNode(true)
          clone.setAttribute('role', 'menuitem')
          clone.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault()
            // Delegate to the real (hidden) anchor so Ink.JS handles tab switching.
            originalAnchor.click()
            dropdown.classList.remove('wcv-more-dropdown--open')
            moreBtn.setAttribute('aria-expanded', 'false')
            // Give Ink.JS one frame to update `li.active` before we recalculate.
            requestAnimationFrame(recalculate)
          })
          dropdown.appendChild(clone)
        })

        // 8. Highlight the More button if the active tab ended up in the dropdown.
        const activeInOverflow = overflowItems.some(li =>
          li.classList.contains('active')
        )
        moreBtn.classList.toggle('wcv-more-btn--active', activeInOverflow)
      }

      // Toggle dropdown open/closed.
      moreBtn.addEventListener('click', function(e) {
        e.stopPropagation()
        const isOpen = !dropdown.classList.contains('wcv-more-dropdown--open')
        dropdown.classList.toggle('wcv-more-dropdown--open', isOpen)
        moreBtn.setAttribute('aria-expanded', String(isOpen))
      })

      // Close dropdown when clicking anywhere outside.
      document.addEventListener('click', function() {
        dropdown.classList.remove('wcv-more-dropdown--open')
        moreBtn.setAttribute('aria-expanded', 'false')
      })

      // After any main-nav tab click, let Ink.JS settle then recalculate active state.
      nav.addEventListener('click', function() {
        requestAnimationFrame(recalculate)
      })

      // Re-run whenever the wrapper resizes (e.g. sidebar toggle, window resize).
      if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(recalculate).observe(wrapper)
      } else {
        $(window).on('resize.wcvTabsOverflow', recalculate)
      }

      recalculate()
    })()

    // Scroll to top button
    const scrollToTopBtn = $('.wcv-scroll-to-top')
    if (scrollToTopBtn.length) {
      $(window).on('scroll.wcvScrollTop', function() {
        if ($(this).scrollTop() > 300) {
          scrollToTopBtn.addClass('visible')
        } else {
          scrollToTopBtn.removeClass('visible')
        }
      })

      scrollToTopBtn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 500)
      })
    }
  })
})(jQuery, Ink)

const getPlaceHolderText = select => {
  const options = select.querySelectorAll('option')
  const selected = []
  for (let i = 0; i < options.length; i++) {
    if (options[i].selected && options[i].value !== '') {
      selected.push(options[i])
    }
  }

  if (selected.length === 0) {
    return (
      select.getAttribute('placeholder') || wcvendor_dashboard.option_none_text
    )
  } else if (selected.length === 1) {
    return selected[0].innerText
  } else {
    return selected.length + ' selected'
  }
}

const buildCustomSelect = select => {
  const width = select.offsetWidth
  const id = select.getAttribute('id')
  let textAlignment = select.getAttribute('data-text-align')
  if (!textAlignment) {
    textAlignment = 'center'
  }

  select.style.display = 'none'
  const selectContainer = document.createElement('div')
  selectContainer.setAttribute('data-id', id)
  const selectList = document.createElement('ul')
  const isMultiple = select.multiple
  const autoSubmit = select.getAttribute('data-autosubmit')
  const placeHolderText = document.createElement('span')
  placeHolderText.innerHTML = getPlaceHolderText(select)
  placeHolderText.className = 'wcv-select-placeholder'
  selectContainer.className = 'wcv-select-container'
  selectList.className = 'wcv-select-list'

  // Check if this is a hierarchical select (has data-depth attributes)
  const isHierarchical = Array.from(select.options).some(option =>
    option.hasAttribute('data-depth')
  )

  if (isHierarchical) {
    selectContainer.classList.add('wcv-hierarchical-select')
    selectList.classList.add('wcv-hierarchical-list')
  }

  selectContainer.appendChild(placeHolderText)
  selectContainer.appendChild(selectList)

  const options = select.options

  if (isHierarchical) {
    buildHierarchicalOptions(
      selectList,
      options,
      isMultiple,
      autoSubmit,
      placeHolderText,
      select,
      textAlignment
    )
  } else {
    buildFlatOptions(
      selectList,
      options,
      isMultiple,
      autoSubmit,
      placeHolderText,
      select,
      textAlignment
    )
  }

  select.parentNode.insertBefore(selectContainer, select)

  selectContainer.addEventListener('click', function() {
    selectContainer.classList.toggle('show')
    selectList.classList.toggle('show')
  })

  selectContainer.addEventListener('dblclick', function(event) {
    event.preventDefault()
  })

  document.addEventListener('click', function(event) {
    const target = event.target
    if (!selectContainer.contains(target)) {
      selectContainer.classList.remove('show')
      selectList.classList.remove('show')
    }
  })
}

// Build hierarchical options with parent-child relationships
const buildHierarchicalOptions = (
  selectList,
  options,
  isMultiple,
  autoSubmit,
  placeHolderText,
  select,
  textAlignment
) => {
  const hierarchyMap = new Map()
  const parentItems = new Map()

  // First pass: create all option items and map hierarchy
  for (let i = 0; i < options.length; i++) {
    const option = options[i]
    const depth = parseInt(option.getAttribute('data-depth') || '0')
    const parentId = option.getAttribute('data-parent') || '0'
    const termId = option.getAttribute('data-term-id') || option.value

    const optionItem = createOptionItem(
      option,
      i,
      isMultiple,
      autoSubmit,
      placeHolderText,
      select,
      textAlignment
    )

    // Add hierarchy classes
    optionItem.classList.add(`wcv-depth-${depth}`)
    optionItem.setAttribute('data-depth', depth)
    optionItem.setAttribute('data-parent-id', parentId)
    optionItem.setAttribute('data-term-id', termId)

    // Store in hierarchy map
    if (!hierarchyMap.has(parentId)) {
      hierarchyMap.set(parentId, [])
    }
    hierarchyMap.set(termId, [])

    if (depth === 0) {
      // Root level item
      selectList.appendChild(optionItem)
      parentItems.set(termId, optionItem)
    } else {
      // Child item - will be added to parent later
      hierarchyMap.get(parentId).push(optionItem)
    }
  }

  // Second pass: create child lists and add collapse functionality recursively
  const addCollapseFunctionalityRecursive = (parentItem, parentId) => {
    const children = hierarchyMap.get(parentId)
    if (children && children.length > 0) {
      parentItem.classList.add('wcv-has-children')

      // Create submenu container for collapse
      const childList = document.createElement('ul')
      childList.className = 'wcv-select-submenu wcv-collapse'

      // Insert submenu after the parent item (not as child)
      parentItem.parentNode.insertBefore(childList, parentItem.nextSibling)

      // Add children to submenu and recursively handle their children
      children.forEach(child => {
        childList.appendChild(child)

        // Recursively handle deeper levels
        const childTermId = child.getAttribute('data-term-id')
        addCollapseFunctionalityRecursive(child, childTermId)
      })

      // Add expand/collapse indicator
      const parentTextSpan = parentItem.querySelector('span')
      if (parentTextSpan) {
        const indicator = document.createElement('span')
        indicator.className = 'wcv-collapse-indicator'
        indicator.innerHTML = '+'
        parentTextSpan.appendChild(indicator)

        // Add hover events for expand/collapse functionality
        parentItem.addEventListener('mouseenter', function(e) {
          // Expand on hover
          childList.classList.add('expanded')
          indicator.classList.add('expanded')
          parentItem.classList.add('expanded')
          indicator.innerHTML = '-'
        })

        parentItem.addEventListener('mouseleave', function(e) {
          // Check if we're moving to a child element
          const relatedTarget = e.relatedTarget
          if (
            !relatedTarget ||
            (!parentItem.contains(relatedTarget) &&
              !childList.contains(relatedTarget))
          ) {
            // Collapse when leaving the parent item and not entering a child
            childList.classList.remove('expanded')
            indicator.classList.remove('expanded')
            parentItem.classList.remove('expanded')
            indicator.innerHTML = '+'

            // Collapse any open children as well
            const openChildren = childList.querySelectorAll(
              '.wcv-select-submenu.expanded'
            )
            openChildren.forEach(openChild => {
              openChild.classList.remove('expanded')
              const childParent = openChild.previousElementSibling
              if (childParent) {
                childParent.classList.remove('expanded')
                const childIndicator = childParent.querySelector(
                  '.wcv-collapse-indicator'
                )
                if (childIndicator) {
                  childIndicator.classList.remove('expanded')
                  childIndicator.innerHTML = '+'
                }
              }
            })
          }
        })

        // Also add hover events to the child list to maintain expansion
        childList.addEventListener('mouseleave', function(e) {
          const relatedTarget = e.relatedTarget
          if (
            !relatedTarget ||
            (!parentItem.contains(relatedTarget) &&
              !childList.contains(relatedTarget))
          ) {
            // Collapse when leaving the child list and not entering the parent
            childList.classList.remove('expanded')
            indicator.classList.remove('expanded')
            parentItem.classList.remove('expanded')

            // Collapse any open children as well
            const openChildren = childList.querySelectorAll(
              '.wcv-select-submenu.expanded'
            )
            openChildren.forEach(openChild => {
              openChild.classList.remove('expanded')
              const childParent = openChild.previousElementSibling
              if (childParent) {
                childParent.classList.remove('expanded')
                const childIndicator = childParent.querySelector(
                  '.wcv-collapse-indicator'
                )
                if (childIndicator) {
                  childIndicator.classList.remove('expanded')
                  childIndicator.innerHTML = '+'
                }
              }
            })
          }
        })
      }
    }
  }

  // Apply collapse functionality to all root level items
  parentItems.forEach((parentItem, parentId) => {
    addCollapseFunctionalityRecursive(parentItem, parentId)
  })
}

// Build flat options (original functionality)
const buildFlatOptions = (
  selectList,
  options,
  isMultiple,
  autoSubmit,
  placeHolderText,
  select,
  textAlignment
) => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i]
    const optionItem = createOptionItem(
      option,
      i,
      isMultiple,
      autoSubmit,
      placeHolderText,
      select,
      textAlignment
    )
    selectList.appendChild(optionItem)
  }
}

// Create individual option item
const createOptionItem = (
  option,
  index,
  isMultiple,
  autoSubmit,
  placeHolderText,
  select,
  textAlignment
) => {
  const optionItem = document.createElement('li')
  optionItem.className = 'wcv-select-item'

  // Copy classes from original option
  if (option.className) {
    optionItem.classList.add(...option.className.split(' '))
  }

  const optionText = document.createElement('span')

  let displayText = option.innerText

  displayText = displayText.replace(/^\d+\s+levels?\s+deep\s+/g, '')

  optionText.innerHTML = displayText
  optionItem.appendChild(optionText)
  optionItem.style.textAlign = textAlignment
  optionItem.setAttribute('data-value', option.value)
  optionItem.setAttribute('data-index', index)

  if (option.selected && option.value !== '') {
    optionItem.classList.add('selected')
  }

  optionItem.addEventListener('click', function(e) {
    e.stopPropagation()

    const selectedIndex = this.getAttribute('data-index')
    const selectedOption = select.options[selectedIndex]

    if (!isMultiple) {
      // Clear all selections
      for (let i = 0; i < select.options.length; i++) {
        if (i !== selectedIndex) {
          select.options[i].selected = false
          const otherItems = select.parentNode.querySelectorAll(
            `[data-index="${i}"]`
          )
          otherItems.forEach(item => item.classList.remove('selected'))
        }
      }
      selectedOption.selected = true
      optionItem.classList.add('selected')
    } else {
      selectedOption.selected = !selectedOption.selected
      optionItem.classList.toggle('selected')
    }

    if (selectedOption.value === '') {
      for (let i = 0; i < select.options.length; i++) {
        if (i !== selectedIndex) {
          select.options[i].selected = false
          const otherItems = select.parentNode.querySelectorAll(
            `[data-index="${i}"]`
          )
          otherItems.forEach(item => item.classList.remove('selected'))
        }
      }
    }

    placeHolderText.innerHTML = getPlaceHolderText(select)
    select.dispatchEvent(new Event('change'))

    // Close the dropdown after selection (for single select, always close; for multiple select, keep open)
    if (!isMultiple) {
      const selectContainer = select.parentNode.querySelector(
        '.wcv-select-container'
      )
      const selectList = selectContainer.querySelector('.wcv-select-list')
      if (selectContainer && selectList) {
        selectContainer.classList.remove('show')
        selectList.classList.remove('show')
      }
    }

    if (autoSubmit) {
      const form = select.closest('form')
      if (form) {
        form.submit()
      }
    }
  })

  return optionItem
}

function showTooltip(event) {
  const tooltip = event.currentTarget
  if (!tooltip) {
    return
  }
  const content = tooltip.querySelector('.content')
  const arrow = tooltip.querySelector('.arrow')

  if (!content || !arrow) {
    return
  }

  content.style.display = 'block'
  arrow.style.display = 'block'
  const tooltipRect = tooltip.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()

  // Position content above the tooltip
  let top = -contentRect.height - 10
  let left = tooltipRect.width / 2 - contentRect.width / 2 + 4

  // Adjust horizontal position if tooltip would go off-screen
  if (tooltipRect.left + contentRect.width > window.innerWidth) {
    left = tooltipRect.width - contentRect.width
  }

  // Ensure the tooltip doesn't go above the top of the screen
  const isBelow = tooltipRect.top - contentRect.height < 0
  if (isBelow) {
    top = tooltipRect.height + 10
  }

  // Apply position to content
  content.style.top = `${top}px`
  content.style.left = `${left}px`

  // Position arrow
  if (arrow) {
    const arrowRect = arrow.getBoundingClientRect()
    const arrowTop = isBelow ? -arrowRect.height : contentRect.height
    const arrowLeft = tooltipRect.width / 2 - arrowRect.width / 2 - left + 4

    arrow.style.top = `${arrowTop}px`
    arrow.style.left = `${arrowLeft}px`
    arrow.style.transform = isBelow ? 'rotate(180deg)' : ''
  }
}

const addAccordion = () => {
  const settingsNav = document.querySelector('#wcv-store-settings .wcv-tabs')
  const tabsContent = document.querySelectorAll(
    '#wcv-store-settings .tabs-content'
  )
  if (settingsNav) {
    const tabs = settingsNav.querySelectorAll('a.tabs-tab')

    tabs.forEach(tab => {
      const tabContentId = tab.getAttribute('href').replace('#', '')
      const tabTitle = tab.innerText
      const tabContent = document.querySelector(`#${tabContentId}`)
      const wrapper = document.createElement('div')
      const hasDot =
        tab.classList.contains('has-dot') &&
        tab.querySelector('.wcv-dot') !== null
      wrapper.className = 'wcv-accordion-content'
      if (!tabContent) return // tab panel not in DOM (e.g. conditional PRO tab)
      wrapElemt(tabContent, wrapper)
      const accordion = document.createElement('div')
      accordion.className = 'wcv_mobile wcv-accordion-title'
      if (tabContent.classList.contains('active')) {
        accordion.classList.add('active')
        tabContent.parentNode.classList.add('active')
      }
      const tabTitleElement = document.createElement('span')
      tabTitleElement.className = 'wcv-accordion-title-text'
      tabTitleElement.innerHTML = tabTitle

      if (hasDot) {
        accordion.classList.add('has-dot')
        tabTitleElement.innerHTML += '<span class="wcv-dot"></span>'
      }
      accordion.appendChild(tabTitleElement)
      accordion.addEventListener('click', function() {
        accordion.classList.toggle('active')
        tabsContent.forEach(content => {
          if (content.id === tabContentId) {
            if (accordion.classList.contains('active')) {
              content.classList.add('active')
              content.classList.remove('hide-all')
            } else {
              content.classList.add('hide-all')
              content.classList.remove('active')
            }
            content.parentNode.classList.toggle('active')
          } else {
            content.classList.add('hide-all')
            content.classList.remove('active')
            content.parentNode.classList.remove('active')
            content.parentNode
              .querySelector('.wcv-accordion-title')
              .classList.remove('active')
          }
        })
      })
      wrapper.prepend(accordion)
    })

    if (typeof tinymce !== 'undefined' && tinymce.editors.length > 0) {
      const editors = document.querySelectorAll('.wp-editor-area')
      const preInits = tinyMCEPreInit.mceInit
      for (let i = 0; i < editors.length; i++) {
        const editorId = editors[i].id
        const configs = preInits[editorId]
        reinitWPEditor(editorId, configs)
      }
    }
  }
}

const productEditAccordion = () => {
  const tabContent = document.querySelectorAll(
    '#wcv-product-edit .tabs-content'
  )
  const tabs = wcvendor_dashboard.product_meta_tabs

  tabContent.forEach(content => {
    const tabContentId = content.id
    // check if tabContentId is in tabs
    if (!tabs[tabContentId]) {
      return
    }
    const tab = tabs[tabContentId]
    const tabContentTitle = tab.label
    const wrapper = document.createElement('div')
    wrapper.className = 'wcv-product-accordion is_hidden ' + tab.class.join(' ')
    wrapElemt(content, wrapper)
    const accordion = document.createElement('div')
    accordion.className = 'wcv-accordion-title'
    accordion.setAttribute('data-tab', tabContentId)
    const accordionText = document.createElement('h3')
    const arrowIcon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )
    arrowIcon.classList.add('wcv-icon', 'wcv-icon-24')
    arrowIcon.innerHTML = `<use xlink:href="${wcvendor_dashboard.icon_url}#wcv-icon-caret-down"></use>`
    accordionText.innerHTML = tabContentTitle
    accordion.appendChild(accordionText)
    accordion.appendChild(arrowIcon)

    accordion.addEventListener('click', function() {
      // Toggle the clicked accordion
      accordion.classList.toggle('active')
      if (accordion.classList.contains('active')) {
        content.classList.add('active')
        content.classList.remove('hide-all')
      } else {
        content.classList.add('hide-all')
        content.classList.remove('active')
      }
    })
    wrapper.prepend(accordion)
  })
}

const wrapElemt = (element, wrapper) => {
  element.parentNode.insertBefore(wrapper, element)
  wrapper.appendChild(element)
}

function reinitWPEditor(editorId, settings) {
  if (typeof tinymce !== 'undefined') {
    const editor = tinymce.get(editorId)
    if (editor) {
      editor.remove()
    }
  }

  const editorElement = document.getElementById(editorId)
  if (!editorElement) {
    console.error(`Editor element with ID "${editorId}" not found.`)
    return
  }

  tinymce.init(settings)
}

const buildCustomToggleMenu = toogleElement => {
  const toogleButton = document.querySelector(toogleElement)
  if (!toogleButton) {
    return
  }
  const target = toogleButton.getAttribute('data-target')
  const menu = document.querySelector(target)

  toogleButton.addEventListener('click', function() {
    toogleButton.classList.toggle('open')
    menu.classList.toggle('show')
  })
}
