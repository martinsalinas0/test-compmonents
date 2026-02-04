"use client";

import { clientConfig } from "@/lib/config";
import { TaskRequest } from "@/lib/types/all";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function SingleTaskRequestPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [request, setRequest] = useState<TaskRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchRequest = async () => {
      try {
        const res = await axios.get(
          `${clientConfig.apiUrl}/task-requests/${id}`,
        );
        setRequest(res.data.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? err.message);
        } else {
          setError("Failed to load task request");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-cerulean border-t-transparent" />
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="p-6">
        <p className="text-red-500 mb-4">{error ?? "Task request not found."}</p>
        <Link
          href="/admin/list/jobs/task-requests"
          className="text-cerulean hover:underline font-medium"
        >
          ← Back to Task Requests
        </Link>
      </div>
    );
  }

  const statusClass =
    request.status === "approved"
      ? "bg-green-100 text-green-800"
      : request.status === "rejected"
        ? "bg-red-100 text-red-800"
        : "bg-yellow-100 text-yellow-800";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-cerulean-100 text-cerulean transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-cerulean">Task Request</h1>
      </div>

      <div className="bg-white rounded-lg border border-cerulean-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-cerulean-100 bg-cerulean-50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-cerulean">
              {request.title}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
            >
              {request.status.replace("_", " ").toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-pacific-600 mt-1">
            ID: {request.id} · Priority: {String(request.priority).toUpperCase()}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-pacific-600 mb-1">
              Description
            </h3>
            <p className="text-cerulean-800">{request.description}</p>
          </div>

          {request.address && (
            <div>
              <h3 className="text-sm font-medium text-pacific-600 mb-1">
                Address
              </h3>
              <p className="text-cerulean-800">{request.address}</p>
            </div>
          )}

          {request.rejection_reason && (
            <div>
              <h3 className="text-sm font-medium text-red-600 mb-1">
                Rejection reason
              </h3>
              <p className="text-cerulean-800">{request.rejection_reason}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-pacific-600">Customer</span>
              <p className="font-medium">
                {request.customer_id ? (
                  <Link
                    href={`/admin/customers/${request.customer_id}`}
                    className="text-cerulean hover:underline"
                  >
                    {request.customer_id.slice(-8)}
                  </Link>
                ) : (
                  "—"
                )}
              </p>
            </div>
            <div>
              <span className="text-pacific-600">Linked Job</span>
              <p className="font-medium">
                {request.job_id ? (
                  <Link
                    href={`/admin/jobs/${request.job_id}`}
                    className="text-cerulean hover:underline"
                  >
                    {request.job_id.slice(-8)}
                  </Link>
                ) : (
                  "Not assigned"
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-cerulean-100 bg-gray-50 flex flex-wrap gap-3">
          <Link
            href="/admin/list/jobs/task-requests"
            className="px-4 py-2 rounded-lg border border-cerulean-200 text-cerulean font-medium hover:bg-cerulean-50 transition-colors"
          >
            Back to list
          </Link>
          {request.job_id && (
            <Link
              href={`/admin/jobs/${request.job_id}`}
              className="px-4 py-2 rounded-lg bg-cerulean text-white font-medium hover:bg-pacific transition-colors"
            >
              View Job
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
