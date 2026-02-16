"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clientConfig } from "@/lib/config";
import type { Job } from "@/lib/types/all";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const optionalNum = z.preprocess(
  (v) => (v === "" || v === undefined ? undefined : v),
  z.coerce.number().min(0).optional()
);

const newQuoteSchema = z.object({
  job_id: z.string().min(1, "Job is required"),
  status: z.enum(["draft", "sent", "approved", "rejected", "expired"]),
  description: z.string().max(2000).optional(),
  terms: z.string().max(2000).optional(),
  valid_until: z.string().optional(),
  hourly_rate: z.coerce.number().min(0, "Must be 0 or more"),
  estimated_hours: optionalNum,
  flat_amount: optionalNum,
  materials_cost: optionalNum,
  subtotal: z.coerce.number().min(0, "Subtotal must be 0 or more"),
  tax_rate: optionalNum,
  tax_amount: optionalNum,
  total: z.coerce.number().min(0, "Total must be 0 or more"),
});

type NewQuoteFormData = z.infer<typeof newQuoteSchema>;

export default function NewQuotePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<NewQuoteFormData>({
    resolver: zodResolver(newQuoteSchema),
    defaultValues: {
      status: "draft",
      hourly_rate: 0,
      subtotal: 0,
      total: 0,
      estimated_hours: "",
      flat_amount: "",
      materials_cost: "",
      tax_rate: "",
      tax_amount: "",
    },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${clientConfig.apiUrl}/jobs/all`).catch(() => ({ data: { data: [] } }));
        setJobs((res.data?.data ?? []) as Job[]);
      } catch {
        setJobs([]);
      } finally {
        setJobsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const onSubmit = async (data: NewQuoteFormData) => {
    const job = jobs.find((j) => j.id === data.job_id);
    const customer_id = job?.customer_id ?? "";

    try {
      const payload = {
        job_id: data.job_id,
        customer_id,
        status: data.status,
        description: data.description || null,
        terms: data.terms || null,
        valid_until: data.valid_until || null,
        hourly_rate: data.hourly_rate,
        estimated_hours: data.estimated_hours ?? null,
        flat_amount: data.flat_amount ?? null,
        materials_cost: data.materials_cost ?? null,
        subtotal: data.subtotal,
        tax_rate: data.tax_rate ?? null,
        tax_amount: data.tax_amount ?? null,
        total: data.total,
      };
      const res = await axios.post(`${clientConfig.apiUrl}/quotes`, payload);
      const created = res.data?.data;
      if (created?.id) {
        router.push(`/admin/list/financials/quotes/${created.id}`);
      } else {
        router.push("/admin/list/financials/quotes");
      }
    } catch (err) {
      console.error("Error creating quote:", err);
      if (axios.isAxiosError(err)) {
        setError("root", {
          message: err.response?.data?.message ?? "Failed to create quote",
        });
      } else {
        setError("root", { message: "Failed to create quote" });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">New quote</h1>
          <p className="text-muted-foreground mt-1">Create a quote for a job</p>
        </div>
        <Link href="/admin/list/financials/quotes">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quote details</CardTitle>
          <CardDescription>
            Select a job and enter amounts. Customer is set from the selected job.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.root && (
            <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Job <span className="text-destructive">*</span>
              </label>
              <select
                {...register("job_id")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={jobsLoading}
              >
                <option value="">
                  {jobsLoading ? "Loading jobs..." : "Select a job"}
                </option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} ({job.id.slice(-6)})
                  </option>
                ))}
              </select>
              {errors.job_id && (
                <p className="text-destructive text-sm mt-1">{errors.job_id.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Status</label>
              <select
                {...register("status")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Terms</label>
              <textarea
                {...register("terms")}
                rows={2}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Valid until
              </label>
              <Input type="date" {...register("valid_until")} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                Amounts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Hourly rate
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    {...register("hourly_rate")}
                    className={errors.hourly_rate ? "border-destructive" : ""}
                  />
                  {errors.hourly_rate && (
                    <p className="text-destructive text-sm mt-1">{errors.hourly_rate.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Estimated hours
                  </label>
                  <Input type="number" step="0.5" min={0} {...register("estimated_hours")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Flat amount
                  </label>
                  <Input type="number" step="0.01" min={0} {...register("flat_amount")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Materials cost
                  </label>
                  <Input type="number" step="0.01" min={0} {...register("materials_cost")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Subtotal <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    {...register("subtotal")}
                    className={errors.subtotal ? "border-destructive" : ""}
                  />
                  {errors.subtotal && (
                    <p className="text-destructive text-sm mt-1">{errors.subtotal.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Tax rate (%)
                  </label>
                  <Input type="number" step="0.01" min={0} {...register("tax_rate")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Tax amount
                  </label>
                  <Input type="number" step="0.01" min={0} {...register("tax_amount")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Total <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    {...register("total")}
                    className={errors.total ? "border-destructive" : ""}
                  />
                  {errors.total && (
                    <p className="text-destructive text-sm mt-1">{errors.total.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
              <Link href="/admin/list/financials/quotes">
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create quote"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
