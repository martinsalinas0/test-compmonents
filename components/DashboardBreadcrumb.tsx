"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

const segmentLabels: Record<string, string> = {
  admin: "Admin",
  list: "List",
  users: "Users",
  user: "User",
  jobs: "Jobs",
  job: "Job",
  new: "New",
  employees: "Employees",
  contractors: "Contractors",
  customers: "Customers",
  customer: "Customer",
  financials: "Financials",
  payments: "Payments",
  quotes: "Quotes",
  invoices: "Invoices",
  "task-requests": "Task Requests",
  active: "Active",
  complete: "Complete",
  analytics: "Analytics",
  settings: "Settings",
  update: "Edit",
  edit: "Edit",
};

function formatSegment(segment: string): string {
  if (/^[a-f0-9-]{36}$/i.test(segment)) return "Detail";
  return segmentLabels[segment] ?? segment.replace(/-/g, " ");
}

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-primary"
            >
              Admin
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          const label =
            isLast && segment === "admin"
              ? "Dashboard"
              : formatSegment(segment);
          return (
            <span key={href} className="contents">
              <BreadcrumbSeparator className="hidden md:block text-border" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-primary font-medium">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
