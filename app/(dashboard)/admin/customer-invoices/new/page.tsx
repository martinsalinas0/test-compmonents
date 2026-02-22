"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function NewCustomerInvoicePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            New customer invoice
          </CardTitle>
          <CardDescription>
            Create a new customer invoice. This form will be wired to the API
            when the backend endpoint is available.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Invoice creation (job, line items, totals) can be added here.
          </p>
          <Link href="/admin/list/financials/invoices/customers">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to customer invoices
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
