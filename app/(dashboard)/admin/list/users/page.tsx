"use client";

import TableForList from "@/components/forList/TableForUsersList";
import { User } from "@/lib/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

// const users: User[] = [
//   {
//     id: "1",
//     first_name: "Sarah",
//     last_name: "Johnson",
//     email: "sarah.j@example.com",
//     phone: "+1-555-0101",
//     role: "admin",
//     is_active: true,
//     created_at: "2024-01-15",
//   },
//   {
//     id: "2",
//     first_name: "Michael",
//     last_name: "Chen",
//     email: "michael.c@example.com",
//     phone: "+1-555-0102",
//     role: "contractor",
//     is_active: true,
//     created_at: "2024-01-20",
//   },
//   {
//     id: "3",
//     first_name: "Emily",
//     last_name: "Rodriguez",
//     email: "emily.r@example.com",
//     phone: "+1-555-0103",
//     role: "customer",
//     is_active: false,
//     created_at: "2024-02-01",
//   },
//   {
//     id: "4",
//     first_name: "James",
//     last_name: "Wilson",
//     email: "james.w@example.com",
//     phone: "+1-555-0104",
//     role: "contractor",
//     is_active: true,
//     created_at: "2024-02-10",
//   },
//   {
//     id: "5",
//     first_name: "Aisha",
//     last_name: "Patel",
//     email: "aisha.p@example.com",
//     phone: "+1-555-0105",
//     role: "customer",
//     is_active: true,
//     created_at: "2024-02-15",
//   },
// ];

const URL = process.env.NEXT_PUBLIC_API_URL_PROSS;

const UsersListPage = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <div>
      <h1>Users List</h1>
      <div>add</div>
      <div className="overflow-x-auto">
        <TableForList data={users} />
      </div>
    </div>
  );
};

export default UsersListPage;
