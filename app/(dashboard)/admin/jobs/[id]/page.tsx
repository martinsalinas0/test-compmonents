"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";
import type { Contractor } from "@/lib/types/contractor";
import type { CustomerInvoice, Payment, Quote } from "@/lib/types/all";
import { JobStatus } from "@/lib/types/enums";
import { JobWithRelations } from "@/lib/types/jobsWithJoins";
import { ChevronDown, DollarSign, FileText, Info, Pencil, UserPlus } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const JOB_STATUSES: JobStatus[] = [
  "open",
  "needs_quote",
  "quote_pending",
  "quote_rejected",
  "approved",
  "in_progress",
  "completed",
  "paid",
  "cancelled",
];

const SingleJobPage = () => {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<JobWithRelations | null>(null);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchJob = useCallback(async () => {
    if (!jobId) return;
    try {
      const res = await api.get(`jobs/${jobId}`);
      setJob(res.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (!jobId) return;
    setLoading(true);
    setError(null);
    fetchJob();
  }, [jobId, fetchJob]);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const res = await api.get("contractors/getAllContractors");
        setContractors(res.data.data ?? []);
      } catch {
        setContractors([]);
      }
    };
    fetchContractors();
  }, []);

  useEffect(() => {
    if (!jobId) return;
    const fetchQuotesAndPayments = async () => {
      try {
        const [quotesRes, invoicesRes, paymentsRes] = await Promise.all([
          api.get("quotes").catch(() => ({ data: { data: [] } })),
          api.get("customer-invoices/").catch(() => ({ data: { data: [] } })),
          api.get("payments/all").catch(() => ({ data: { data: [] } })),
        ]);
        const allQuotes = (quotesRes.data?.data ?? []) as Quote[];
        const allInvoices = (invoicesRes.data?.data ?? []) as CustomerInvoice[];
        const allPayments = (paymentsRes.data?.data ?? []) as Payment[];
        setQuotes(allQuotes.filter((q) => q.job_id === jobId));
        const jobInvoiceIds = new Set(
          allInvoices.filter((inv) => inv.job_id === jobId).map((inv) => inv.id)
        );
        setPayments(allPayments.filter((p) => jobInvoiceIds.has(p.customer_invoice_id)));
      } catch {
        setQuotes([]);
        setPayments([]);
      }
    };
    fetchQuotesAndPayments();
  }, [jobId]);

  const handleStatusChange = async (newStatus: JobStatus) => {
    if (!jobId || !job) return;
    setUpdating(true);
    try {
      await api.patch(`jobs/update/${jobId}`, {
        status: newStatus,
      });
      setJob((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleContractorChange = async (contractorId: string | null) => {
    if (!jobId || !job) return;
    setUpdating(true);
    try {
      await api.patch(`jobs/update/${jobId}`, {
        contractor_id: contractorId,
      });
      if (contractorId) {
        const contractor = contractors.find((c) => c.id === contractorId);
        setJob((prev) =>
          prev && contractor
            ? {
                ...prev,
                contractor_id: contractorId,
                contractor: {
                  id: contractor.id,
                  first_name: contractor.first_name,
                  last_name: contractor.last_name,
                  email: contractor.email,
                  phone: contractor.phone ?? null,
                  company_name: contractor.company_name ?? "",
                },
              }
            : prev,
        );
      } else {
        setJob((prev) =>
          prev ? { ...prev, contractor_id: null, contractor: null } : null,
        );
      }
    } catch (err) {
      console.error("Failed to assign contractor:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-muted/30 px-4">
        <p className="text-lg font-medium text-muted-foreground">
          Loading job details…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-muted/30 px-4">
        <div className="text-center">
          <p className="text-lg font-medium text-destructive">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-muted/30 px-4">
        <p className="text-lg font-medium text-muted-foreground">
          Job not found
        </p>
      </div>
    );
  }

  const formatDate = (date?: string | null) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  const formatDateTime = (date?: string | null) =>
    date ? new Date(date).toLocaleString() : "N/A";

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-10 -mx-4 border-b border-border bg-card px-4 py-3 shadow-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/list/jobs"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                All Jobs
              </Link>

              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm font-medium bg-cerulean-100 rounded px-2 py-1 text-cerulean-800 transition-colors hover:bg-cerulean-200"
              >
                Back
              </button>

              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground font-medium">
                {job.title}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updating}
                    className="min-w-36tify-between font-medium"
                  >
                    <span className="capitalize">
                      {job.status.replace(/_/g, " ")}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[11rem]">
                  <DropdownMenuLabel>Change status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {JOB_STATUSES.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => handleStatusChange(status)}
                    >
                      <span className="capitalize">
                        {status.replace(/_/g, " ")}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Contractor Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updating}
                    className="min-w-36 justify-between font-medium"
                  >
                    {job.contractor ? (
                      <span className="truncate">
                        {job.contractor.first_name} {job.contractor.last_name}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <UserPlus className="h-4 w-4 shrink-0" />
                        Assign contractor
                      </span>
                    )}
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="max-h-72 min-w-56 overflow-y-auto"
                >
                  <DropdownMenuLabel>Assign contractor</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleContractorChange(null)}
                  >
                    <span className="text-muted-foreground">Unassign</span>
                  </DropdownMenuItem>
                  {contractors.map((c) => (
                    <DropdownMenuItem
                      key={c.id}
                      onClick={() => handleContractorChange(c.id)}
                    >
                      <span className="truncate">
                        {c.first_name} {c.last_name}
                        {c.company_name ? ` · ${c.company_name}` : ""}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href={`/admin/jobs/${jobId}/edit`}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>
            </div>
          </div>
        </div>

        <header className="mt-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 rounded">
              <span className="font-medium uppercase tracking-wider text-muted-foreground">
                ID
              </span>
              <span className="font-mono text-foreground">
                {job.id.slice(-8)}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 rounded">
              <span className="font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </span>
              <span className="capitalize text-foreground">
                {job.status.replace(/_/g, " ")}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 rounded">
              <span className="font-medium uppercase tracking-wider text-muted-foreground">
                Priority
              </span>
              <span className="capitalize text-foreground">{job.priority}</span>
            </span>
          </div>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section>
            <h2 className="mb-3 border-l-4 border-pacific-500 pl-3 text-lg font-semibold text-foreground">
              Customer
            </h2>
            <div className="border border-border bg-card p-5 rounded-lg relative">
              <Link
                href={`/admin/users/customers/${job.customer_id}`}
                className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Go to customer details"
              >
                <Info className="h-5 w-5" />
              </Link>
              <dl className="space-y-2.5 text-sm pr-8">
                <div>
                  <dt className="font-medium text-muted-foreground">Name</dt>
                  <dd className="mt-0.5 text-foreground">
                    {job.customer.first_name} {job.customer.last_name}
                  </dd>
                </div>
                {job.customer.email && (
                  <div>
                    <dt className="font-medium text-muted-foreground">Email</dt>
                    <dd className="mt-0.5 text-foreground">
                      {job.customer.email}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium text-muted-foreground">Phone</dt>
                  <dd className="mt-0.5 text-foreground">
                    {job.customer.phone ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Address</dt>
                  <dd className="mt-0.5 text-foreground">
                    {job.customer.address}, {job.customer.city},{" "}
                    {job.customer.state} {job.customer.zip_code}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <h2 className="mb-3 border-l-4 border-pacific-500 pl-3 text-lg font-semibold text-foreground">
              Contractor
            </h2>
            {job.contractor ? (
              <div className="border border-border bg-card p-5 rounded-lg relative">
                <Link
                  href={`/admin/users/contractors/${job.contractor.id}`}
                  className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Go to contractor details"
                >
                  <Info className="h-5 w-5" />
                </Link>
                <dl className="space-y-2.5 text-sm pr-8">
                  <div>
                    <dt className="font-medium text-muted-foreground">Name</dt>
                    <dd className="mt-0.5 text-foreground">
                      {job.contractor.first_name} {job.contractor.last_name}
                    </dd>
                  </div>
                  {job.contractor.company_name && (
                    <div>
                      <dt className="font-medium text-muted-foreground">
                        Company
                      </dt>
                      <dd className="mt-0.5 text-foreground">
                        {job.contractor.company_name}
                      </dd>
                    </div>
                  )}
                  {job.contractor.email && (
                    <div>
                      <dt className="font-medium text-muted-foreground">
                        Email
                      </dt>
                      <dd className="mt-0.5 text-foreground">
                        {job.contractor.email}
                      </dd>
                    </div>
                  )}
                  {job.contractor.phone && (
                    <div>
                      <dt className="font-medium text-muted-foreground">
                        Phone
                      </dt>
                      <dd className="mt-0.5 text-foreground">
                        {job.contractor.phone}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            ) : (
              <div className="border border-border border-dashed bg-card p-5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  No contractor assigned. Use the dropdown above to assign one.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Description & Location */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <section>
            <h2 className="mb-3 border-l-4 border-border pl-3 text-lg font-semibold text-foreground">
              Description
            </h2>
            <div className="border border-border bg-card p-5 rounded-lg">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {job.description}
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 border-l-4 border-border pl-3 text-lg font-semibold text-foreground">
              Location
            </h2>
            <div className="border border-border bg-card p-5 rounded-lg">
              <p className="text-sm text-muted-foreground">{job.address}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.city}, {job.state} {job.zip_code}
              </p>
            </div>
          </section>
        </div>

        {/* Schedule & Work details */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <section>
            <h2 className="mb-3 border-l-4 border-border pl-3 text-lg font-semibold text-foreground">
              Schedule
            </h2>
            <div className="border border-border bg-card p-5 rounded-lg">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="text-foreground">
                    {formatDate(job.scheduled_date)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Time</dt>
                  <dd className="text-foreground">
                    {job.scheduled_time || "N/A"}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <h2 className="mb-3 border-l-4 border-border pl-3 text-lg font-semibold text-foreground">
              Work details
            </h2>
            <div className="border border-border bg-card p-5 rounded-lg">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Pay type</dt>
                  <dd className="text-foreground">{job.pay_type || "N/A"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Hours worked</dt>
                  <dd className="text-foreground">
                    {job.hours_worked ?? "N/A"}
                  </dd>
                </div>
                {job.started_at && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Started</dt>
                    <dd className="text-foreground">
                      {formatDateTime(job.started_at)}
                    </dd>
                  </div>
                )}
                {job.completed_at && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Completed</dt>
                    <dd className="text-foreground">
                      {formatDateTime(job.completed_at)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </section>
        </div>

        {/* Quotes & Payments */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section>
            <h2 className="mb-3 border-l-4 border-pacific-500 pl-3 text-lg font-semibold text-foreground flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quotes
              </span>
              <Link
                href="/admin/list/financials/quotes/new"
                className="text-sm font-medium text-primary hover:underline"
              >
                Create quote
              </Link>
            </h2>
            <div className="border border-border bg-card p-5 rounded-lg">
              {quotes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No quotes for this job.
                </p>
              ) : (
                <ul className="space-y-3">
                  {quotes.map((q) => (
                    <li key={q.id} className="flex items-center justify-between gap-2 text-sm">
                      <Link
                        href={`/admin/list/financials/quotes/${q.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {q.quote_number}
                      </Link>
                      <span className="text-muted-foreground capitalize">
                        {String(q.status).replace(/_/g, " ")}
                      </span>
                      <span className="font-medium text-foreground">
                        ${Number(q.total).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {quotes.length > 0 && (
                <Link
                  href="/admin/list/financials/quotes"
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                >
                  View all quotes
                </Link>
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-3 border-l-4 border-pacific-500 pl-3 text-lg font-semibold text-foreground flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payments
              </span>
              <Link
                href="/admin/list/financials/payments"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all payments
              </Link>
            </h2>
            <div className="border border-border bg-card p-5 rounded-lg">
              {payments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No payments for this job yet.
                </p>
              ) : (
                <ul className="space-y-3">
                  {payments.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-2 text-sm">
                      <Link
                        href={`/admin/financials/invoices/customers/${p.customer_invoice_id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        Invoice {String(p.customer_invoice_id).slice(-8)}
                      </Link>
                      <span className="text-muted-foreground capitalize">
                        {String(p.status).replace(/_/g, " ")}
                      </span>
                      <span className="font-medium text-foreground">
                        ${Number(p.amount).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        {job.cancelled_at && (
          <section className="mt-10">
            <h2 className="mb-3 border-l-4 border-destructive pl-3 text-lg font-semibold text-destructive">
              Cancellation
            </h2>
            <div className="border border-destructive/30 bg-card p-5 rounded-lg">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-muted-foreground">
                    Cancelled at
                  </dt>
                  <dd className="text-foreground">
                    {formatDateTime(job.cancelled_at)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-muted-foreground">
                    Cancelled by
                  </dt>
                  <dd className="text-foreground">{job.cancelled_by ?? "—"}</dd>
                </div>
                {job.cancellation_reason && (
                  <div>
                    <dt className="font-medium text-muted-foreground">
                      Reason
                    </dt>
                    <dd className="mt-1 text-foreground">
                      {job.cancellation_reason}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </section>
        )}

        <footer className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            Created {formatDateTime(job.created_at)} by {job.created_by}
          </p>
          <p className="mt-1">Last updated {formatDateTime(job.updated_at)}</p>
        </footer>
      </div>
    </div>
  );
};

export default SingleJobPage;
