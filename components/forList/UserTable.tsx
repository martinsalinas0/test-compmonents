"use client";

import { User } from "@/lib/types/user";
import { Info } from "lucide-react";
import Link from "next/link";
import React from "react";
import TableHeader from "@/components/forList/TableHeader";

interface TableForUsersPageListProps {
  data: User[];
}

// reusable table component
const TableForUsersPageList: React.FC<TableForUsersPageListProps> = ({
  data,
}) => {
  const columns = ["Name", "Email", "Phone", "Role", "Status", "ID"];

  return (
    <table className="min-w-full bg-background border border-cerulean-100">
      <TableHeader columns={columns} />
      <tbody>
        {data.map((user) => (
          <tr key={user.id} className="hover:bg-olive-50">
            <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
              <Link
                href={`/admin/users/${user.id}`}
                className="hover:text-blue-500"
              >
                {user.first_name} {user.last_name}
              </Link>
            </td>
            <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
              {user.email}
            </td>
            <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
              {user.phone ?? "—"}
            </td>
            <td className="border-b border-cerulean-50 px-6 py-4 text-sm">
              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${user.role}`}
              >
                {user.role.toUpperCase()}
              </span>
            </td>
            <td className="border-b border-cerulean-50 px-6 py-4 text-sm">
              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {user.is_active ? "ACTIVE" : "INACTIVE"}
              </span>
            </td>

            <td className="border-b border-cerulean-50 flex px-6 py-4 text-sm text-cerulean justify-center">
              {user.id.slice(-6)}
              <Link href={`/admin/list/users/${user.id}`}>
                <Info className="ml-2" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableForUsersPageList;
