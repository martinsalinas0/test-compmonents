"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, FileText, Landmark, Receipt } from "lucide-react";
import Link from "next/link";

export default function FinancialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financial</h1>
        <p className="text-muted-foreground mt-1">
          Payments, quotes, and invoices
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/list/financials/payments">
          <Card className="shadow-sm hover:shadow-md transition-shadow h-full hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Banknote className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">Payments</CardTitle>
                <CardDescription>
                  View and search payments
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/list/financials/quotes">
          <Card className="shadow-sm hover:shadow-md transition-shadow h-full hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">Quotes</CardTitle>
                <CardDescription>
                  Manage quotes
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/list/financials/invoices/contractors">
          <Card className="shadow-sm hover:shadow-md transition-shadow h-full hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Receipt className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">Contractor Invoices</CardTitle>
                <CardDescription>
                  Contractor invoice list
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/list/financials/invoices/customers">
          <Card className="shadow-sm hover:shadow-md transition-shadow h-full hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Landmark className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">Customer Invoices</CardTitle>
                <CardDescription>
                  Customer invoice list
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
