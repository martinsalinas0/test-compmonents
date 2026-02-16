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
import { clientConfig } from "@/lib/config";
import type { Contractor, Job } from "@/lib/types/all";
import axios from "axios";
import { format } from "date-fns";
import { Loader2, Pencil, ArrowLeft, Briefcase, Building2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function formatAddress(c: Contractor): string {
  const parts = [
    c.address,
    [c.city, c.state, c.zip_code].filter(Boolean).join(", "),
  ].filter(Boolean);
  return parts.length ? parts.join("\n") : "Not set";
}

const SingleContractorPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [contractor, setContractor] = useState<Contractor | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [contractorRes, jobsRes] = await Promise.all([
          axios.get(`${clientConfig.apiUrl}/contractors/${id}`),
          axios.get(`${clientConfig.apiUrl}/jobs/all`).catch(() => ({ data: { data: [] } })),
        ]);
        setContractor(contractorRes.data.data);
        const allJobs = (jobsRes.data?.data ?? []) as Job[];
        setJobs(allJobs.filter((j) => j.contractor_id === id));
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
            <Link href="/admin/list/contractors">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to contractors
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!contractor) return null;

  const initials = [contractor.first_name, contractor.last_name]
    .map((n) => n?.charAt(0) ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const fullName = `${contractor.first_name} ${contractor.last_name}`.trim();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{fullName}</h1>
          <p className="text-muted-foreground mt-1">Contractor profile</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/users/contractors/edit/${id}`}>
            <Button className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit contractor
            </Button>
          </Link>
          <Link href="/admin/list/contractors">
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
              <CardDescription className="sr-only">Contractor summary</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-lg font-medium text-muted-foreground">
                  {initials || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">{fullName}</h2>
                {contractor.company_name && (
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {contractor.company_name}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">Contractor</p>
              </div>
              <div className="w-full space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <a
                    href={`mailto:${contractor.email}`}
                    className="font-medium text-primary hover:underline truncate max-w-[180px]"
                  >
                    {contractor.email}
                  </a>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium text-foreground">
                    {contractor.phone ?? "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Contractor ID</span>
                  <span className="font-mono text-foreground text-xs">
                    {contractor.id.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-foreground">
                    {contractor.is_active ? "Active" : "Inactive"}
                    {contractor.is_verified && " · Verified"}
                  </span>
                </div>
              </div>
              {contractor.phone && (
                <a
                  href={`tel:${contractor.phone}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Call {contractor.first_name}
                </a>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rates</CardTitle>
              <CardDescription>Hourly and flat rate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hourly rate</span>
                <span className="font-medium text-foreground">
                  ${Number(contractor.hourly_rate).toFixed(2)}/hr
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Flat rate</span>
                <span className="font-medium text-foreground">
                  ${Number(contractor.flat_rate).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact & address</CardTitle>
              <CardDescription>Contact details and location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                <a
                  href={`mailto:${contractor.email}`}
                  className="text-sm text-primary hover:underline"
                >
                  {contractor.email}
                </a>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
                <p className="text-sm text-foreground">
                  {contractor.phone ?? "Not provided"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Address</h4>
                <p className="text-sm text-foreground whitespace-pre-line">
                  {formatAddress(contractor)}
                </p>
              </div>
              {contractor.tax_id && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Tax ID</h4>
                  <p className="text-sm text-foreground font-mono">{contractor.tax_id}</p>
                </div>
              )}
              {contractor.insurance_info && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Insurance
                  </h4>
                  <p className="text-sm text-foreground">{contractor.insurance_info}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Jobs
              </CardTitle>
              <CardDescription>Jobs assigned to this contractor</CardDescription>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No jobs assigned yet.</p>
              ) : (
                <ul className="space-y-2">
                  {jobs.map((job) => (
                    <li key={job.id}>
                      <Link
                        href={`/admin/jobs/${job.id}`}
                        className="flex items-center justify-between rounded-lg border border-border px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <span className="font-medium truncate flex-1">{job.title}</span>
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

export default SingleContractorPage;
