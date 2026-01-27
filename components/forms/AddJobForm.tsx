"use client";

import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { clientConfig } from "@/lib/config";

const jobSchema = z.object({
  title: z.string().min(5, "Job title is required"),
  description: z.string().min(1, "Description is required"),
  customerId: z.string().min(1, "Customer is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be 2 characters").toUpperCase(),
  zipCode: z.string().length(5, "Zip code is required"),
  status: z.enum(["open", "assigned", "in_progress", "completed"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  payType: z.enum(["hourly", "fixed", ""]).optional(),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

const AddJobForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      status: "open",
      priority: "medium",
      payType: "",
      scheduledDate: "",
      scheduledTime: "",
    },
  });

  const onSubmit = async (data: JobFormData) => {
    const jobData = {
      title: data.title,
      description: data.description,
      customer_id: data.customerId,
      address: data.address,
      city: data.city,
      state: data.state,
      zip_code: data.zipCode,
      status: data.status,
      priority: data.priority,
      pay_type: data.payType || null,
      scheduled_date: data.scheduledDate || null,
      scheduled_time: data.scheduledTime || null,
      created_by: "a1111111-1111-1111-1111-111111111111",
    };

    console.log("Sending to API:", jobData);

    try {
      const response = await axios.post(
        `${clientConfig.apiUrl}/jobs/new`,
        jobData,
      );
      console.log("Success:", response.data);
      router.push("/admin/list/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || "Failed to create job",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cerulean-50 to-olive-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-cerulean-100 overflow-hidden">
          <div className="bg-linear-to-r from-cerulean to-pacific px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Add New Job
            </h1>
          </div>

          <div className="p-6 md:p-8">
            {errors.root && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.root.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Kitchen Remodel"
                  {...register("title")}
                  className={errors.title ? "border-red-300" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent ${
                    errors.description
                      ? "border-red-300"
                      : "border-cerulean-100"
                  }`}
                  placeholder="Enter detailed job description..."
                  rows={4}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    For Customer <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent ${
                      errors.customerId
                        ? "border-red-300"
                        : "border-cerulean-100"
                    }`}
                    {...register("customerId")}
                  >
                    <option value="">Select Customer</option>
                    <option value="c03d41c2-5675-49bd-8838-a538d54b2c8d">
                      John Doe
                    </option>
                    <option value="0c4de721-77a4-4e48-b8b2-059075a7c283">
                      Robert Chen
                    </option>
                  </select>
                  {errors.customerId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customerId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Pay Type
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    {...register("payType")}
                  >
                    <option value="">Select Pay Type</option>
                    <option value="hourly">Hourly</option>
                    <option value="fixed">Fixed Price</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    {...register("priority")}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    {...register("status")}
                  >
                    <option value="open">Open</option>
                    <option value="assigned">Assigned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Scheduled Date
                  </label>
                  <Input type="date" {...register("scheduledDate")} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Scheduled Time
                  </label>
                  <Input type="time" {...register("scheduledTime")} />
                </div>
              </div>

              <div className="mt-6 mb-4">
                <h3 className="text-lg font-semibold text-cerulean border-b border-cerulean-100 pb-2">
                  Job Location
                </h3>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                    }}
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
                    {...register("zipCode")}
                    className={errors.zipCode ? "border-red-300" : ""}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-cerulean-100">
                <button
                  type="button"
                  className="px-6 py-2 bg-white border border-cerulean-100 text-cerulean rounded-md hover:bg-olive-50 transition-colors"
                  onClick={() => router.push("/admin/list/jobs")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-cerulean text-white rounded-md hover:bg-pacific transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
