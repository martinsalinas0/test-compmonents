"use client";
import TableForContractors from "@/components/forList/ContractorTable";
import { Contractor } from "@/lib/types/contractor";

import axios from "axios";
import { Plus } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const URL = "http://localhost:5000/api/v1";

const ContractorsListPage = () => {
  const [contractors, setContractors] = useState<Contractor[]>([]);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await axios.get(`${URL}/contractors`);
        setContractors(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContractors();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cerulean mb-4">
          Contractors List
        </h1>
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
            href="/admin/users/contractors/new"
            className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              Add Contractor <Plus size={18} />
            </div>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <TableForContractors data={contractors} />
      </div>
    </div>
  );
};

export default ContractorsListPage;
