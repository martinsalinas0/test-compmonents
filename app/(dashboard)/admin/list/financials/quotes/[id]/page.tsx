"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { clientConfig } from "@/lib/config";
import type { Quote } from "@/lib/types/all";
import axios from "axios";
import { format } from "date-fns";
import { ArrowLeft, FileText, Loader2, DollarSign, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const api = clientConfig.apiUrl;

export default function QuoteDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchQuote = async () => {
      setLoading(true);
      setError(null);
      try {
        try {
          const res = await axios.get(`${api}/quotes/${id}`);
          setQuote(res.data.data);
        } catch (singleErr) {
          const listRes = await axios.get(`${api}/quotes`);
          const list = (listRes.data?.data ?? []) as Quote[];
          const found = list.find((q) => q.id === id);
          if (found) setQuote(found);
          else throw singleErr;
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load quote");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/list/financials/quotes">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to quotes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!quote) return null;

  const formatDate = (d: Date | string | null) =>
    d ? format(new Date(d), "MMM d, yyyy") : "—";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Quote {quote.quote_number}
          </h1>
          <p className="text-muted-foreground mt-1">
            Q-{quote.id.slice(-8)} · {String(quote.status)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/list/financials/quotes/edit/${id}`}>
            <Button className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit quote
            </Button>
          </Link>
          <Link href="/admin/list/financials/quotes">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to quotes
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Summary
              </CardTitle>
              <CardDescription>Quote overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quote number</span>
                <span className="font-medium text-foreground">{quote.quote_number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-foreground capitalize">{quote.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-foreground">
                  ${Number(quote.total).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valid until</span>
                <span className="font-medium text-foreground">{formatDate(quote.valid_until)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sent</span>
                <span className="font-medium text-foreground">{formatDate(quote.sent_at)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Responded</span>
                <span className="font-medium text-foreground">{formatDate(quote.responded_at)}</span>
              </div>
              <div className="pt-3 border-t border-border space-y-2">
                <Link
                  href={`/admin/jobs/${quote.job_id}`}
                  className="block text-sm font-medium text-primary hover:underline"
                >
                  View job
                </Link>
                <Link
                  href={`/admin/users/customers/${quote.customer_id}`}
                  className="block text-sm font-medium text-primary hover:underline"
                >
                  View customer
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Amounts
              </CardTitle>
              <CardDescription>Pricing breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${Number(quote.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax rate</span>
                  <span className="font-medium">
                    {quote.tax_rate != null ? `${quote.tax_rate}%` : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax amount</span>
                  <span className="font-medium">
                    {quote.tax_amount != null
                      ? `$${Number(quote.tax_amount).toFixed(2)}`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hourly rate</span>
                  <span className="font-medium">
                    {quote.hourly_rate != null
                      ? `$${Number(quote.hourly_rate).toFixed(2)}/hr`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated hours</span>
                  <span className="font-medium">
                    {quote.estimated_hours != null ? quote.estimated_hours : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Flat amount</span>
                  <span className="font-medium">
                    {quote.flat_amount != null
                      ? `$${Number(quote.flat_amount).toFixed(2)}`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Materials cost</span>
                  <span className="font-medium">
                    {quote.materials_cost != null
                      ? `$${Number(quote.materials_cost).toFixed(2)}`
                      : "—"}
                  </span>
                </div>
                <div className="sm:col-span-2 flex justify-between text-base font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${Number(quote.total).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {(quote.description || quote.terms || quote.rejection_reason) && (
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>Description, terms, and notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quote.description && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Description
                    </h4>
                    <p className="text-sm text-foreground whitespace-pre-line">
                      {quote.description}
                    </p>
                  </div>
                )}
                {quote.terms && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Terms
                    </h4>
                    <p className="text-sm text-foreground whitespace-pre-line">
                      {quote.terms}
                    </p>
                  </div>
                )}
                {quote.rejection_reason && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Rejection reason
                    </h4>
                    <p className="text-sm text-foreground whitespace-pre-line">
                      {quote.rejection_reason}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
