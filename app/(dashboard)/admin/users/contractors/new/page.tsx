"use client";

import { Input } from "@/components/ui/input";
import { clientConfig } from "@/lib/config";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const contractorSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .max(15, "No more than 15 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
  address: z.string().min(1, "Address is required").max(50),
  city: z.string().min(1, "City is required").max(50),
  state: z.string().length(2, "Must be 2 characters"),
  zip_code: z.string().min(1, "Zip Code is required").max(10),
  notes: z.string().max(50).optional(),
  hourly_rate: z.number().min(0),
  flat_rate: z.number().min(0),

  tax_id: z.string().min(1),
  insurance_info: z.string().min(3),
});

type ContractorFormData = z.infer<typeof contractorSchema>;

const AddContractorPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ContractorFormData>({
    resolver: zodResolver(contractorSchema),
    defaultValues: {
      notes: "",
      hourly_rate: 0,
      flat_rate: 0,
    },
  });

  const onSubmit = async (data: ContractorFormData) => {
    try {
      const response = await axios.post(
        `${clientConfig.apiUrl}/contractors/register`,
        data,
      );

      console.log("Contractor created:", response.data);
      router.push("/admin/list/contractors");
    } catch (error) {
      console.error("Error creating contractor", error);

      if (axios.isAxiosError(error)) {
        setError("root", {
          message:
            error.response?.data?.message || "Failed to create contractor",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cerulean-50 to-olive-500 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center">Add new contractor</h1>
        </div>

        <div className="p-6 md:p-8">
          {errors.root && (
            <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-cerulean mb-2">
                  First Name
                </label>
                <Input
                  type="text"
                  placeholder="John"
                  {...register("first_name")}
                  className={errors.first_name ? "border-red-300" : ""}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Last Name
                </label>
                <Input
                  type="text"
                  placeholder="Smith"
                  {...register("last_name")}
                  className={errors.last_name ? "border-red-300" : ""}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-cerulean mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className={errors.email ? "border-red-300" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-cerulean mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={errors.password ? "border-red-300" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-cerulean mb-2">
                Phone
              </label>
              <Input
                type="tel"
                placeholder="5551234567"
                {...register("phone")}
                className={errors.phone ? "border-red-300" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-cerulean mb-2">
                Address
              </label>
              <Input
                type="text"
                placeholder="123 Main St"
                {...register("address")}
                className={errors.address ? "border-red-300" : ""}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-cerulean mb-2">
                  City
                </label>
                <Input
                  type="text"
                  {...register("city")}
                  className={errors.city ? "border-red-300" : ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cerulean mb-2">
                  State
                </label>
                <Input
                  type="text"
                  maxLength={2}
                  {...register("state")}
                  className={errors.state ? "border-red-300" : ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Zip Code
                </label>
                <Input
                  type="text"
                  {...register("zip_code")}
                  className={errors.zip_code ? "border-red-300" : ""}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-cerulean mb-2">
                Notes
              </label>
              <Input
                type="text"
                placeholder="Optional notes..."
                {...register("notes")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-cerulean mb-2">
                Hourly Rate
              </label>
              <Input
                type="number"
                step="0.01"
                {...register("hourly_rate", { valueAsNumber: true })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-cerulean mb-2">
                Flat Rate
              </label>
              <Input
                type="number"
                step="0.01"
                {...register("flat_rate", { valueAsNumber: true })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-cerulean mb-2">
                Tax ID
              </label>
              <Input type="text" {...register("tax_id")} />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-cerulean mb-2">
                Insurance Info
              </label>
              <Input type="text" {...register("insurance_info")} />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => router.push("/admin/list/contractors")}
                disabled={isSubmitting}
                className="px-6 py-2 bg-white border rounded-md"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-cerulean text-white rounded-md disabled:bg-gray-400"
              >
                {isSubmitting ? "Creating..." : "Create Contractor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContractorPage;
