"use client";

import React from "react";
import TableHeader from "@/components/forList/TableHeader";

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
interface TableForListProps {
  data: User[];
}

// reusable table component
const TableForList: React.FC<TableForListProps> = ({ data }) => {
  const columns = ["Name", "Email", "Phone", "Role", "Status", "Created"];

  return (
    <div className="overflow-x-auto">
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
                  className={`rounded-md px-2 py-1 text-xs font-medium ${user.is_active}`}
                >
                  {user.is_active ? "ACTIVE" : "INACTIVE"}
                </span>
              </td>
              <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-pacific">
                {user.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableForList;
