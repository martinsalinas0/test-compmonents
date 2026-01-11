import React from "react";
import TableHeader from "./TableHeader";

interface Job {
  id: string;
  title: string;
  status: string;
  customer_id: string;
}

interface TableJobListProps {
  data: Job[];
}

const TablesJobList: React.FC<TableJobListProps> = ({ data }) => {
  const columns = ["id", "title", "status", "customer"];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-background border border-cerulean-200">
        <TableHeader columns={columns} />
        <tbody className="text-center">
          {data.map((job) => (
            <tr key={job.id} className="">
              <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
                {job.id}
              </td>
              <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-center text-cerulean">
                {job.title}
              </td>
              <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
                {job.status}
              </td>
              <td className="border-b border-cerulean-50 px-6 py-4 text-sm text-cerulean">
                {job.customer_id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablesJobList;
