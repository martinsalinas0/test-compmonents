"use client";

import { Customer } from "@/lib/types/customers";
import TableHeader from "./TableHeader";
import Link from "next/link";

interface CustomerTableListProps {
  data: Customer[];
}

const CustomerTableList: React.FC<CustomerTableListProps> = ({ data }) => {
  const columns = ["Name", "Email", "Phone", "Id", "status"];

  return (
    <div className="overflow-x-auto text-center">
      <table className="min-w-full bg-background border border-cerulean-100">
        <TableHeader columns={columns} />
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-4 text-sm text-cerulean"
              >
                No customers found
              </td>
            </tr>
          ) : (
            data.map((c) => (
              <tr key={c.id} className="hover:bg-olive-50 text-center">
                <td className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean ">
                  <Link
                    href={`/admin/customers/${c.id}`}
                    className="hover:text-blue-400"
                  >
                    {c.first_name} {c.last_name}
                  </Link>
                </td>
                <td className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean ">
                  {c.email}
                </td>
                <td className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean ">
                  {c.phone}
                </td>
                <td className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean ">
                  {c.id}
                </td>
                <td className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean ">
                  {c.is_active ? "ACTIVE" : "INACTIVE"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTableList;
