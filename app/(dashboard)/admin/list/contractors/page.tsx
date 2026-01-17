"use client";
import TableForContractors from "@/components/forList/TableForContractors";
import { Contractor } from "@/lib/types/contractor";

import axios from "axios";
import { useEffect, useState } from "react";

const URL = process.env.NEXT_PUBLIC_API_URL_PROSS;

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
    <div>
      <h1>Contractors list</h1>
      <div className="overflow-x-auto">
        <TableForContractors data={contractors} />
      </div>
    </div>
  );
};

export default ContractorsListPage;
