"use client";

import CustomerTableList from "@/components/forList/CustomerTableList";
import { Customer } from "@/lib/types/customers";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:5000/api/v1";
const CustomersListPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${URL}/customers`);
        setCustomers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customer List</h1>
      <div className="overflow-x-auto">
        <CustomerTableList data={customers} />
      </div>
    </div>
  );
};

export default CustomersListPage;
