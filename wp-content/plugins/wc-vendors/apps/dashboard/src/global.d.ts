declare global {
    interface Window {
        wcv_dashboard_data: {
            default_period: { label: string; value: string };
            period_options: Array<{ label: string; value: string }>;
            [key: string]: any;
        };
    }
}

window.wcv_dashboard_data = window.wcv_dashboard_data || {}

export { window }
