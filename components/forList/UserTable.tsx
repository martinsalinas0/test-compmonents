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
    <table className="min-w-full bg-card border border-border">
      <TableHeader columns={columns} />
      <tbody>
        {data.map((user) => (
          <tr key={user.id} className="hover:bg-muted/50">
            <td className="border-b border-border px-6 py-4 text-sm text-foreground">
              <Link
                href={`/admin/users/${user.id}`}
                className="hover:text-primary"
              >
                {user.first_name} {user.last_name}
              </Link>
            </td>
            <td className="border-b border-border px-6 py-4 text-sm text-foreground">
              {user.email}
            </td>
            <td className="border-b border-border px-6 py-4 text-sm text-foreground">
              {user.phone ?? "—"}
            </td>
            <td className="border-b border-border px-6 py-4 text-sm">
              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${user.role}`}
              >
                {user.role.toUpperCase()}
              </span>
            </td>
            <td className="border-b border-border px-6 py-4 text-sm">
              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${user.is_active ? "bg-olive-100 text-olive-800" : "bg-red-100 text-red-800"}`}
              >
                {user.is_active ? "ACTIVE" : "INACTIVE"}
              </span>
            </td>

            <td className="border-b border-border flex px-6 py-4 text-sm text-foreground justify-center">
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
