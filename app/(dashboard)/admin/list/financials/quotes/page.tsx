"use client";

import GenericTable, { Column } from "@/components/forList/GenericTable";
import SearchBar from "@/components/SeachBar";
import { clientConfig } from "@/lib/config";
import { Quote } from "@/lib/types/all";
import axios from "axios";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const QuotesListPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLastSix = (str: string) => str.slice(-6);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${clientConfig.apiUrl}/quotes`);
        setQuotes(response.data.data);
        console.log(response.data.data);
        console.log(Object.keys(response.data)[0]);
      } catch (error) {
        console.error(error);
        setError("Failed to load quotes");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const filteredQuotes = useMemo(() => {
    if (!searchQuery.trim()) return quotes;

    const q = searchQuery.toLowerCase();
    return quotes.filter(
      (quote) =>
        quote.id.toLowerCase().includes(q) ||
        quote.job_id.toLowerCase().includes(q) ||
        quote.customer_id.toLowerCase().includes(q) ||
        quote.quote_number.toLowerCase().includes(q) ||
        quote.status.toLowerCase().includes(q) ||
        quote.total.toString().includes(q),
    );
  }, [quotes, searchQuery]);

  const columns: Column<Quote>[] = [
    {
      header: "ID",
      accessor: "id",
      render: (v) => `C-${getLastSix(v as string)}`,
    },
    {
      header: "Job ID",
      accessor: "job_id",
      render: (v, quote) => (
        <Link
          href={`/admin/jobs/${quote.job_id}`}
          className="hover:text-blue-500"
        >
          F-{getLastSix(v as string)}
        </Link>
      ),
    },
    {
      header: "Customer ID",
      accessor: "customer_id",
      render: (v, quote) => (
        <Link
          href={`/admin/customers/${quote.customer_id}`}
          className="hover:text-blue-500"
        >
          C-{getLastSix(v as string)}
        </Link>
      ),
    },
    {
      header: "quote Number",
      accessor: "quote_number",
      render: (v, quote) => (
        <Link
          href={`/admin/financials/quotes/${quote.quote_number}`}
          className="hover:text-blue-500"
        >
          QT-20{String(v).slice(-7)}
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
      header: "Date Sent",
      accessor: "sent_at",
      render: (v) => new Date(v as string).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-cerulean mb-2 md:mb-0">
          Customer quotes List
        </h1>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search quotes..."
          />

          <Link
            href="/admin/financials/quotes/new"
            className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              Create quote <Plus size={18} />
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
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No quotes found matching &quot;{searchQuery}&quot;
            </p>
            <Link
              href="/admin/financials/quotes/new"
              className="inline-flex items-center gap-2 bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create Your First quote <Plus size={18} />
            </Link>
          </div>
        ) : (
          <GenericTable
            data={filteredQuotes}
            columns={columns}
            emptyMessage="No quotes found"
          />
        )}
      </div>
    </div>
  );
};

export default QuotesListPage;
