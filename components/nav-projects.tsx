"use client";

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-[#354e56] font-semibold">
        Projects
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className="hover:bg-[#f0f3ec] hover:text-[#0f2143]"
            >
              <a href={item.url}>
                <item.icon className="text-[#354e56]" />
                <span className="text-[#0f2143]">{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal className="text-[#354e56]" />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg border-[#c5cfe0] bg-white"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="hover:bg-[#f0f3ec]">
                  <Folder className="text-[#354e56]" />
                  <span className="text-[#0f2143]">View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#f0f3ec]">
                  <Forward className="text-[#354e56]" />
                  <span className="text-[#0f2143]">Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#c5cfe0]" />
                <DropdownMenuItem className="hover:bg-[#f0f3ec]">
                  <Trash2 className="text-red-500" />
                  <span className="text-red-600">Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-[#354e56] hover:bg-[#f0f3ec] hover:text-[#0f2143]">
            <MoreHorizontal className="text-[#354e56]" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
