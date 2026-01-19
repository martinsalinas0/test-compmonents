"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Job } from "@/lib/types/jobs";
import { Customer } from "@/lib/types/customers";
import { Contractor } from "@/lib/types/contractor";
import { ArrowLeft } from "lucide-react";

const SingleJobPage = () => {
  //
  //
  //

  const router = useRouter();

  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [contractor, setContractor] = useState<Contractor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) {
      console.log("No jobId found");
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Fetching job:", jobId);
        const jobResponse = await axios.get(
          `http://localhost:5000/api/v1/jobs/${jobId}`,
        );

        const jobData = jobResponse.data.data;
        console.log(jobData);
        setJob(jobData);

        if (jobData.customer_id) {
          const customerResponse = await axios.get(
            `http://localhost:5000/api/v1/customers/${jobData.customer_id}`,
          );
          console.log("Customer Response:", customerResponse);
          setCustomer(customerResponse.data.data);
        }

        if (jobData.contractor_id) {
          const contractorResponse = await axios.get(
            `http://localhost:5000/api/v1/contractors/${jobData.contractor_id}`,
          );
          console.log("Contractor Response:", contractorResponse);
          setContractor(contractorResponse.data.data);
        }
      } catch (err: unknown) {
        console.error("Error fetching data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <div className="max-w-4xl mx-auto p-8 space-y-10">
      <div className="sticky top-0 z-10 mb-6">
        <div
          className="max-w-4xl mx-auto px-8 py-3
                  bg-card border-b border-border
                  flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="
          inline-flex items-center gap-2
          text-sm font-medium
          text-cerulean-700
          hover:text-cerulean-900
          transition
        "
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <span className="text-xs text-muted-foreground">Job Details</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="
          inline-flex items-center gap-2
          rounded-md border border-cerulean-300
          px-3 py-1.5 text-sm font-medium
          text-cerulean-800
          hover:bg-cerulean-50
          transition
        "
            >
              Change Status
            </button>

            <button
              className="
          inline-flex items-center gap-2
          rounded-md border border-border
          px-3 py-1.5 text-sm font-medium
          text-muted-foreground
          hover:text-foreground
          hover:bg-muted
          transition
        "
            >
              More
            </button>
          </div>
        </div>
      </div>

      <header className="space-y-4">
        <h1 className="text-5xl font-bold  text-cerulean-900">{job.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-cerulean-300">
            <span className="text-pacific-600 font-medium uppercase tracking-wide">
              Status:
            </span>
            <span className="font-semibold text-cerulean-900">
              {job.status}
            </span>
          </span>

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-olive-300">
            <span className="text-olive-600 font-medium uppercase tracking-wide">
              Priority:
            </span>
            <span className="font-semibold text-cerulean-900">
              {job.priority}
            </span>
          </span>
        </div>
      </header>

      {customer && (
        <section className="rounded-lg border border-pacific-300 bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-pacific-800 mb-4 flex items-center gap-2">
            {/* <span className="h-2 w-2 rounded-full bg-pacific-900" /> */}
            -Customer Information-
          </h2>

          <div className="space-y-2 text-sm text-pacific-700">
            <p>
              <span className="font-medium text-pacific-900">Name:</span>{" "}
              {customer.first_name} {customer.last_name}
            </p>
            <p>
              <span className="font-medium text-pacific-900">Email:</span>{" "}
              {customer.email}
            </p>
            <p>
              <span className="font-medium text-pacific-900">Phone:</span>{" "}
              {customer.phone}
            </p>
          </div>
        </section>
      )}

      {contractor && (
        <section className="rounded-lg border border-cerulean-300 bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-cerulean-800 mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cerulean-500" />
            Contractor Information
          </h2>

          <div className="space-y-2 text-sm text-cerulean-700">
            <p>
              <span className="font-medium text-cerulean-900">Name:</span>{" "}
              {contractor.first_name} {contractor.last_name}
            </p>
            <p>
              <span className="font-medium text-cerulean-900">Company:</span>{" "}
              {contractor.company_name}
            </p>
            <p>
              <span className="font-medium text-cerulean-900">Email:</span>{" "}
              {contractor.email}
            </p>
            <p>
              <span className="font-medium text-cerulean-900">Phone:</span>{" "}
              {contractor.phone}
            </p>
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-cerulean-800 border-b border-cerulean-200 pb-1">
          Description
        </h2>
        <p className=" text-muted-foreground leading-relaxed">
          {job.description}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-cerulean-800 border-b border-cerulean-200 pb-1">
          Location
        </h2>
        <p className="text-sm text-muted-foreground">{job.address}</p>
        <p className="text-sm text-muted-foreground">
          {job.city}, {job.state} {job.zip_code}
        </p>
      </section>

      <section className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-cerulean-800">Schedule</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-pacific-600">Date:</span>{" "}
              {formatDate(job.scheduled_date)}
            </p>
            <p>
              <span className="text-pacific-600">Time:</span>{" "}
              {job.scheduled_time || "N/A"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-cerulean-800">
            Work Details
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-pacific-600">Pay Type:</span> {job.pay_type}
            </p>
            <p>
              <span className="text-pacific-600">Hours Worked:</span>{" "}
              {job.hours_worked || "N/A"}
            </p>
            {job.started_at && (
              <p>
                <span className="text-pacific-600">Started:</span>{" "}
                {formatDateTime(job.started_at)}
              </p>
            )}
            {job.completed_at && (
              <p>
                <span className="text-pacific-600">Completed:</span>{" "}
                {formatDateTime(job.completed_at)}
              </p>
            )}
          </div>
        </div>
      </section>

      {job.cancelled_at && (
        <section className="rounded-lg border border-yarrow-300 bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-yarrow-800 mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yarrow-500" />
            Cancellation Details
          </h2>

          <div className="space-y-2 text-sm text-yarrow-700">
            <p>
              <span className="font-medium text-yarrow-900">Cancelled At:</span>{" "}
              {formatDateTime(job.cancelled_at)}
            </p>
            <p>
              <span className="font-medium text-yarrow-900">Cancelled By:</span>{" "}
              {job.cancelled_by}
            </p>
            {job.cancellation_reason && (
              <p>
                <span className="font-medium text-yarrow-900">Reason:</span>{" "}
                {job.cancellation_reason}
              </p>
            )}
          </div>
        </section>
      )}

      <footer className="pt-6 border-t border-border text-xs text-muted-foreground space-y-1">
        <p>
          Created {formatDateTime(job.created_at)} by {job.created_by}
        </p>
        <p>Last updated {formatDateTime(job.updated_at)}</p>
      </footer>
    </div>
  );
};

export default SingleJobPage;
