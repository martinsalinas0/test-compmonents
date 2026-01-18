"use client";

import React from "react";
import TableHeader from "@/components/forList/TableHeader";
import { Menu } from "lucide-react";

// define a User type
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

// props for the component
interface TableForUsersPageListProps {
  data: User[];
}

// reusable table component
const TableForUsersPageList: React.FC<TableForUsersPageListProps> = ({
  data,
}) => {
  const columns = [
    "Name",
    "Email",
    "Phone",
    "Role",
    "Status",
    "Created",
    "...",
  ];

  return (
    <table className="min-w-full bg-background border border-cerulean-100">
      <TableHeader columns={columns} />
      <tbody>
        {data.map((user) => (
          <tr key={user.id} className="hover:bg-olive-50">
            <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
              {user.first_name} {user.last_name}
            </td>
            <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
              {user.email}
            </td>
            <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
              {user.phone}
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
            <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-pacific">
              {new Date(user.created_at).toLocaleDateString()}
            </td>
            <td>
              <Menu />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableForUsersPageList;
