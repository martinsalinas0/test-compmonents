"use client";

import TableForList from "@/components/forList/UserTable";
import QuickActionBar from "@/components/layouts/QuickActionBar";
import SearchBar from "@/components/SearchBar";
import api from "@/lib/api";
import { User } from "@/lib/types/user";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("users/role/employee");
        setUsers(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary">Employees</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto ">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search employees..."
            className="md:w-64"
          />
          <QuickActionBar />
          <Link href="/admin/users/customers/new">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto justify-center md:justify-start">
              <PlusCircle className="w-5 h-5" /> <span>Add Customer</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-card rounded-lg border border-border shadow-sm">
        <TableForList data={users} />
      </div>
    </div>
  );
};

export default UsersListPage;
