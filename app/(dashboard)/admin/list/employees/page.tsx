"use client";

import TableForList from "@/components/forList/UserTable";
import { clientConfig } from "@/lib/config";
import { User } from "@/lib/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

const UsersListPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${clientConfig.apiUrl}/users/role/employee`);
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

      <div className="overflow-x-auto">
        <TableForList data={users} />
      </div>
    </div>
  );
};

export default UsersListPage;
