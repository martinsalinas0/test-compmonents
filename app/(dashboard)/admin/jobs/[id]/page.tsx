"use client";

import { clientConfig } from "@/lib/config";
import { JobWithRelations } from "@/lib/types/jobsWithJoins";
import { ArrowLeft, Info } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SingleJobPage = () => {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<JobWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${clientConfig.apiUrl}/jobs/${jobId}`,
        );
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
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="p-6 text-center text-4xl font-extrabold text-pacific">
        Loading job details...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-destructive">Error: {error}</div>;
  }

  if (!job) {
    return <div className="p-6 text-pacific">Job not found</div>;
  }

  const formatDate = (date?: string | null) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  const formatDateTime = (date?: string | null) =>
    date ? new Date(date).toLocaleString() : "N/A";

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-8">
      {/* Top bar */}
      <div className="sticky top-0 z-10 mb-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between border-b border-border bg-card px-8 py-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 transition hover:text-primary-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <span className="text-xs text-muted-foreground">Job Details</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted">
              Change Status
            </button>
            <button className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
              More
            </button>
          </div>
        </div>
      </div>

      <header className="space-y-4">
        <h1 className="text-5xl font-bold text-primary-900">{job.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm">
          <span className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1">
            <span className="font-medium uppercase tracking-wide text-pacific-600">
              ID:
            </span>
            <span className="font-semibold text-primary-900">{job.id}</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1">
            <span className="font-medium uppercase tracking-wide text-pacific-600">
              Status:
            </span>
            <span className="font-semibold text-primary-900">
              {job.status}
            </span>
          </span>

          <span className="inline-flex items-center gap-2 rounded-md border border-olive-300 px-3 py-1">
            <span className="font-medium uppercase tracking-wide text-olive-600">
              Priority:
            </span>
            <span className="font-semibold text-primary-900">
              {job.priority}
            </span>
          </span>
        </div>
      </header>

      {job.customer && (
        <section className="rounded-lg border border-pacific-300 bg-card p-6 shadow-sm">
          <h2 className="mb-4 flex justify-between items-center text-xl font-semibold text-pacific-800">
            <span>Customer Information</span>

            <Link
              href={`/admin/customers/${job.customer_id}`}
              className=" text-primary-700 hover:underline"
              aria-label="Go to customer details"
            >
              <Info className="h-6 w-6" />
            </Link>
          </h2>

          <div className="space-y-2 text-sm text-pacific-700">
            <p>
              <span className="font-medium text-pacific-900">Name:</span>{" "}
              {job.customer.first_name} {job.customer.last_name}
            </p>
            {job.customer.email && (
              <p>
                <span className="font-medium text-pacific-900">Email:</span>{" "}
                {job.customer.email}
              </p>
            )}
            {job.customer.phone && (
              <p>
                <span className="font-medium text-pacific-900">Phone:</span>{" "}
                {job.customer.phone}
              </p>
            )}
          </div>
        </section>
      )}

      {job.contractor && (
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 flex justify-between items-center text-xl font-semibold text-pacific-800">
            <span>Contractor Information</span>

            <Link
              href={`/admin/contractors/${job.customer.id}`}
              className=" text-primary-700 hover:underline"
              aria-label="Go to customer details"
            >
              <Info className="h-6 w-6" />
            </Link>
          </h2>
          <div className="space-y-2 text-sm text-primary-700">
            <p>
              <span className="font-medium text-primary-900">Name:</span>{" "}
              {job.contractor.first_name} {job.contractor.last_name}
            </p>
            {job.contractor.company_name && (
              <p>
                <span className="font-medium text-primary-900">Company:</span>{" "}
                {job.contractor.company_name}
              </p>
            )}
            {job.contractor.email && (
              <p>
                <span className="font-medium text-primary-900">Email:</span>{" "}
                {job.contractor.email}
              </p>
            )}
            {job.contractor.phone && (
              <p>
                <span className="font-medium text-primary-900">Phone:</span>{" "}
                {job.contractor.phone}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="border-b border-border pb-1 text-lg font-semibold text-foreground">
          Description
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          {job.description}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="border-b border-border pb-1 text-lg font-semibold text-foreground">
          Location
        </h2>
        <p className="text-sm text-muted-foreground">{job.address}</p>
        <p className="text-sm text-muted-foreground">
          {job.city}, {job.state} {job.zip_code}
        </p>
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Schedule</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-pacific-600">Date:</span>{" "}
              {formatDate(job.scheduled_date)}
            </p>
            <p>
              <span className="text-pacific-600">Time:</span>{" "}
              {job.scheduled_time || "N/A"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            Work Details
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-pacific-600">Pay Type:</span>{" "}
              {job.pay_type || "N/A"}
            </p>
            <p>
              <span className="text-pacific-600">Hours Worked:</span>{" "}
              {job.hours_worked ?? "N/A"}
            </p>
            {job.started_at && (
              <p>
                <span className="text-pacific-600">Started:</span>{" "}
                {formatDateTime(job.started_at)}
              </p>
            )}
            {job.completed_at && (
              <p>
                <span className="text-pacific-600">Completed:</span>{" "}
                {formatDateTime(job.completed_at)}
              </p>
            )}
          </div>
        </div>
      </section>

      {job.cancelled_at && (
        <section className="rounded-lg border border-yarrow-300 bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-yarrow-800">
            Cancellation Details
          </h2>
          <div className="space-y-2 text-sm text-yarrow-700">
            <p>
              <span className="font-medium text-yarrow-900">Cancelled At:</span>{" "}
              {formatDateTime(job.cancelled_at)}
            </p>
            <p>
              <span className="font-medium text-yarrow-900">Cancelled By:</span>{" "}
              {job.cancelled_by}
            </p>
            {job.cancellation_reason && (
              <p>
                <span className="font-medium text-yarrow-900">Reason:</span>{" "}
                {job.cancellation_reason}
              </p>
            )}
          </div>
        </section>
      )}

      <footer className="space-y-1 border-t border-border pt-6 text-xs text-muted-foreground">
        <p>
          Created {formatDateTime(job.created_at)} by {job.created_by}
        </p>
        <p>Last updated {formatDateTime(job.updated_at)}</p>
      </footer>
    </div>
  );
};

export default SingleJobPage;
