(function($) {
  'use strict';

  /**
   * Code required to create the charts
   */

  $(window).on('load', function() {
    // Get random number between two values
    var wcv_random = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Cut # out of hexadecimal color value
    var wcv_cut_hex = function cutHex(hexcode) {
      return hexcode.charAt(0) == '#' ? hexcode.substring(1, 7) : hexcode;
    };

    // Convert 2 digit RGB to hexadecimal
    var wcv_rgb_to_hex = function(rgb) {
      var hex = Number(rgb).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      return hex;
    };

    // Convert RGB values to full hexadecimal color
    var wcv_full_hex_color = function(r, g, b) {
      var red = wcv_rgb_to_hex(r);
      var green = wcv_rgb_to_hex(g);
      var blue = wcv_rgb_to_hex(b);

      return red + green + blue;
    };

    // Get red value from hexadecimal value
    var wcv_get_red = function(hexcode) {
      return parseInt(wcv_cut_hex(hexcode).substring(0, 2), 16);
    };

    // Get green value from hexadecimal value
    var wcv_get_green = function(hexcode) {
      return parseInt(wcv_cut_hex(hexcode).substring(2, 4), 16);
    };

    // Get blue value from hexadecimal value
    var wcv_get_blue = function(hexcode) {
      return parseInt(wcv_cut_hex(hexcode).substring(4, 6), 16);
    };

    var fill_red = 0;
    var fill_green = 0;
    var fill_blue = 0;
    var hover_fill_red = 0;
    var hover_fill_green = 0;
    var hover_fill_blue = 0;
    var stroke_red = 0;
    var stroke_green = 0;
    var stroke_blue = 0;
    const isProActive = chartjs_colors.is_pro_active;

    // Random RGB Fill
    fill_red = wcv_random(0, 255);
    fill_green = wcv_random(0, 255);
    fill_blue = wcv_random(0, 255);

    // Random RGB Stroke
    stroke_red = wcv_random(0, 255);
    stroke_green = wcv_random(0, 255);
    stroke_blue = wcv_random(0, 255);

    // Random RGB hover
    hover_fill_red = wcv_random(0, 255);
    hover_fill_green = wcv_random(0, 255);
    hover_fill_blue = wcv_random(0, 255);

    // Random RGB hover Stroke
    var hover_stroke_red = wcv_random(0, 255);
    var hover_stroke_green = wcv_random(0, 255);
    var hover_stroke_blue = wcv_random(0, 255);

    if (isProActive && 'no' == chartjs_colors.use_random) {
      // Make the RGB fill color from hexadecimal value
      fill_red = wcv_get_red(chartjs_colors.fill_color);
      fill_green = wcv_get_green(chartjs_colors.fill_color);
      fill_blue = wcv_get_blue(chartjs_colors.fill_color);

      // Make the RGB stroke color from hexadecimal value
      stroke_red = wcv_get_red(chartjs_colors.stroke_color);
      stroke_green = wcv_get_green(chartjs_colors.stroke_color);
      stroke_blue = wcv_get_blue(chartjs_colors.stroke_color);

      // Make the RGB hover fill color from hexadecimal value
      hover_fill_red = wcv_get_red(chartjs_colors.hover_fill_color);
      hover_fill_green = wcv_get_green(chartjs_colors.hover_fill_color);
      hover_fill_blue = wcv_get_blue(chartjs_colors.hover_fill_color);

      // Make the RGB hover stroke color from hexadecimal value
      hover_stroke_red = wcv_get_red(chartjs_colors.hover_stroke_color);
      hover_stroke_green = wcv_get_green(chartjs_colors.hover_stroke_color);
      hover_stroke_blue = wcv_get_blue(chartjs_colors.hover_stroke_color);
    }

    var fill_opacity = chartjs_colors.fill_opacity
      ? chartjs_colors.fill_opacity
      : 1;
    var stroke_opacity = chartjs_colors.stroke_opacity
      ? chartjs_colors.stroke_opacity
      : 1;

    var hover_fill_opacity = chartjs_colors.hover_fill_opacity
      ? chartjs_colors.hover_fill_opacity
      : 1;

    var hover_stroke_opacity = chartjs_colors.hover_stroke_opacity
      ? chartjs_colors.hover_stroke_opacity
      : 1;

    $('.wcv-total-orders-chart-legend-color').css(
      'background-color',
      `rgba(${fill_red}, ${fill_green}, ${fill_blue}, ${fill_opacity})`
    );
    // Only run on dashboard page
    if (typeof orders_chart_label !== 'undefined') {
      var orderdata = {
        labels: orders_chart_label,
        datasets: [
          {
            label: chart_i18n.total_orders_text,
            backgroundColor: `rgba(${fill_red}, ${fill_green}, ${fill_blue}, ${fill_opacity})`,
            borderColor: `rgba(${stroke_red}, ${stroke_green}, ${stroke_blue}, ${stroke_opacity})`,
            hoverBackgroundColor: `rgba(${hover_fill_red}, ${hover_fill_green}, ${hover_fill_blue}, ${hover_fill_opacity})`,
            hoverBorderColor: `rgba(${hover_stroke_red}, ${hover_stroke_green}, ${hover_stroke_blue}, ${hover_stroke_opacity})`,
            borderWidth: 1,
            showLine: true,
            barPercentage: 0.5,
            borderRadius: {
              topLeft: 5,
              topRight: 5,
              bottomLeft: 0,
              bottomRight: 0
            },
            categoryPercentage: 1,
            data: orders_chart_data,
            maxBarThickness: 27
          }
        ]
      };

      var orders_chart_canvas = document
        .getElementById('orders_chart')
        .getContext('2d');
      var ordersBarChart = new Chart(orders_chart_canvas, {
        type: 'bar',
        data: orderdata,
        options: {
          plugins: {
            legend: {
              display: false
            },
            htmlLegend: {
              position: 'bottom',
              containerID: 'wcv-total-orders-chart-legend'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            },
            x: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                display: false
              }
            }
          }
        }
      });
    }

    // Only run on dashboard page
    if (typeof pieData !== 'undefined') {
      var pie_use_random_colors = chartjs_colors.pie_use_random_colors;
      var pie_fill_color =
        chartjs_colors.wcv_product_totals_chart_base_fill_color;
      var pie_hover_fill_color =
        chartjs_colors.wcv_product_totals_chart_base_hover_color;

      if (isProActive && 'no' == chartjs_colors.pie_use_random_colors) {
        pie_fill_color = wcv_get_red(
          chartjs_colors.wcv_product_totals_chart_base_fill_color
        );
        pie_hover_fill_color = wcv_get_red(
          chartjs_colors.wcv_product_totals_chart_base_hover_color
        );
      } else {
        pie_fill_color = pieData.map(item => item.color);
        pie_hover_fill_color = pieData.map(item => item.hover);
      }

      var products_chart_canvas = document
        .getElementById('products_chart')
        .getContext('2d');
      const chartData = {
        labels: pieData.map(item => item.label),
        datasets: [
          {
            data: pieData.map(item => item.value),
            backgroundColor: pie_fill_color,
            hoverBackgroundColor: pie_hover_fill_color
          }
        ]
      };
      window.myPie = new Chart(products_chart_canvas, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }

    const drawChart = (canvasId, chartData) => {
      const ctx = document.getElementById(canvasId).getContext('2d');
      const snapShot = document.querySelector('.wcv-sales-snapshot-content');
      const snapShotHeight = snapShot ? snapShot.offsetHeight : 0;
      const chartContainer = document.querySelector(
        '.wcv-total-orders-chart-wrapper'
      );

      const windowWidth = window.innerWidth;

      if (
        document.getElementById('wcv-navigation').classList.contains('vertical')
      ) {
        chartContainer.style.height = 280 + 'px';
        chartContainer.style.marginBottom = '16px';
      } else if (chartContainer) {
        chartContainer.style.height = snapShotHeight - 3 + 'px';
        chartContainer.style.marginBottom = '16px';
      }

      if (windowWidth < 768) {
        chartContainer.style.height = 265 + 'px';
        chartContainer.style.marginBottom = '16px';
      }

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'Total Orders',
              data: chartData,
              borderWidth: 1,
              backgroundColor: `rgba(${fill_red}, ${fill_green}, ${fill_blue}, ${fill_opacity})`,
              borderColor: `rgba(${stroke_red}, ${stroke_green}, ${stroke_blue}, ${stroke_opacity})`,
              hoverBackgroundColor: `rgba(${hover_fill_red}, ${hover_fill_green}, ${hover_fill_blue}, ${hover_fill_opacity})`,
              hoverBorderColor: `rgba(${hover_stroke_red}, ${hover_stroke_green}, ${hover_stroke_blue}, ${hover_stroke_opacity})`,
              showLine: true,
              barPercentage: 0.5,
              borderRadius: {
                topLeft: 5,
                topRight: 5,
                bottomLeft: 0,
                bottomRight: 0
              },
              categoryPercentage: 1,
              maxBarThickness: 27
            }
          ]
        },
        options: {
          layout: {
            padding: {
              bottom: 20
            }
          },
          responsive: true,
          maintainAspectRatio: false, // Disables aspect ratio
          plugins: {
            legend: {
              display: false
            },
            htmlLegend: {
              position: 'bottom',
              containerID: 'wcv-total-orders-chart-legend'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#666'
              }
            },
            x: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                display: false
              },
              ticks: {
                color: '#666'
              }
            }
          }
        }
      });

      chart.update();
    };

    const dashboardChart = $('#wcv-total-orders-chart-data');
    if (dashboardChart.length) {
      const chartData = JSON.parse(dashboardChart.val());
      drawChart('wcv-total-orders-chart', chartData);
    }
  });
})(jQuery);
