"use client";

import * as React from "react";
import {
  AudioWaveform,
  BarChartHorizontal,
  Command,
  Frame,
  GalleryVerticalEnd,
  Landmark,
  Map,
  PieChart,
  Settings2,
  Toolbox,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { CompanyHeader } from "@/components/CompanyHeader";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Martin",
    email: "martin@prossfora.com",
    avatar: "/avatar/logo.png",
  },

  //section titles
  navMain: [
    {
      title: "Users",
      url: "/admin/list",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/admin/list/users",
        },
        {
          title: "Employees",
          url: "/admin/list/employees",
        },
        {
          title: "Contractors",
          url: "/admin/list/contractors",
        },
        {
          title: "Customers",
          url: "/admin/list/customers",
        },
      ],
    },
    {
      title: "Jobs",
      url: "",
      icon: Toolbox,
      isActive: false,
      items: [
        {
          title: "All Jobs",
          url: "/admin/list/jobs",
        },
        {
          title: "Active Jobs",
          url: "/admin/list/jobs/active",
        },
        {
          title: "Completed Jobs",
          url: "/admin/list/jobs/complete",
        },
      ],
    },

    {
      title: "Financial",
      url: "#",
      icon: Landmark,
      items: [
        {
          title: "Transactions",
          url: "/admin/list/financials/transactions",
        },
        {
          title: "Payouts",
          url: "/admin/list/financials/payouts",
        },
        {
          title: "Revenue",
          url: "/admin/list/financials/revenue",
        },
        {
          title: "Invoices",
          url: "/admin/list/financials/invoices",
        },
      ],
    },
    {
      title: "Analytics and Reports",
      url: "",
      icon: BarChartHorizontal,
      items: [
        {
          title: "Platform Analytics",
          url: "f",
        },
        { title: "User Activity", url: "f" },
        {
          title: "Job Stats",
          url: "f",
        },
        { title: "Financial Reports", url: "f" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
