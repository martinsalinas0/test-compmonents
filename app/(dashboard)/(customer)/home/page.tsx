"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, FileText, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CustomerHomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Welcome back
        </h1>
        <p className="text-muted-foreground mt-1">
          View your invoices and payment history in one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              Invoices
            </CardTitle>
            <CardDescription>
              View quotes and customer invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/invoices"
              className="text-sm font-medium text-primary hover:underline"
            >
              View invoices →
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-5 w-5 text-primary" />
              Payments
            </CardTitle>
            <CardDescription>
              Payment history and methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/list/financials/payments"
              className="text-sm font-medium text-primary hover:underline"
            >
              View payments →
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Get started
          </CardTitle>
          <CardDescription>
            View your invoices and payment history using the links above or the
            customer menu.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
