"use client";

import CustomerTableList from "@/components/forList/CustomerTableList";
import { Customer } from "@/lib/types/customers";
import axios from "axios";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cerulean mb-4">Customer List</h1>
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-pacific-300 px-4 py-1 bg-white">
            <Image src="/search.png" alt="Search" width={14} height={14} />
            <input
              type="text"
              placeholder="Search contractors..."
              className="w-64 p-2 bg-transparent outline-none text-cerulean-800 placeholder:text-pacific-400"
            />
          </div>

          <Link
            href="/admin/users/customers/new"
            className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              Add Customer <Plus size={18} />
            </div>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <CustomerTableList data={customers} />
      </div>
    </div>
  );
};

export default CustomersListPage;
