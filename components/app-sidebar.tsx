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
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  //section titles
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/dashboard/users",
        },
        {
          title: "Employees",
          url: "#",
        },
        {
          title: "Contractors",
          url: "#",
        },
        {
          title: "Customer",
          url: "#",
        },
      ],
    },
    {
      title: "Jobs",
      url: "/dashboard/jobs",
      icon: Toolbox,
      isActive: true,
      items: [
        {
          title: "All Jobs",
          url: "/dashboard/jobs",
        },
        {
          title: "Active Jobs",
          url: "/dashboard/jobs/active",
        },
        {
          title: "Completed Jobs",
          url: "/dashboard/jobs/completed",
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
          url: "#",
        },
        {
          title: "Payouts",
          url: "#",
        },
        {
          title: "Revenue",
          url: "#",
        },
        {
          title: "Invoices",
          url: "#",
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
