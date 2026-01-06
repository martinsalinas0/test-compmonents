"use client";

import UserCard from "@/components/UserCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  is_active: boolean;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/all")
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-pacific">Loading users...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-cerulean mb-6">Dashboard Home</h1>

      <p className="text-sm text-muted mb-4">Total jobs: {users.length}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {users.length === 0 && <p className="text-pacific">No users found</p>}
    </div>
  );
};

export default AdminUsersPage;
