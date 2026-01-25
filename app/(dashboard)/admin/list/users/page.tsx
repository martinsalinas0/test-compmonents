"use client";

import TableForList from "@/components/forList/TableForUsersList";
import SearchBar from "@/components/SeachBar";
import { User } from "@/lib/types/user";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

const URL = "http://localhost:5000/api/v1";

const UsersListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${URL}/users`);
        setUsers(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    const q = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(q) ||
        user.last_name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.phone.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q) ||
        (user.is_active ? "active" : "inactive").includes(q),
    );
  }, [users, searchQuery]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Users List</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search users..."
            className="md:w-64"
          />

          <Link href="/admin/list/users/new/">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto justify-center md:justify-start">
              <PlusCircle className="w-5 h-5" /> <span>Add User</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg text-center shadow">
        <TableForList data={filteredUsers} />
      </div>
    </div>
  );
};

export default UsersListPage;
