"use client";

import TableHeader from "@/components/forList/TableHeader";
import { clientConfig } from "@/lib/config";
import { Job } from "@/lib/types/jobs";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import QuickActionBar from "@/components/layouts/QuickActionBar";

const JobsCompletedListPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${clientConfig.apiUrl}/jobs/status/completed`
        );
        setJobs(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load completed jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const columns = [
    "Title",
    "Status",
    "Customer",
    "City",
    "Job ID",
    "Contractor",
  ];

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-cerulean mb-6">
          Completed Jobs
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cerulean"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-cerulean mb-6">
          Completed Jobs
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-cerulean text-white rounded-lg hover:bg-cerulean-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-cerulean">Completed Jobs</h1>
        <QuickActionBar />
      </div>

      <div className="overflow-x-auto rounded-xl text-center border border-cerulean-200 bg-background shadow-sm">
        <table className="min-w-full border-collapse">
          <TableHeader columns={columns} />

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="transition hover:bg-cerulean-50">
                <td className="border-b border-cerulean-100 px-6 py-4 text-sm text-cerulean-800">
                  <Link
                    href={`/admin/jobs/${job.id}`}
                    className="hover:text-blue-600 hover:underline font-medium"
                  >
                    {job.title}
                  </Link>
                </td>

                <td className="border-b border-cerulean-100 px-6 py-4 text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {job.status?.toUpperCase()}
                  </span>
                </td>

                <td className="border-b border-cerulean-100 px-6 py-4 text-sm text-cerulean-800">
                  {job.customer_id ? (
                    <Link
                      href={`/admin/customers/${job.customer_id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      C-{job.customer_id.slice(-6)}
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="border-b border-cerulean-100 px-6 py-4 text-sm text-cerulean-700">
                  {job.city ?? "—"}
                </td>

                <td className="border-b border-cerulean-100 px-6 py-4 text-sm font-medium text-cerulean-900">
                  <Link
                    href={`/admin/jobs/${job.id}`}
                    className="hover:underline"
                  >
                    J-{job.id.slice(-6)}
                  </Link>
                </td>

                <td className="border-b border-cerulean-100 px-6 py-4 text-sm text-cerulean-700">
                  {job.contractor_id ? (
                    <Link
                      href={`/admin/contractors/${job.contractor_id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      CT-{job.contractor_id.slice(-6)}
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}

            {jobs.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-sm text-cerulean-500"
                >
                  No completed jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsCompletedListPage;
