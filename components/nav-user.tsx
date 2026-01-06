"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-[#f0f3ec] data-[state=open]:text-[#0f2143] hover:bg-[#f0f3ec]"
            >
              <Avatar className="h-8 w-8 rounded-lg border-2 border-[#c5cfe0]">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-[#0f2143] text-white">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-[#0f2143]">
                  {user.name}
                </span>
                <span className="truncate text-xs text-[#354e56]">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-[#354e56]" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border-[#c5cfe0] bg-white"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg border-2 border-[#c5cfe0]">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-[#0f2143] text-white">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-[#0f2143]">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-[#354e56]">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#c5cfe0]" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-[#f0f3ec] text-[#0f2143]">
                <Sparkles className="text-[#8b6212]" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#c5cfe0]" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-[#f0f3ec] text-[#0f2143]">
                <BadgeCheck className="text-[#354e56]" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#f0f3ec] text-[#0f2143]">
                <CreditCard className="text-[#354e56]" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#f0f3ec] text-[#0f2143]">
                <Bell className="text-[#354e56]" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#c5cfe0]" />
            <DropdownMenuItem className="hover:bg-red-50 text-red-600">
              <LogOut className="text-red-500" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
