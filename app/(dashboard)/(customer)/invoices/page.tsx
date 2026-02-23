"use client";

import GenericTable, { Column } from "@/components/forList/GenericTable";
import SearchBar from "@/components/SearchBar";
import api from "@/lib/api";
import type { CustomerInvoice } from "@/lib/types/all";
import { AlertCircle, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// In production, replace with session/auth (e.g. get current customer id from your auth provider).
const CUSTOMER_ID_STORAGE_KEY = "prossfora_customer_id";

function getCurrentCustomerId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CUSTOMER_ID_STORAGE_KEY);
}

export default function CustomerInvoicesPage() {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<CustomerInvoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCustomerId(getCurrentCustomerId());
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get("customer-invoices/");
        const all = (response.data.data ?? []) as CustomerInvoice[];
        const id = getCurrentCustomerId();
        setInvoices(id ? all.filter((inv) => inv.customer_id === id) : []);
      } catch {
        setError("Failed to load invoices");
        setInvoices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    if (!searchQuery.trim()) return invoices;
    const q = searchQuery.toLowerCase();
    return invoices.filter(
      (inv) =>
        inv.invoice_number.toLowerCase().includes(q) ||
        inv.status.toLowerCase().includes(q) ||
        inv.total.toString().includes(q) ||
        inv.id.toLowerCase().includes(q)
    );
  }, [invoices, searchQuery]);

  const columns: Column<CustomerInvoice>[] = [
    {
      header: "Invoice",
      accessor: "invoice_number",
      render: (v, inv) => (
        <Link
          href={`/admin/financials/invoices/customers/${inv.id}`}
          className="font-medium text-primary hover:underline"
        >
          {String(v)}
        </Link>
      ),
    },
    {
      header: "Total",
      accessor: "total",
      render: (v) => `$${Number(v).toFixed(2)}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (v) => (
        <span className="capitalize">{String(v).replace(/_/g, " ")}</span>
      ),
    },
    {
      header: "Due date",
      accessor: "due_date",
      render: (v) =>
        v ? new Date(v as string).toLocaleDateString() : "—",
    },
  ];

  if (!customerId && !isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">My invoices</h1>
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Sign in as a customer to see your invoices. In development, set{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              {CUSTOMER_ID_STORAGE_KEY}
            </code>{" "}
            in localStorage to a customer ID to test.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">My invoices</h1>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search invoices..."
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive/30 bg-card p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <p className="font-medium text-destructive">{error}</p>
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            {searchQuery.trim()
              ? `No invoices matching "${searchQuery}".`
              : "You have no invoices yet."}
          </p>
        </div>
      ) : (
        <GenericTable
          data={filteredInvoices}
          columns={columns}
          emptyMessage="No invoices found"
        />
      )}
    </div>
  );
}
