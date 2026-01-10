"use client";

import React, { useState } from "react";

//mock data
const users: User[] = [
  {
    id: "1",
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.j@example.com",
    phone: "+1-555-0101",
    role: "Software Engineer",
    is_active: true,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    first_name: "Michael",
    last_name: "Chen",
    email: "michael.c@example.com",
    phone: "+1-555-0102",
    role: "Product Manager",
    is_active: true,
    created_at: "2024-01-20",
  },
  {
    id: "3",
    first_name: "Emily",
    last_name: "Rodriguez",
    email: "emily.r@example.com",
    phone: "+1-555-0103",
    role: "UX Designer",
    is_active: false,
    created_at: "2024-02-01",
  },
  {
    id: "4",
    first_name: "James",
    last_name: "Wilson",
    email: "james.w@example.com",
    phone: "+1-555-0104",
    role: "Data Analyst",
    is_active: true,
    created_at: "2024-02-10",
  },
  {
    id: "5",
    first_name: "Aisha",
    last_name: "Patel",
    email: "aisha.p@example.com",
    phone: "+1-555-0105",
    role: "Marketing Manager",
    is_active: true,
    created_at: "2024-02-15",
  },
];

//create the User interface
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

//func to render each row
//returns the react element

const AdminListUsersPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - List Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 border-b">
                  {user.first_name} {user.last_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">
                  {user.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">
                  {user.role}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">
                  {user.is_active ? "Active" : "Inactive"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">
                  {user.created_at}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users found</p>
      )}
    </div>
  );
};

export default AdminListUsersPage;
