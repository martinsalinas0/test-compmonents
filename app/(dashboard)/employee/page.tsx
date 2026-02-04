"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Briefcase, FileText } from "lucide-react";
import Link from "next/link";

export default function EmployeeDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-cerulean mb-2">
        Employee Dashboard
      </h1>
      <p className="text-pacific-600 mb-8">
        Internal tools: users, jobs, and task requests.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users size={20} />
              Users & Customers
            </CardTitle>
            <CardDescription>
              Manage users, contractors, and customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/list/users"
              className="text-cerulean font-medium hover:underline"
            >
              View users →
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase size={20} />
              Jobs & Tasks
            </CardTitle>
            <CardDescription>
              Jobs and task requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/list/jobs"
              className="text-cerulean font-medium hover:underline"
            >
              View jobs →
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText size={20} />
              Financials
            </CardTitle>
            <CardDescription>
              Invoices, quotes, payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/list/financials/invoices"
              className="text-cerulean font-medium hover:underline"
            >
              View financials →
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick start</CardTitle>
          <CardDescription>
            As an employee you have access to list and manage users, jobs, and financials.
            For full admin access use the main Admin dashboard.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
