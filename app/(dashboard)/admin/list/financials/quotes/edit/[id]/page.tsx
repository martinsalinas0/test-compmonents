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
import api from "@/lib/api";
import type { Job, Quote } from "@/lib/types/all";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const optionalNum = z.preprocess(
  (v) => (v === "" || v === undefined ? undefined : v),
  z.coerce.number().min(0).optional()
);

const editQuoteSchema = z.object({
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

type EditQuoteFormData = z.infer<typeof editQuoteSchema>;

function toFormValue(q: Quote): EditQuoteFormData {
  const validUntil = q.valid_until
    ? new Date(q.valid_until).toISOString().slice(0, 10)
    : "";
  return {
    job_id: q.job_id ?? "",
    status: q.status ?? "draft",
    description: q.description ?? "",
    terms: q.terms ?? "",
    valid_until: validUntil,
    hourly_rate: Number(q.hourly_rate) ?? 0,
    estimated_hours: q.estimated_hours ?? "",
    flat_amount: q.flat_amount ?? "",
    materials_cost: q.materials_cost ?? "",
    subtotal: Number(q.subtotal) ?? 0,
    tax_rate: q.tax_rate ?? "",
    tax_amount: q.tax_amount ?? "",
    total: Number(q.total) ?? 0,
  };
}

export default function EditQuotePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditQuoteFormData>({
    resolver: zodResolver(editQuoteSchema),
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [quoteRes, jobsRes] = await Promise.all([
          api.get(`quotes/${id}`).catch(() => null),
          api.get("jobs/all").catch(() => ({ data: { data: [] } })),
        ]);

        setJobs((jobsRes.data?.data ?? []) as Job[]);

        let quote: Quote | null = null;
        if (quoteRes?.data?.data) {
          quote = quoteRes.data.data;
        } else {
          const listRes = await api.get("quotes");
          const list = (listRes.data?.data ?? []) as Quote[];
          quote = list.find((q) => q.id === id) ?? null;
        }

        if (quote) reset(toFormValue(quote));
        else setError("root", { message: "Quote not found" });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError("root", {
            message: err.response?.data?.message ?? "Failed to load quote",
          });
        } else {
          setError("root", { message: "Failed to load quote" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset, setError]);

  const onSubmit = async (data: EditQuoteFormData) => {
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
      await api.patch(`quotes/${id}`, payload);
      router.push(`/admin/list/financials/quotes/${id}`);
    } catch (err) {
      console.error("Error updating quote:", err);
      if (axios.isAxiosError(err)) {
        setError("root", {
          message: err.response?.data?.message ?? "Failed to update quote",
        });
      } else {
        setError("root", { message: "Failed to update quote" });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit quote</h1>
          <p className="text-muted-foreground mt-1">Update quote details</p>
        </div>
        <Link href={`/admin/list/financials/quotes/${id}`}>
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
            Change any fields and save. Customer is derived from the selected job.
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
              >
                <option value="">Select a job</option>
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
              <Link href={`/admin/list/financials/quotes/${id}`}>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
