"use client";

import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientConfig } from "@/lib/config";
import { Input } from "@/components/ui/input";

const userSchema = z.object({
  first_name: z.string().min(1, "First name is required").optional(),
  last_name: z.string().min(1, "Last name is required").optional(),
  email: z.email("Invalid email").optional(),
  phone: z.string().length(10, "Phone must be 10 digits").optional(),
  notes: z.string().max(50).optional(),
});

type UserFormData = z.infer<typeof userSchema>;

const UserUpdatePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${clientConfig.apiUrl}/users/${id}`);
        reset(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("root", {
          message: "Failed to load user data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, reset, setError]);

  const onSubmit = async (data: UserFormData) => {
    try {
      await axios.patch(
        `${clientConfig.apiUrl}/users/${id}`,
        data,
      );
      router.push("/admin/list/users");
    } catch (error) {
      console.error("Error updating user:", error);
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || "Failed to update user",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cerulean-50 to-olive-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-cerulean to-pacific px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Edit User
            </h1>
          </div>

          <div className="p-6 md:p-8">
            {errors.root && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.root.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="John"
                    {...register("first_name")}
                    className={errors.first_name ? "border-red-300" : ""}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    {...register("last_name")}
                    className={errors.last_name ? "border-red-300" : ""}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className={errors.email ? "border-red-300" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="5551234567"
                  {...register("phone")}
                  className={errors.phone ? "border-red-300" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Notes
                </label>
                <Input
                  type="text"
                  placeholder="Any additional notes..."
                  {...register("notes")}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
                <button
                  type="button"
                  className="px-6 py-2 bg-card border border-border text-foreground rounded-md hover:bg-muted transition-colors hover:font-bold"
                  onClick={() => router.push("/admin/list/users")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:bg-muted disabled:cursor-not-allowed"
                  disabled={isSubmitting || !isDirty}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdatePage;
