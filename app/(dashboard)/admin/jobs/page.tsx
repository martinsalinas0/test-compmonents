//this is a grid view of the jobs in cards

"use client";

import JobCardComp from "@/components/cards/JobCards";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Jobs {
  id: string;
  title: string;
  description: string;
  status: string;
  city: string;
  state: string;
  contractor_id: string | null;
  customer_id: string;
}

const AdminJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/jobs/all")
      .then((response) => {
        setJobs(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-pacific">Loading jobs...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-cerulean mb-6">Jobs</h1>

      <p className="text-sm mb-4">Total jobs: {jobs.length}</p>
      <p>
        <button className="bg-amber-200 rounded-md p-1 mb-3">
          <Link href="/admin/jobs/new">Add new job</Link>
        </button>
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job: Jobs) => (
          <JobCardComp key={job.id} job={job} />
        ))}
      </div>

      {jobs.length === 0 && <p className="text-pacific">No jobs found</p>}
    </div>
  );
};

export default AdminJobsPage;
