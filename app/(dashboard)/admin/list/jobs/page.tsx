"use client";

import TablesJobList from "@/components/forList/TablesJobList";

import axios from "axios";
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
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <TablesJobList data={jobs} />
    </div>
  );
};

export default AdminJobsListPage;
