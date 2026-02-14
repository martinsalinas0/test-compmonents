"use client";

import TableHeader from "@/components/forList/TableHeader";
import QuickActionBar from "@/components/layouts/QuickActionBar";
import SearchBar from "@/components/SearchBar";
import { clientConfig } from "@/lib/config";
import type { Contractor } from "@/lib/types/contractor";
import type { Customer } from "@/lib/types/customers";
import type { User } from "@/lib/types/user";
import axios from "axios";
import { ChevronDown, Info, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export type ListPersonRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  roleOrType: string;
  is_active: boolean;
  detailUrl: string;
};

function normalizeUser(u: User): ListPersonRow {
  return {
    id: u.id,
    first_name: u.first_name,
    last_name: u.last_name,
    email: u.email,
    phone: u.phone ?? null,
    roleOrType: u.role,
    is_active: u.is_active,
    detailUrl: `/admin/users/${u.id}`,
  };
}

function normalizeCustomer(c: Customer): ListPersonRow {
  return {
    id: c.id,
    first_name: c.first_name,
    last_name: c.last_name,
    email: c.email,
    phone: c.phone ?? null,
    roleOrType: "customer",
    is_active: c.is_active,
    detailUrl: `/admin/users/customers/${c.id}`,
  };
}

function normalizeContractor(c: Contractor): ListPersonRow {
  return {
    id: c.id,
    first_name: c.first_name,
    last_name: c.last_name,
    email: c.email,
    phone: c.phone ?? null,
    roleOrType: "contractor",
    is_active: c.is_active,
    detailUrl: `/admin/users/contractors/${c.id}`,
  };
}

const UsersListPage = () => {
  const [allPeople, setAllPeople] = useState<ListPersonRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [usersRes, employeesRes, customersRes, contractorsRes] =
          await Promise.all([
            axios.get(`${clientConfig.apiUrl}/users`),
            axios.get(`${clientConfig.apiUrl}/users/role/employee`),
            axios.get(`${clientConfig.apiUrl}/customers`),
            axios.get(`${clientConfig.apiUrl}/contractors`),
          ]);

        const users: User[] = usersRes.data.data ?? [];
        const employees: User[] = employeesRes.data.data ?? [];
        const customers: Customer[] = customersRes.data.data ?? [];
        const contractors: Contractor[] = contractorsRes.data.data ?? [];

        const userById = new Map<string, User>();
        users.forEach((u) => userById.set(u.id, u));
        employees.forEach((e) => userById.set(e.id, e));
        const mergedUsers = [...userById.values()];

        const rows: ListPersonRow[] = [
          ...mergedUsers.map(normalizeUser),
          ...customers.map(normalizeCustomer),
          ...contractors.map(normalizeContractor),
        ];
        setAllPeople(rows);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filteredPeople = useMemo(() => {
    if (!searchQuery.trim()) return allPeople;
    const q = searchQuery.toLowerCase();
    return allPeople.filter(
      (p) =>
        p.first_name.toLowerCase().includes(q) ||
        p.last_name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        (p.phone ?? "").toLowerCase().includes(q) ||
        p.roleOrType.toLowerCase().includes(q) ||
        (p.is_active ? "active" : "inactive").includes(q),
    );
  }, [allPeople, searchQuery]);

  const columns = ["Name", "Email", "Phone", "Role / Type", "Status", "ID"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary">Users List</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search users, customers, contractors..."
            className="md:w-64"
          />
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Open <ChevronDown />{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <QuickActionBar />

          <Link href="/admin/users/new/">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto justify-center md:justify-start">
              <PlusCircle className="w-5 h-5" /> <span>Add User</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-card rounded-lg border border-border shadow-sm">
        {loading ? (
          <div className="p-6 text-muted-foreground">Loading...</div>
        ) : (
          <table className="min-w-full bg-card border border-border">
            <TableHeader columns={columns} />
            <tbody>
              {filteredPeople.map((person) => (
                <tr
                  key={`${person.roleOrType}-${person.id}`}
                  className="hover:bg-muted/50"
                >
                  <td className="border-b border-border px-6 py-4 text-sm text-foreground">
                    <Link
                      href={person.detailUrl}
                      className="hover:text-primary"
                    >
                      {person.first_name} {person.last_name}
                    </Link>
                  </td>
                  <td className="border-b border-border px-6 py-4 text-sm text-foreground">
                    {person.email}
                  </td>
                  <td className="border-b border-border px-6 py-4 text-sm text-foreground">
                    {person.phone ?? "—"}
                  </td>
                  <td className="border-b border-border px-6 py-4 text-sm">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${person.roleOrType}`}
                    >
                      {person.roleOrType.toUpperCase()}
                    </span>
                  </td>
                  <td className="border-b border-border px-6 py-4 text-sm">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${person.is_active ? "bg-olive-100 text-olive-800" : "bg-red-100 text-red-800"}`}
                    >
                      {person.is_active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td className="border-b border-border flex px-6 py-4 text-sm text-foreground justify-center">
                    {person.id.slice(-6)}
                    <Link href={person.detailUrl}>
                      <Info className="ml-2" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersListPage;
