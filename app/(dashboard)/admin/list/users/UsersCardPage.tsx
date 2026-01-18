"use client";

import React from "react";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

// mock data
const users: User[] = [
  {
    id: "1",
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.j@example.com",
    phone: "+1-555-0101",
    role: "admin",
    is_active: true,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    first_name: "Michael",
    last_name: "Chen",
    email: "michael.c@example.com",
    phone: "+1-555-0102",
    role: "contractor",
    is_active: true,
    created_at: "2024-01-20",
  },
  {
    id: "3",
    first_name: "Emily",
    last_name: "Rodriguez",
    email: "emily.r@example.com",
    phone: "+1-555-0103",
    role: "customer",
    is_active: false,
    created_at: "2024-02-01",
  },
  {
    id: "4",
    first_name: "James",
    last_name: "Wilson",
    email: "james.w@example.com",
    phone: "+1-555-0104",
    role: "contractor",
    is_active: true,
    created_at: "2024-02-10",
  },
  {
    id: "5",
    first_name: "Aisha",
    last_name: "Patel",
    email: "aisha.p@example.com",
    phone: "+1-555-0105",
    role: "customer",
    is_active: true,
    created_at: "2024-02-15",
  },
];

const AdminListUsersPage = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-cerulean">List Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-background border border-cerulean-100">
          <thead className="">
            {/* creates the labled headers, this is just a regular arry that is
            being mapped */}
            <tr>
              {[
                "Name",
                "Email",
                "Phone",
                "Role",
                "Status",
                "Created",
                "martin",
              ].map((label) => (
                <th
                  key={label}
                  className="border-b border-cerulean-100 px-6 py-3 text-left text-sm font-semibold text-cerulean"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
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
                <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
                  Martin
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <p className="mt-4 text-center text-pacific">No users found</p>
      )}
    </div>
  );
};

export default AdminListUsersPage;
