"use client";

import { Contractor } from "@/lib/types/contractor";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleContractorPage = () => {
  const params = useParams();
  const id = params?.id;

  const [contractor, setContractor] = useState<Contractor | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const skills = ["hands", "computers", "CNC machine"];
  const avatarUrl = "https://randomuser.me/api/portraits/men/19.jpg";

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchContractor = async () => {
      setLoading(true);
      try {
        // FIXED: Endpoint matches the variable name
        const res = await axios.get(
          `http://localhost:5000/api/v1/contractors/${id}`,
          { signal: controller.signal },
        );
        setContractor(res.data.data);
      } catch (err: unknown) {
        // If cancelled, return immediately so we don't process errors
        if (axios.isCancel(err)) {
          console.log("Request cancelled");
          return;
        }

        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        // FIXED: Only turn off loading if the request wasn't cancelled
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchContractor();

    return () => {
      controller.abort();
    };
  }, [id, setContractor, setLoading, setError]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!contractor) return null;

  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-8 md:grid-cols-3">
      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={avatarUrl}
              height={150}
              width={150}
              alt="profile pic"
              className="rounded-full"
            />
            <h2 className="text-xl font-bold">
              {contractor.first_name} {contractor.last_name}
            </h2>
            <span className="text-sm text-muted-foreground">
              {contractor.company_name}
            </span>

            <div className="mt-4 flex justify-between w-full text-center text-sm font-medium">
              <div>
                <p>{contractor.id}</p>
                <span className="text-muted-foreground">ID</span>
              </div>
              <div>
                <p>{contractor.address}</p>
                <span className="text-muted-foreground">Address</span>
              </div>
              <div>
                <p>{contractor.state}</p>
                <span className="text-muted-foreground">State</span>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>{contractor.email}</p>
              <p>{contractor.phone}</p>
              <p>{contractor.last_name}</p>
              <a
                href={`tel:${contractor.phone}`}
                className="text-cerulean-700 hover:underline block"
              >
                Call {contractor.first_name}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 font-semibold text-cerulean-900">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-cerulean-100 px-2 py-1 text-xs font-medium text-cerulean-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="md:col-span-2 space-y-6">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-cerulean-900">
            Latest Activity
          </h3>
          <ul className="space-y-2"></ul>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-cerulean-900">
            Transaction History
          </h3>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Product</th>
                <th className="border-b p-2">Status</th>
                <th className="border-b p-2">Date</th>
                <th className="border-b p-2">Amount</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>

      <div className="md:col-span-3 lg:col-span-1">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-cerulean-900">
            Connections
          </h3>
          <ul className="space-y-2">
            <li>No connections yet.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleContractorPage;
