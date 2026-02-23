"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, FileText, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const customerNav = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/admin/list/financials/payments", label: "Payments", icon: CreditCard },
] as const;

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Customer
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Your invoices and payments
        </p>
        <nav
          className="flex flex-wrap gap-1"
          aria-label="Customer navigation"
        >
          {customerNav.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== "/home" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      {children}
    </div>
  );
}
