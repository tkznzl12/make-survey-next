import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/surveys",
    label: "내 설문",
    icon: ClipboardList,
  },
  {
    href: "/analytics",
    label: "결과 분석",
    icon: BarChart3,
  },
  {
    href: "/settings",
    label: "설정",
    icon: Settings,
  },
];
