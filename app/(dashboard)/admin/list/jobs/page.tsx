"use client";

import TablesJobList from "@/components/forList/JobTable";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminJobsListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/jobs/all`)
      .then((response) => {
        setJobs(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
          <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-pacific-300 px-4 py-1 bg-white">
            <Image src="/search.png" alt="Search" width={14} height={14} />
            <input
              type="text"
              placeholder="Search jobs..."
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
      <TablesJobList data={jobs} />
    </div>
  );
};

export default AdminJobsListPage;
