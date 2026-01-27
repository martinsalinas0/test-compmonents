"use client";

import {
  Plus,
  FileText,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  Settings,
} from "lucide-react";
import SearchBar from "../SeachBar";
import { useState } from "react";
import Link from "next/link";

const QuickActionBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions = [
    { icon: FileText, label: "New Job", href: "/admin/jobs/new" },
    { icon: Users, label: "New Customer", href: "/admin/customers/new" },
    { icon: Briefcase, label: "New Task", href: "/admin/tasks/new" },
    { icon: DollarSign, label: "New Invoice", href: "/admin/invoices/new" },
    { icon: Calendar, label: "Schedule", href: "/admin/schedule" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex items-center gap-3 ml-3 mr-3 p-1">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Quick search..."
      />

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
