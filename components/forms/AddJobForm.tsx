"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddJobForm = () => {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("medium");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [payType, setPayType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const jobData = {
      title,
      description,
      customer_id: customerId,
      address,
      city,
      state,
      zip_code: zipCode,
      status,
      priority,
      pay_type: payType || null,
      scheduled_date: scheduledDate || null,
      scheduled_time: scheduledTime || null,
      created_by: "a1111111-1111-1111-1111-111111111111",
    };

    console.log("Sending to API:", jobData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/jobs/new",
        jobData,
      );
      console.log("Success:", response.data);
      router.push("/admin/list/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to create job");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cerulean-50 to-olive-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-cerulean-100 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-cerulean to-pacific px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Add New Job
            </h1>
          </div>

          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Kitchen Remodel"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                  placeholder="Enter detailed job description..."
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    For Customer <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    required
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                  >
                    <option value="">Select Customer</option>

                    <option value="uuid-here">John Doe</option>
                    {/* just for testing */}
                    <option>c3333333-3333-3333-3333-333333333333</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Pay Type
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    value={payType}
                    onChange={(e) => setPayType(e.target.value)}
                  >
                    <option value="">Select Pay Type</option>
                    <option value="hourly">Hourly</option>
                    <option value="fixed">Fixed Price</option>
                    <option value="commission">Commission</option>
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
                    required
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
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
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Scheduled Time
                  </label>
                  <Input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
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
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Austin"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="TX"
                    maxLength={2}
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value.toUpperCase())}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Zip Code <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="78701"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-cerulean-100">
                <button
                  type="button"
                  className="px-6 py-2 bg-white border border-cerulean-100 text-cerulean rounded-md hover:bg-olive-50 transition-colors"
                  onClick={() => router.push("/admin/list/jobs")}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-cerulean text-white rounded-md hover:bg-pacific transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Job"}
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
