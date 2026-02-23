"use client";

import TableForContractors from "@/components/forList/ContractorTable";
import SearchBar from "@/components/SearchBar";
import api from "@/lib/api";
import { Contractor } from "@/lib/types/contractor";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ContractorsListPage = () => {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await api.get("contractors/getAllContractors");
        setContractors(response.data.data ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContractors();
  }, []);

  const filteredContractors = useMemo(() => {
    if (!searchQuery.trim()) return contractors;
    const q = searchQuery.toLowerCase();
    return contractors.filter(
      (c) =>
        c.first_name?.toLowerCase().includes(q) ||
        c.last_name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.company_name?.toLowerCase().includes(q)
    );
  }, [contractors, searchQuery]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cerulean mb-4">
          Contractors List
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search contractors..."
            className="md:w-64"
          />

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
        <TableForContractors data={filteredContractors} />
      </div>
    </div>
  );
};

export default ContractorsListPage;
