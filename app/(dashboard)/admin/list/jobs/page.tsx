"use client";

import TablesJobList from "@/components/forList/JobTable";
import type { JobWithRelations } from "@/lib/types/jobsWithJoins";
import { clientConfig } from "@/lib/config";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const AdminJobsListPage = () => {
  const [jobs, setJobs] = useState<JobWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${clientConfig.apiUrl}/jobs/all`)
      .then((response) => {
        setJobs(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load jobs");
        setLoading(false);
      });
  }, []);

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    const q = searchQuery.toLowerCase();
    return jobs.filter((job) => {
      const customerName = job.customer
        ? `${job.customer.first_name} ${job.customer.last_name}`.toLowerCase()
        : "";
      const contractorName = job.contractor
        ? `${job.contractor.first_name} ${job.contractor.last_name} ${job.contractor.company_name ?? ""}`.toLowerCase()
        : "";
      return (
        job.title.toLowerCase().includes(q) ||
        job.status.toLowerCase().includes(q) ||
        (job.city ?? "").toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q) ||
        customerName.includes(q) ||
        contractorName.includes(q)
      );
    });
  }, [jobs, searchQuery]);

  if (loading) {
    return (
      <div className="p-6 text-pacific justify-center text-center font-extrabold text-4xl">
        Loading jobs...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-yarrow-800">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-input px-4 py-1 bg-card">
            <Image src="/search.png" alt="Search" width={14} height={14} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 p-2 bg-transparent outline-none text-cerulean-800 placeholder:text-pacific-400"
            />
          </div>
          <Link
            href="/admin/jobs/new"
            className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add Job
          </Link>
        </div>
      </div>
      <TablesJobList data={filteredJobs} />
    </div>
  );
};

export default AdminJobsListPage;
