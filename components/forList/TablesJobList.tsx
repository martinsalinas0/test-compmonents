"use client";

import React from "react";
import Link from "next/link";
import TableHeader from "./TableHeader";
import { JobsJoined } from "@/lib/types/jobsJoined";

interface TableJobsForListProps {
  data: JobsJoined[];
}

const TableJobsForList: React.FC<TableJobsForListProps> = ({ data }) => {
  const columns = ["ID", "Title", "Status", "Customer", "City"];

  return (
    <div className="overflow-x-auto rounded-xl border border-cerulean-200 bg-background shadow-sm">
      <table className="min-w-full border-collapse">
        <TableHeader columns={columns} />

        <tbody>
          {data.map((job) => (
            <tr key={job.id} className="transition hover:bg-cerulean-50">
              <td className="border-b border-cerulean-100 px-6 py-4 text-sm font-medium text-cerulean-900">
                <Link
                  href={`/admin/jobs/${job.id}`}
                  className="hover:underline"
                >
                  {job.id}
                </Link>
              </td>

              <td className="border-b border-cerulean-100 px-6 py-4 text-sm text-cerulean-800">
                {job.title}
              </td>

              <td className="border-b border-cerulean-100 px-6 py-4 text-sm uppercase tracking-wide text-cerulean-700">
                {job.status}
              </td>

              <td className="border-b border-cerulean-100 px-6 py-4 text-sm text-cerulean-800">
                {job.customer ? (
                  <>
                    {job.customer.first_name} {job.customer.last_name}
                  </>
                ) : (
                  <span className="italic text-cerulean-400">Unassigned</span>
                )}
              </td>

              <td className="border-b border-cerulean-100 px-6 py-4 text-sm text-cerulean-700">
                {job.city ?? "—"}
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-sm text-cerulean-500"
              >
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableJobsForList;
