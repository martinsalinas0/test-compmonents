import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb";
import { AppSidebar } from "@/components/SideMenu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-cerulean-100 bg-white">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 text-cerulean hover:bg-olive-50" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4 bg-cerulean-100"
              />
              <DashboardBreadcrumb />
            </div>
          </header>
          <div className="min-h-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
