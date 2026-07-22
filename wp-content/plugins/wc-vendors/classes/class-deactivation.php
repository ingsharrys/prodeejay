<?php
/**
 * Deactivate class
 *
 * @since 2.5.2
 */
class WCV_Deactivate {
    /**
     * Constructor
     *
     * @since 2.5.2
     */
    public static function deactivate() {
        require_once 'class-uninstall.php';
        WCVendors_Uninstall::uninstall();
    }
}
