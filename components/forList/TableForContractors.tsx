"use client";

import React from "react";
import TableHeader from "./TableHeader";
import { Contractor } from "@/lib/types/contractor";
import Link from "next/link";

interface TableForContractorsProps {
  data: Contractor[];
}

const TableForContractors: React.FC<TableForContractorsProps> = ({ data }) => {
  const columns = ["Name", "Email", "Phone", "Company", "Status"];

  return (
    <div className="overflow-x-auto text-center">
      <table className="min-w-full bg-background border border-cerulean-100">
        <TableHeader columns={columns} />
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-sm text-cerulean"
              >
                No contractors found
              </td>
            </tr>
          ) : (
            data.map((c) => (
              <tr key={c.id} className="hover:bg-olive-50 text-center">
                <td className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean ">
                  <Link
                    href={`/admin/contractors/${c.id}`}
                    className="hover:text-blue-400"
                  >
                    {c.first_name} {c.last_name}{" "}
                  </Link>
                </td>
                <td className="border-b  border-cerulean-200 px-6 py-4 text-sm text-cerulean">
                  {c.email}
                </td>
                <td className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean">
                  {c.phone}
                </td>
                <td className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean">
                  {c.company_name}
                </td>
                <td className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean">
                  {c.is_active ? "ACTIVE" : "INACTIVE"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableForContractors;
