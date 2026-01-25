"use client";

import GenericTable, { Column } from "@/components/forList/GenericTable";
import { CustomerInvoice } from "@/lib/types/all";

import axios from "axios";
import { Plus, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const URL = `http://localhost:5000/api/v1/customer-invoices/`;

const CustomerInvoicesListPage = () => {
  const [invoices, setInvoices] = useState<CustomerInvoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<CustomerInvoice[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(URL);
        setInvoices(response.data.data);
        setFilteredInvoices(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load invoices");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredInvoices(invoices);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filtered = invoices.filter((invoice) => {
      return (
        invoice.id?.toLowerCase().includes(query) ||
        invoice.total?.toString().includes(query) ||
        invoice.status?.toLowerCase().includes(query)
      );
    });

    setFilteredInvoices(filtered);
  }, [searchQuery, invoices]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getLastSix = (str: string) => str.slice(-6);

  const columns: Column<CustomerInvoice>[] = [
    {
      header: "ID",
      accessor: "id",
      render: (v) => `C-${getLastSix(v as string)}`,
    },
    {
      header: "Job ID",
      accessor: "job_id",
      render: (v, invoice) => (
        <Link
          href={`/admin/jobs/${invoice.job_id}`}
          className="hover:text-blue-500"
        >
          F{getLastSix(v as string)}
        </Link>
      ),
    },
    {
      header: "Customer ID",
      accessor: "customer_id",
      render: (v, invoice) => (
        <Link
          href={`/admin/customers/${invoice.customer_id}`}
          className="hover:text-blue-500"
        >
          F{getLastSix(v as string)}
        </Link>
      ),
    },
    {
      header: "Invoice Number",
      accessor: "invoice_number",
      render: (v, invoice) => (
        <Link
          href={`/admin/financials/invoices/${invoice.invoice_number}`}
          className="hover:text-blue-500"
        >
          F{getLastSix(v as string)}
        </Link>
      ),
    },
    {
      header: "Total",
      accessor: "total",
      render: (v) => `$${v}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (v) => String(v).toUpperCase(),
    },
    {
      header: "Due Date",
      accessor: "created_at",
      render: (v) => new Date(v as string).toLocaleDateString(),
    },
  ];

  // ---------------- RENDER ----------------
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cerulean mb-4">
          Customer Invoices List
        </h1>

        <div className="flex items-center justify-between gap-4">
          {/* SEARCH */}
          <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-pacific-300 px-4 py-1 bg-white">
            <Image src="/search.png" alt="Search" width={14} height={14} />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-64 p-2 bg-transparent outline-none text-cerulean-800 placeholder:text-pacific-400"
            />
          </div>

          {/* CREATE BUTTON */}
          <Link
            href="/admin/customer-invoices/new"
            className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              Create Invoice <Plus size={18} />
            </div>
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cerulean"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-cerulean text-white rounded-lg hover:bg-cerulean-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : filteredInvoices.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No invoices found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No customer invoices yet</p>
            <Link
              href="/admin/customer-invoices/new"
              className="inline-flex items-center gap-2 bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create Your First Invoice <Plus size={18} />
            </Link>
          </div>
        ) : (
          <GenericTable
            data={filteredInvoices}
            columns={columns}
            emptyMessage="No invoices found"
          />
        )}
      </div>
    </div>
  );
};

export default CustomerInvoicesListPage;
