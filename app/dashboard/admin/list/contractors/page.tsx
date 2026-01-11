"use client";
import TableForContractors from "@/components/forList/TableForContractors";
import TableForList from "@/components/forList/TableForUsersList";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = process.env.NEXT_PUBLIC_API_URL_PROSS;

export interface Contractor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

const ContractorsListPage = () => {
  const [contractors, setContractors] = useState<Contractor[]>([]);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await axios.get(`${URL}/api/contractors/all`);
        setContractors(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContractors();
  }, []);

  return (
    <div>
      <TableForContractors data={contractors} />
    </div>
  );
};

export default ContractorsListPage;
