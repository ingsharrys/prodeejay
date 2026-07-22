export interface TopVendor {
  vendor_id: string;
  vendor_name: string;
  shop_name: string;
  total_orders: number;
  total_commission: number;
  total_revenue: number;
  rating: number;
  avatar: string;
}

export interface Vendor {
  id: number;
  username: string;
  display_name: string;
  email: string;
  registered: string;
}

export interface PendingVendor {
  id: number;
  username: string;
  display_name: string;
  email: string;
  registered: string;
  avatar: string;
}

export interface LicenseInfo {
  key: string;
  name: string;
  active: boolean;
  version?: string;
  installed: boolean;
  status?: string;
  expires?: string;
  basename?: string;
  desc?: string;
  upgrade_link?: string;
  need_to_activate?: Record<string, string>;
}

export interface HelpfulResource {
  title: string;
  description: string;
  type: string;
  icon: string;
  url: string;
  iconColor: string;
  iconBg: string;
}

export interface Period {
  label: string;
  value: string;
}
export interface DashboardResponse {
  success: boolean;
  data: {
    revenue: number;
    commissions: number;
    orders: number;
    top_vendors: TopVendor[];
    pending_vendors: Vendor[];
    license_status: LicenseInfo[];
  };
  meta: {
    start_date: string;
    end_date: string;
    period_type: string;
  };
}
