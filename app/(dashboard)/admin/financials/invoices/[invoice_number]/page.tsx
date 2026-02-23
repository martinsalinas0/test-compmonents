"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type InvoiceData = {
  id?: string;
  invoice_number?: string;
  status?: string;
  total?: number;
  job_id?: string;
  customer_id?: string;
  [key: string]: unknown;
};

export default function InvoiceDetailByNumberPage() {
  const params = useParams();
  const invoiceNumber = params?.invoice_number as string;

  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!invoiceNumber) return;

    const fetchInvoice = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("customer-invoices/");
        const list = res.data?.data ?? [];
        const found = list.find(
          (inv: { invoice_number?: string }) =>
            String(inv?.invoice_number) === String(invoiceNumber)
        );
        if (found) setInvoice(found);
        else setError("Invoice not found");
      } catch {
        setError("Failed to load invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Invoice not found</CardTitle>
            <CardDescription>{error ?? "Unknown error"}</CardDescription>
          </CardHeader>
          <CardContent>
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Invoice {invoice.invoice_number ?? invoiceNumber}
          </h1>
          <p className="text-muted-foreground mt-1">
            {invoice.status ? String(invoice.status) : "—"}
          </p>
        </div>
        <Link href="/admin/list/financials/invoices/customers">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to customer invoices
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Summary
          </CardTitle>
          <CardDescription>Invoice overview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Invoice number</span>
            <span className="font-medium text-foreground">
              {String(invoice.invoice_number ?? invoiceNumber)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium text-foreground capitalize">
              {invoice.status ? String(invoice.status) : "—"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold text-foreground">
              ${Number(invoice.total ?? 0).toFixed(2)}
            </span>
          </div>
          {invoice.job_id && (
            <div className="pt-3 border-t border-border">
              <Link
                href={`/admin/list/jobs/${invoice.job_id}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                View job
              </Link>
            </div>
          )}
          {invoice.customer_id && (
            <div>
              <Link
                href={`/admin/users/customers/edit/${invoice.customer_id}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                View customer
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
