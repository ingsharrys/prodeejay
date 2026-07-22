<?php
/**
 * Custom upload file input, support browser file and drag and drop
 *
 * @version 2.5.4
 * @since  2.5.4
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$size    = isset( $should_small ) && $should_small ? 'small' : '';
$classes = isset( $classes ) ? $classes : '';
?>
<div class="wcv-upload-files-input <?php echo esc_attr( $size ); ?> <?php echo esc_attr( $classes ); ?>" draggable="false">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_814_1399)">
        <path d="M25.4797 2.37769H10.7998V8.46533H28.615V5.51172C28.615 3.78345 27.2085 2.37769 25.4797 2.37769Z" fill="#CED9F9"/>
        <path d="M17.1697 9.4021H0V3.75342C0 1.68359 1.68433 0 3.75488 0H9.24463C9.79028 0 10.3159 0.11499 10.7935 0.331055C11.4604 0.631592 12.0334 1.12695 12.4353 1.77417L17.1697 9.4021Z" fill="#1640C1"/>
        <path d="M32 10.6667V28.8621C32 30.5925 30.5913 32 28.8601 32H3.13989C1.40869 32 0 30.5925 0 28.8621V7.52808H28.8601C30.5913 7.52808 32 8.93604 32 10.6667Z" fill="#2354E6"/>
        <path d="M32 10.6667V28.8621C32 30.5925 30.5913 32 28.8601 32H16V7.52808H28.8601C30.5913 7.52808 32 8.93604 32 10.6667Z" fill="#1849D6"/>
        <path d="M24.4175 19.7637C24.4175 24.4055 20.6414 28.1819 16 28.1819C11.3586 28.1819 7.58252 24.4055 7.58252 19.7637C7.58252 15.1226 11.3586 11.3462 16 11.3462C20.6414 11.3462 24.4175 15.1226 24.4175 19.7637Z" fill="#E7ECFC"/>
        <path d="M24.4175 19.7637C24.4175 24.4055 20.6414 28.1819 16 28.1819V11.3462C20.6414 11.3462 24.4175 15.1226 24.4175 19.7637Z" fill="#CED9F9"/>
        <path d="M18.713 19.8669C18.5375 20.0156 18.3224 20.0881 18.1093 20.0881C17.8424 20.0881 17.5773 19.9751 17.3918 19.7549L16.9374 19.2163V22.7424C16.9374 23.26 16.5175 23.6799 15.9999 23.6799C15.4823 23.6799 15.0624 23.26 15.0624 22.7424V19.2163L14.6081 19.7549C14.2736 20.1506 13.6825 20.2012 13.2868 19.8669C12.8913 19.5332 12.8405 18.9419 13.1742 18.5461L15.0299 16.3462C15.2719 16.0601 15.6249 15.8955 15.9999 15.8955C16.3749 15.8955 16.7279 16.0601 16.9699 16.3462L18.8256 18.5461C19.1593 18.9419 19.1086 19.5332 18.713 19.8669Z" fill="#6C8DEF"/>
        <path d="M18.7131 19.8669C18.5376 20.0156 18.3225 20.0881 18.1094 20.0881C17.8425 20.0881 17.5774 19.9751 17.3918 19.7549L16.9375 19.2163V22.7424C16.9375 23.26 16.5176 23.6799 16 23.6799V15.8955C16.375 15.8955 16.728 16.0601 16.97 16.3462L18.8257 18.5461C19.1594 18.9419 19.1086 19.5332 18.7131 19.8669Z" fill="#3B67E9"/>
        </g>
        <defs>
        <clipPath id="clip0_814_1399">
        <rect width="32" height="32" fill="white"/>
        </clipPath>
        </defs>
    </svg>

    <small class="wcv_desktop">
        <?php esc_html_e( 'Drag your file(s) to start uploading', 'wc-vendors' ); ?>
    </small>
    <span class="text-with-lines wcv_desktop">
        <?php esc_html_e( 'OR', 'wc-vendors' ); ?>
    </span>
    <button type="button" class="wcv-browser-file wcv-button wcv-button-outline text-blue">
        <?php esc_html_e( 'Browse files', 'wc-vendors' ); ?>
    </button>
</div>
