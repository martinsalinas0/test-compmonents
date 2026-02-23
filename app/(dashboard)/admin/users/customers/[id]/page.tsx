"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import type { Customer, Job } from "@/lib/types/all";
import axios from "axios";
import { format } from "date-fns";
import { Loader2, Pencil, ArrowLeft, Briefcase } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CustomerWithExtras = Customer & {
  payments?: {
    id: string;
    product: string;
    status: string;
    date: string;
    amount: string;
  }[];
};

function formatBilling(customer: Customer): string {
  if (
    customer.billing_address ||
    customer.billing_city ||
    customer.billing_state ||
    customer.billing_zip
  ) {
    const parts = [
      customer.billing_address,
      [customer.billing_city, customer.billing_state, customer.billing_zip]
        .filter(Boolean)
        .join(", "),
      customer.billing_zip,
    ].filter(Boolean);
    return parts.join("\n") || "Not set";
  }
  return "Not set";
}

const SingleCustomerPage = () => {
  const params = useParams();
  const customerID = params?.id as string;

  const [customer, setCustomer] = useState<CustomerWithExtras | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerID) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [customerResponse, jobsResponse] = await Promise.all([
          api.get(`customers/${customerID}`),
          api.get("jobs/all")
            .catch(() => ({ data: { data: [] } })),
        ]);
        setCustomer(customerResponse.data.data);
        const allJobs = (jobsResponse.data?.data ?? []) as Job[];
        setJobs(allJobs.filter((j) => j.customer_id === customerID));
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

    fetchData();
  }, [customerID]);

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
            <Link href="/admin/list/customers">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to customer
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!customer) return null;

  const initials = [customer.first_name, customer.last_name]
    .map((n) => n?.charAt(0) ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const fullName = `${customer.first_name} ${customer.last_name}`.trim();

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{fullName}</h1>
          <p className="text-muted-foreground mt-1">Customer profile</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/users/customers/edit/${customerID}`}>
            <Button className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit customer
            </Button>
          </Link>
          <Link href="/admin/list/customers">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to list
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="sr-only">Profile</CardTitle>
              <CardDescription className="sr-only">Customer summary</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-lg font-medium text-muted-foreground">
                  {initials || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">{fullName}</h2>
                <p className="text-sm text-muted-foreground">Customer</p>
              </div>
              <div className="w-full space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <a
                    href={`mailto:${customer.email}`}
                    className="font-medium text-primary hover:underline truncate max-w-[180px]"
                  >
                    {customer.email}
                  </a>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Phone: </span>
                  <span className="font-medium text-foreground">
                    {customer.phone ?? "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Customer ID</span>
                  <span className="font-mono text-foreground text-xs">
                    {customer.id.slice(-8)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Internal notes for this customer</CardDescription>
            </CardHeader>
            <CardContent>
              {customer.notes ? (
                <p className="rounded-md bg-muted px-3 py-2 text-sm text-foreground">
                  {customer.notes}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No notes</p>
              )}
            </CardContent>
          </Card>
        </div>


        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact & address</CardTitle>
              <CardDescription>Primary and billing address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Email
                </h4>
                <a
                  href={`mailto:${customer.email}`}
                  className="text-sm text-primary hover:underline"
                >
                  {customer.email}
                </a>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Phone
                </h4>
                <p className="text-sm text-foreground">
                  {customer.phone ?? "Not provided"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Address
                </h4>
                <p className="text-sm text-foreground whitespace-pre-line">
                  {customer.address}
                  {"\n"}
                  {customer.city}, {customer.state} {customer.zip_code}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Billing address
                </h4>
                <p className="text-sm text-foreground whitespace-pre-line">
                  {formatBilling(customer)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction history</CardTitle>
              <CardDescription>Payments and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="p-3 font-medium text-foreground">Product</th>
                      <th className="p-3 font-medium text-foreground">Status</th>
                      <th className="p-3 font-medium text-foreground">Date</th>
                      <th className="p-3 font-medium text-foreground">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.transactions && customer.transactions.length > 0 ? (
                      customer.transactions.map((t) => (
                        <tr
                          key={t.id}
                          className="border-b border-border last:border-0"
                        >
                          <td className="p-3 text-foreground">{t.product}</td>
                          <td className="p-3 text-muted-foreground">{t.status}</td>
                          <td className="p-3 text-muted-foreground">{t.date}</td>
                          <td className="p-3 text-foreground">{t.amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="p-6 text-center text-muted-foreground"
                          colSpan={4}
                        >
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Jobs
              </CardTitle>
              <CardDescription>
                Jobs linked to this customer
              </CardDescription>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No jobs yet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {jobs.map((job) => (
                    <li key={job.id}>
                      <Link
                        href={`/admin/jobs/${job.id}`}
                        className="flex items-center justify-between rounded-lg border border-border px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <span className="font-medium truncate flex-1">
                          {job.title}
                        </span>
                        <span className="text-sm text-muted-foreground shrink-0 ml-2">
                          {format(new Date(job.created_at), "MMM d, yyyy")} · {job.status}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/admin/list/jobs"
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                View all jobs
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleCustomerPage;
