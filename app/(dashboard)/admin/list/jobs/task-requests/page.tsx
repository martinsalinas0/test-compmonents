"use client";

import GenericTable, { Column } from "@/components/forList/GenericTable";
import SearchBar from "@/components/SearchBar";
import { clientConfig } from "@/lib/config";
import { TaskRequest } from "@/lib/types/all";
import axios from "axios";

import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const TaskRequestListPage = () => {
  const [requests, setRequests] = useState<TaskRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLastSix = (str: string) => str.slice(-6);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `${clientConfig.apiUrl}/task-requests/all`,
        );
        setRequests(response.data.data ?? []);
      } catch (error) {
        console.error(error);
        setError("Failed to load task requests");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    if (!searchQuery.trim()) return requests;

    const q = searchQuery.toLowerCase();
    return requests.filter((request) => {
      const searchFields = [
        request.id,
        request.title,
        request.customer_id,
        request.priority,
        request.status,
        request.job_id,
      ];

      return searchFields.some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(q),
      );
    });
  }, [requests, searchQuery]);

  const columns: Column<TaskRequest>[] = [
    {
      header: "Request ID",
      accessor: "id",
      render: (v) => `E5-${getLastSix(String(v))}`,
    },
    {
      header: "Title",
      accessor: "title",
      render: (v, request) => (
        <Link
          href={`/admin/jobs/task-request/${request.id}`}
          className="hover:text-primary font-medium"
        >
          {String(v)}
        </Link>
      ),
    },
    {
      header: "Customer",
      accessor: "customer_id",
      render: (v, request) => (
        <Link
          href={`/admin/customers/${request.customer_id}`}
          className="hover:text-primary"
        >
          C-{getLastSix(String(v))}
        </Link>
      ),
    },
    {
      header: "Job",
      accessor: "job_id",
      render: (v, request) =>
        v ? (
          <Link
            href={`/admin/jobs/${request.job_id}`}
            className="hover:text-primary"
          >
            F-{getLastSix(String(v))}
          </Link>
        ) : (
          <span className="text-muted-foreground">Not assigned</span>
        ),
    },
    {
      header: "Priority",
      accessor: "priority",
      render: (v) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            String(v).toLowerCase() === "high"
              ? "bg-red-100 text-red-800"
              : String(v).toLowerCase() === "medium"
                ? "bg-yarrow-100 text-yarrow-800"
                : "bg-olive-100 text-olive-800"
          }`}
        >
          {String(v).toUpperCase()}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (v) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            String(v).toLowerCase() === "completed"
              ? "bg-olive-100 text-olive-800"
              : String(v).toLowerCase() === "in_progress"
                ? "bg-cerulean-100 text-cerulean-800"
                : String(v).toLowerCase() === "pending"
                  ? "bg-yarrow-100 text-yarrow-800"
                  : "bg-muted text-muted-foreground"
          }`}
        >
          {String(v).replace("_", " ").toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-cerulean mb-2 md:mb-0">
          Task Requests
        </h1>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search task requests..."
          />

          <Link
            href="/admin/jobs/new"
            className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              Create Request <Plus size={18} />
            </div>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : filteredRequests.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No task requests found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No task requests yet</p>
            <Link
              href="/admin/jobs/new"
              className="inline-flex items-center gap-2 bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create Your First Request <Plus size={18} />
            </Link>
          </div>
        ) : (
          <GenericTable
            data={filteredRequests}
            columns={columns}
            emptyMessage="No task requests found"
          />
        )}
      </div>
    </div>
  );
};

export default TaskRequestListPage;
