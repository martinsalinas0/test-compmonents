"use client";

import GenericTable, { Column } from "@/components/forList/GenericTable";
import SearchBar from "@/components/SearchBar";
import { clientConfig } from "@/lib/config";
import { Payment } from "@/lib/types/all";
import axios from "axios";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

const PaymentsListPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLastSix = (str: string) => str.slice(-6);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${clientConfig.apiUrl}/payments/all`);
        setPayments(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load payments");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    if (!searchQuery.trim()) return payments;

    const q = searchQuery.toLowerCase();
    return payments.filter((payment) => {
      const searchFields = [
        payment.id,
        payment.customer_invoice_id,
        payment.customer_id,
        payment.amount,
        payment.status,
        payment.card_last_four,
      ];

      return searchFields.some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(q),
      );
    });
  }, [payments, searchQuery]);

  const columns: Column<Payment>[] = [
    {
      header: "Payment ID",
      accessor: "id",
      render: (v) => `E3333333-${getLastSix(String(v))}`,
    },
    {
      header: "Stripe Payment ID",
      accessor: "stripe_payment_intent_id",
      render: (v) => `PI-${getLastSix(String(v))}`,
    },
    {
      header: "Invoice",
      accessor: "customer_invoice_id",
      render: (v, payment) => (
        <Link
          href={`/admin/financials/invoices/customers/${payment.customer_invoice_id}`}
          className="hover:text-primary"
        >
          E1111111-{getLastSix(String(v))}
        </Link>
      ),
    },
    {
      header: "Customer",
      accessor: "customer_id",
      render: (v, payment) => (
        <Link
          href={`/admin/customers/${payment.customer_id}`}
          className="hover:text-primary"
        >
          C-{getLastSix(String(v))}
        </Link>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (v) => `$${Number(v).toFixed(2)}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (v) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${String(
            v,
          ).toLowerCase()}`}
        >
          {String(v).toUpperCase()}
        </span>
      ),
    },
    {
      header: "Card Last 4",
      accessor: "card_last_four",
      render: (v) => `****${v}`,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-cerulean mb-2 md:mb-0">
          Payments List
        </h1>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search payments..."
          />

          <Link
            href="/admin/financials/payments/new"
            className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              Record Payment <Plus size={18} />
            </div>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : filteredPayments.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No payments found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No payments yet</p>
            <Link
              href="/admin/financials/payments/new"
              className="inline-flex items-center gap-2 bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Record Your First Payment <Plus size={18} />
            </Link>
          </div>
        ) : (
          <GenericTable
            data={filteredPayments}
            columns={columns}
            emptyMessage="No payments found"
          />
        )}
      </div>
    </div>
  );
};

export default PaymentsListPage;
