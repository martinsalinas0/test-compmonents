"use client";

import {
  FileText,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  Settings,
} from "lucide-react";

import Link from "next/link";

const QuickActionBar = () => {
  const quickActions = [
    { icon: FileText, label: "New Job", href: "/admin/jobs/new" },
    { icon: Users, label: "New Customer", href: "/admin/users/customers/new" },
    { icon: Briefcase, label: "Task Requests", href: "/admin/list/jobs/task-requests" },
    { icon: DollarSign, label: "Invoices", href: "/admin/list/financials/invoices" },
    { icon: Calendar, label: "Calendar", href: "/admin" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex items-center gap-3 ml-3 mr-3 p-1">
      {quickActions.map((action, index) => (
        <Link
          key={index}
          href={action.href}
          className="p-2 rounded-lg bg-cerulean hover:bg-pacific text-white transition-colors"
          title={action.label}
        >
          <action.icon size={20} />
        </Link>
      ))}
    </div>
  );
};

export default QuickActionBar;
