
import {
    LayoutDashboard,
    Zap,
    Wind,
    Snowflake,
    Thermometer,
    Clock,
    Car,
    BarChart3,
    Settings,
} from "lucide-react";

export const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "E3 Apps",
        href: "/dashboard/e3-apps",
        icon: Settings,
        hasSubmenu: true,
    },
    {
        title: "Peak Shaving & Alert",
        href: "/dashboard",
        icon: Zap,
    },
    {
        title: "Ventilation",
        href: "/dashboard/ventilation",
        icon: Wind,
    },
    {
        title: "Cooling",
        href: "/dashboard/cooling",
        icon: Snowflake,
    },
    {
        title: "Heat Pump",
        href: "/dashboard/heat-pump",
        icon: Thermometer,
    },
    {
        title: "Out Of Hours",
        href: "/dashboard/out-of-hours",
        icon: Clock,
    },
    {
        title: "EV Charging",
        href: "/dashboard/ev-charging",
        icon: Car,
    },
    {
        title: "Load Shifting",
        href: "/dashboard/load-shifting",
        icon: BarChart3,
    },
];