"use client";

import GenericTable, { Column } from "@/components/forList/GenericTable";
import SearchBar from "@/components/SeachBar";
import { clientConfig } from "@/lib/config";
import { ContractorInvoice } from "@/lib/types/all";
import axios from "axios";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ContractorInvoicesList = () => {
  const [invoices, setInvoices] = useState<ContractorInvoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLastSix = (str: string) => str.slice(-6);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          `${clientConfig.apiUrl}/contractor-invoices/all`,
        );
        setInvoices(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load invoices");
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
        inv.id.toLowerCase().includes(q) ||
        inv.job_id.toLowerCase().includes(q) ||
        inv.contractor_id.toLowerCase().includes(q) ||
        inv.invoice_number.toLowerCase().includes(q) ||
        inv.status.toLowerCase().includes(q) ||
        inv.total.toString().includes(q),
    );
  }, [invoices, searchQuery]);

  const columns: Column<ContractorInvoice>[] = [
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
      header: "Contractor ID",
      accessor: "contractor_id",
      render: (v, invoice) => (
        <Link
          href={`/admin/contractors/${invoice.contractor_id}`}
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
          INV-20{String(v).slice(-7)}
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

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-cerulean mb-2 md:mb-0">
          Contractor Invoices List
        </h1>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search invoices..."
          />
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
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No invoices found matching &quot;{searchQuery}&quot;
            </p>
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

export default ContractorInvoicesList;
