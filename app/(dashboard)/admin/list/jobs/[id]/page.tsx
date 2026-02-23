"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { Job } from "@/lib/types/jobs";
import { Customer } from "@/lib/types/customers";

const JobDetailPage = () => {
  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    api
      .get(`jobs/${jobId}`)
      .then((response) => {
        const jobData = response.data.data;
        setJob(jobData);

        if (jobData.customer_id) {
          return api.get(`customers/${jobData.customer_id}`);
        }
      })
      .then((customerResponse) => {
        if (customerResponse) {
          setCustomer(customerResponse.data.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load job");
        setLoading(false);
      });
  }, [jobId]);

  if (loading) {
    return (
      <div className="p-6 text-pacific justify-center text-center font-extrabold text-4xl">
        Loading job details...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-destructive">Error: {error}</div>;
  }

  if (!job) {
    return <div className="p-6 text-pacific">Job not found</div>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-cerulean">{job.title}</h1>
        <div className="flex gap-4 items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === "completed"
                ? "bg-olive-100 text-olive-800"
                : job.status === "cancelled"
                  ? "bg-yarrow-100 text-yarrow-800"
                  : job.status === "in_progress"
                    ? "bg-pacific-100 text-pacific-800"
                    : "bg-cerulean-100 text-cerulean-800"
            }`}
          >
            {job.status}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.priority === "high"
                ? "bg-yarrow-200 text-yarrow-900"
                : job.priority === "medium"
                  ? "bg-pacific-200 text-pacific-900"
                  : "bg-olive-200 text-olive-900"
            }`}
          >
            Prioritffy: {job.priority}
          </span>
        </div>
      </div>
      <div>Customer:</div>

    <p>ss</p>
      {customer && (
        <div className="mb-6 p-4 bg-pacific-50 rounded-lg border border-pacific-200">
          <h2 className="text-xl font-semibold mb-2 text-pacific-800">
            Customer Information
          </h2>
          <div className="space-y-1">
            <p className="text-pacific-700">
              <strong>Name:</strong> {customer.first_name} {customer.last_name}
            </p>
            <p className="text-pacific-700">
              <strong>Email:</strong> {customer.email}
            </p>
            <p className="text-pacific-700">
              <strong>Phone:</strong> {customer.phone}
            </p>
          </div>
        </div>
      )}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-cerulean-800">
          Description
        </h2>
        <p className="text-cerulean-700">{job.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-cerulean-800">
          Location
        </h2>
        <p className="text-cerulean-700">{job.address}</p>
        <p className="text-cerulean-700">
          {job.city}, {job.state} {job.zip_code}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-cerulean-800">
          Schedule
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-pacific-600">Scheduled Date</p>
            <p className="text-cerulean-900">
              {formatDate(job.scheduled_date)}
            </p>
          </div>
          <div>
            <p className="text-sm text-pacific-600">Scheduled Time</p>
            <p className="text-cerulean-900">{job.scheduled_time || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-cerulean-800">
          Work Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-pacific-600">Pay Type</p>
            <p className="text-cerulean-900">{job.pay_type}</p>
          </div>
          <div>
            <p className="text-sm text-pacific-600">Hours Worked</p>
            <p className="text-cerulean-900">{job.hours_worked || "N/A"}</p>
          </div>
          {job.started_at && (
            <div>
              <p className="text-sm text-pacific-600">Started At</p>
              <p className="text-cerulean-900">
                {formatDateTime(job.started_at)}
              </p>
            </div>
          )}
          {job.completed_at && (
            <div>
              <p className="text-sm text-pacific-600">Completed At</p>
              <p className="text-cerulean-900">
                {formatDateTime(job.completed_at)}
              </p>
            </div>
          )}
        </div>
      </div>

      {job.cancelled_at && (
        <div className="mb-6 p-4 bg-yarrow-50 rounded-lg border border-yarrow-200">
          <h2 className="text-xl font-semibold mb-2 text-yarrow-800">
            Cancellation Details
          </h2>
          <div className="space-y-2">
            <p className="text-sm text-yarrow-700">
              Cancelled At:{" "}
              <span className="text-yarrow-900">
                {formatDateTime(job.cancelled_at)}
              </span>
            </p>
            <p className="text-sm text-yarrow-700">
              Cancelled By:{" "}
              <span className="text-yarrow-900">{job.cancelled_by}</span>
            </p>
            {job.cancellation_reason && (
              <p className="text-sm text-yarrow-700">
                Reason:{" "}
                <span className="text-yarrow-900">
                  {job.cancellation_reason}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mb-6 text-sm text-pacific-600">
        <p>
          Created: {formatDateTime(job.created_at)} by {job.created_by}
        </p>
        <p>Last Updated: {formatDateTime(job.updated_at)}</p>
      </div>
    </div>
  );
};

export default JobDetailPage;
