"use client";

import TableForList from "@/components/forList/TableForUsersList";
import { User } from "@/lib/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:5000/api/v1";

const UsersListPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${URL}/users/role/employee`);
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
