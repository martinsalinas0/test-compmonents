"use client";

import GenericTable, { Column } from "@/components/forList/GenericTable";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Quote } from "@/lib/types/all";
import { AlertCircle, Loader2, Plus } from "lucide-react";
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
        const response = await api.get("quotes");
        setQuotes(response.data.data ?? []);
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
      render: (v) => `Q-${getLastSix(v as string)}`,
    },
    {
      header: "Job",
      accessor: "job_id",
      render: (v, quote) => (
        <Link
          href={`/admin/jobs/${quote.job_id}`}
          className="hover:text-primary font-medium"
        >
          {getLastSix(v as string)}
        </Link>
      ),
    },
    {
      header: "Customer",
      accessor: "customer_id",
      render: (v, quote) => (
        <Link
          href={`/admin/users/customers/${quote.customer_id}`}
          className="hover:text-primary font-medium"
        >
          {getLastSix(v as string)}
        </Link>
      ),
    },
    {
      header: "Quote number",
      accessor: "quote_number",
      render: (v, quote) => (
        <Link
          href={`/admin/list/financials/quotes/${quote.id}`}
          className="hover:text-primary font-medium"
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
      render: (v) => String(v).toUpperCase(),
    },
    {
      header: "Date sent",
      accessor: "sent_at",
      render: (v) =>
        v ? new Date(v as string).toLocaleDateString() : "—",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground mb-2 md:mb-0">
          Quotes
        </h1>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search quotes..."
          />

          <Link href="/admin/list/financials/quotes/new">
            <Button className="gap-2">
              <Plus size={18} />
              Create quote
            </Button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <p className="text-destructive font-medium">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4"
                variant="outline"
              >
                Retry
              </Button>
            </div>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No quotes found{searchQuery.trim() ? ` matching "${searchQuery}"` : ""}.
            </p>
            <Link href="/admin/list/financials/quotes/new">
              <Button className="gap-2">
                <Plus size={18} />
                Create your first quote
              </Button>
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
