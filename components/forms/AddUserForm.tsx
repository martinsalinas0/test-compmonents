"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientConfig } from "@/lib/config";

const userSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .max(128, "Password must be 128 characters or fewer"),
  phone: z.string().length(10, "Phone must be 10 digits"),
  address: z.string().min(1, "Address is required").max(50),
  city: z.string().min(1, "City is required").max(50),
  state: z.string().min(1, "State is required").max(2, "Must be 2 characters"),
  zip_code: z.string().min(1, "Zip Code is required").max(10),
  notes: z.string().max(50).optional(),
});

type UserFormData = z.infer<typeof userSchema>;

const AddUserForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      notes: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    console.log("Sending to api", data);

    try {
      const response = await axios.post(
        `${clientConfig.apiUrl}/users/new`,
        data,
      );
      console.log("success: true", response.data);
      router.push("/admin/list/users");
    } catch (error) {
      console.error("Error creating user:", error);
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || "Failed to create user",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cerulean-50 to-olive-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-cerulean to-pacific px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Add New User
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
                  Password <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-red-300" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
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

              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="123 Main St."
                  {...register("address")}
                  className={errors.address ? "border-red-300" : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Austin"
                    {...register("city")}
                    className={errors.city ? "border-red-300" : ""}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="TX"
                    maxLength={2}
                    {...register("state")}
                    className={errors.state ? "border-red-300" : ""}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Zip Code <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="78701"
                    {...register("zip_code")}
                    className={errors.zip_code ? "border-red-300" : ""}
                  />
                  {errors.zip_code && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zip_code.message}
                    </p>
                  )}
                </div>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
