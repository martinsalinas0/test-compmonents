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
import type { Contractor } from "@/lib/types/all";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const editContractorSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(50),
  last_name: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .max(15, "No more than 15 characters")
    .optional()
    .refine((val) => !val || val.length >= 8, "Password must be at least 8 characters if provided"),
  company_name: z.string().max(100).optional().nullable(),
  phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits").optional().or(z.literal("")),
  address: z.string().max(100).optional().nullable(),
  city: z.string().max(50).optional().nullable(),
  state: z.string().max(2).optional().nullable(),
  zip_code: z.string().max(10).optional().nullable(),
  hourly_rate: z.coerce.number().min(0, "Must be 0 or more"),
  flat_rate: z.coerce.number().min(0, "Must be 0 or more"),
  tax_id: z.string().max(50).optional().nullable(),
  insurance_info: z.string().max(200).optional().nullable(),
  is_active: z.boolean(),
});

type EditContractorFormData = z.infer<typeof editContractorSchema>;

function toFormValue(c: Contractor): EditContractorFormData {
  return {
    first_name: c.first_name ?? "",
    last_name: c.last_name ?? "",
    email: c.email ?? "",
    password: "",
    company_name: c.company_name ?? "",
    phone: c.phone ?? "",
    address: c.address ?? "",
    city: c.city ?? "",
    state: c.state ?? "",
    zip_code: c.zip_code ?? "",
    hourly_rate: Number(c.hourly_rate) ?? 0,
    flat_rate: Number(c.flat_rate) ?? 0,
    tax_id: c.tax_id ?? "",
    insurance_info: c.insurance_info ?? "",
    is_active: c.is_active ?? true,
  };
}

export default function EditContractorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditContractorFormData>({
    resolver: zodResolver(editContractorSchema),
    defaultValues: { is_active: true },
  });

  useEffect(() => {
    if (!id) return;

    const fetchContractor = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${clientConfig.apiUrl}/contractors/${id}`);
        const data = res.data.data as Contractor;
        reset(toFormValue(data));
      } catch (err) {
        console.error("Error fetching contractor:", err);
        if (axios.isAxiosError(err)) {
          setError("root", {
            message: err.response?.data?.message ?? "Failed to load contractor",
          });
        } else {
          setError("root", { message: "Failed to load contractor" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContractor();
  }, [id, reset, setError]);

  const onSubmit = async (data: EditContractorFormData) => {
    try {
      const payload: Record<string, unknown> = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        company_name: data.company_name || null,
        phone: data.phone || null,
        address: data.address || null,
        city: data.city || null,
        state: data.state || null,
        zip_code: data.zip_code || null,
        hourly_rate: data.hourly_rate,
        flat_rate: data.flat_rate,
        tax_id: data.tax_id || null,
        insurance_info: data.insurance_info || null,
        is_active: data.is_active,
      };
      if (data.password && data.password.trim()) {
        payload.password = data.password.trim();
      }
      await axios.patch(`${clientConfig.apiUrl}/contractors/${id}`, payload);
      router.push(`/admin/users/contractors/${id}`);
    } catch (err) {
      console.error("Error updating contractor:", err);
      if (axios.isAxiosError(err)) {
        setError("root", {
          message: err.response?.data?.message ?? "Failed to update contractor",
        });
      } else {
        setError("root", { message: "Failed to update contractor" });
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
          <h1 className="text-3xl font-bold text-foreground">Edit contractor</h1>
          <p className="text-muted-foreground mt-1">Update contractor details</p>
        </div>
        <Link href={`/admin/users/contractors/${id}`}>
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contractor details</CardTitle>
          <CardDescription>
            Change any fields and save. Leave password blank to keep the current password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.root && (
            <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  First name <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("first_name")}
                  className={errors.first_name ? "border-destructive" : ""}
                />
                {errors.first_name && (
                  <p className="text-destructive text-sm mt-1">{errors.first_name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Last name <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("last_name")}
                  className={errors.last_name ? "border-destructive" : ""}
                />
                {errors.last_name && (
                  <p className="text-destructive text-sm mt-1">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Company name
              </label>
              <Input {...register("company_name")} placeholder="Optional" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  New password
                </label>
                <Input
                  type="password"
                  placeholder="Leave blank to keep current"
                  {...register("password")}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-destructive text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
              <Input
                type="tel"
                placeholder="10 digits"
                maxLength={10}
                {...register("phone")}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Street
                  </label>
                  <Input {...register("address")} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">City</label>
                    <Input {...register("city")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">State</label>
                    <Input maxLength={2} {...register("state")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Zip</label>
                    <Input {...register("zip_code")} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                Rates
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
                    Flat rate
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    {...register("flat_rate")}
                    className={errors.flat_rate ? "border-destructive" : ""}
                  />
                  {errors.flat_rate && (
                    <p className="text-destructive text-sm mt-1">{errors.flat_rate.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Tax ID</label>
                <Input {...register("tax_id")} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Insurance info
                </label>
                <Input {...register("insurance_info")} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                className="h-4 w-4 rounded border-input"
                {...register("is_active")}
              />
              <label htmlFor="is_active" className="text-sm font-medium text-foreground">
                Active contractor
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
              <Link href={`/admin/users/contractors/${id}`}>
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
};
