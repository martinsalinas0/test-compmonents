"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HelpCircle, FileText, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CustomerDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-cerulean mb-2">
        Customer Dashboard
      </h1>
      <p className="text-pacific-600 mb-8">
        Track your requests, jobs, and invoices.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <HelpCircle size={20} />
              Task Requests
            </CardTitle>
            <CardDescription>
              Submit and track task requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/list/jobs/task-requests"
              className="text-cerulean font-medium hover:underline"
            >
              View requests →
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText size={20} />
              Invoices
            </CardTitle>
            <CardDescription>
              Customer invoices and quotes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/list/financials/invoices/customers"
              className="text-cerulean font-medium hover:underline"
            >
              View invoices →
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard size={20} />
              Payments
            </CardTitle>
            <CardDescription>
              Payment history and methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/list/financials/payments"
              className="text-cerulean font-medium hover:underline"
            >
              View payments →
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick start</CardTitle>
          <CardDescription>
            As a customer you can submit task requests, view job progress, and pay invoices.
            Customer-specific flows (e.g. self-service portal) can be added here.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
