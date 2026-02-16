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
import type { Customer } from "@/lib/types/all";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const editCustomerSchema = z
  .object({
    first_name: z.string().min(1, "First name is required").max(23),
    last_name: z.string().min(1, "Last name is required").max(40),
    email: z.email("Invalid email"),
    password: z
      .string()
      .max(13, "No more than 13 characters")
      .optional()
      .refine((val) => !val || val.length >= 8, "Password must be at least 8 characters if provided"),
    phone: z.string().length(10, "Phone must be 10 digits").optional().or(z.literal("")),
    address: z.string().min(1, "Address is required").max(50),
    city: z.string().min(1, "City is required").max(50),
    state: z.string().min(1, "State is required").max(2, "Must be 2 characters"),
    zip_code: z.string().min(1, "Zip code is required").max(10),
    notes: z.string().max(500).optional().nullable(),
    billing_address: z.string().max(50).optional().nullable(),
    billing_city: z.string().max(50).optional().nullable(),
    billing_state: z.string().max(2).optional().nullable(),
    billing_zip: z.string().max(10).optional().nullable(),
  })
  .refine(
    (data) => {
      const hasBilling = data.billing_address || data.billing_city || data.billing_state || data.billing_zip;
      if (!hasBilling) return true;
      return !!(data.billing_address && data.billing_city && data.billing_state && data.billing_zip);
    },
    { message: "Complete all billing fields or leave all blank", path: ["billing_address"] }
  );

type EditCustomerFormData = z.infer<typeof editCustomerSchema>;

function toFormValue(c: Customer): EditCustomerFormData {
  return {
    first_name: c.first_name ?? "",
    last_name: c.last_name ?? "",
    email: c.email ?? "",
    password: "",
    phone: c.phone ?? "",
    address: c.address ?? "",
    city: c.city ?? "",
    state: c.state ?? "",
    zip_code: c.zip_code ?? "",
    notes: c.notes ?? "",
    billing_address: c.billing_address ?? "",
    billing_city: c.billing_city ?? "",
    billing_state: c.billing_state ?? "",
    billing_zip: c.billing_zip ?? "",
  };
}

export default function EditCustomerPage() {
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
  } = useForm<EditCustomerFormData>({
    resolver: zodResolver(editCustomerSchema),
  });

  useEffect(() => {
    if (!id) return;

    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${clientConfig.apiUrl}/customers/${id}`);
        const data = res.data.data as Customer;
        reset(toFormValue(data));
      } catch (err) {
        console.error("Error fetching customer:", err);
        if (axios.isAxiosError(err)) {
          setError("root", {
            message: err.response?.data?.message ?? "Failed to load customer",
          });
        } else {
          setError("root", { message: "Failed to load customer" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, reset, setError]);

  const onSubmit = async (data: EditCustomerFormData) => {
    try {
      const payload: Record<string, unknown> = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone || null,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        notes: data.notes || null,
        billing_address: data.billing_address || null,
        billing_city: data.billing_city || null,
        billing_state: data.billing_state || null,
        billing_zip: data.billing_zip || null,
      };
      if (data.password && data.password.trim()) {
        payload.password = data.password.trim();
      }
      await axios.patch(`${clientConfig.apiUrl}/customers/${id}/update`, payload);
      router.push(`/admin/users/customers/${id}`);
    } catch (err) {
      console.error("Error updating customer:", err);
      if (axios.isAxiosError(err)) {
        setError("root", {
          message: err.response?.data?.message ?? "Failed to update customer",
        });
      } else {
        setError("root", { message: "Failed to update customer" });
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
          <h1 className="text-3xl font-bold text-foreground">Edit customer</h1>
          <p className="text-muted-foreground mt-1">Update customer details</p>
        </div>
        <Link href={`/admin/users/customers/${id}`}>
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer details</CardTitle>
          <CardDescription>Change any fields and save. Leave password blank to keep the current password.</CardDescription>
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
                    Street <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register("address")}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-destructive text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      City <span className="text-destructive">*</span>
                    </label>
                    <Input {...register("city")} className={errors.city ? "border-destructive" : ""} />
                    {errors.city && (
                      <p className="text-destructive text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      State <span className="text-destructive">*</span>
                    </label>
                    <Input
                      maxLength={2}
                      {...register("state")}
                      className={errors.state ? "border-destructive" : ""}
                    />
                    {errors.state && (
                      <p className="text-destructive text-sm mt-1">{errors.state.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Zip <span className="text-destructive">*</span>
                    </label>
                    <Input
                      {...register("zip_code")}
                      className={errors.zip_code ? "border-destructive" : ""}
                    />
                    {errors.zip_code && (
                      <p className="text-destructive text-sm mt-1">{errors.zip_code.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                Billing address
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Optional. Leave all blank if same as address above.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Billing street
                  </label>
                  <Input {...register("billing_address")} />
                  {errors.billing_address && (
                    <p className="text-destructive text-sm mt-1">{errors.billing_address.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      City
                    </label>
                    <Input {...register("billing_city")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      State
                    </label>
                    <Input maxLength={2} {...register("billing_state")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Zip
                    </label>
                    <Input {...register("billing_zip")} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
              <Input placeholder="Internal notes..." {...register("notes")} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
              <Link href={`/admin/users/customers/${id}`}>
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
