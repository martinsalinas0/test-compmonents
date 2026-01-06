import React from "react";

interface InfoCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    status: string;
    city: string;
    state: string;
    contractor_id: string | null;
    customer_id: string;
  };
}

const InfoCard = ({ job }: InfoCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-olive-50 text-olive";
      case "in_progress":
        return "bg-cerulean-50 text-cerulean";
      case "open":
        return "bg-yarrow-50 text-yarrow";
      case "approved":
        return "bg-pacific-50 text-pacific";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="border border-cerulean-200 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-cerulean border-b border-cerulean-100 pb-2">
          {job.title}
        </h2>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-pacific font-medium">Description:</span>
            <p className="text-cerulean mt-1">{job.description}</p>
          </div>

          <div className="flex justify-between">
            <span className="text-pacific font-medium">Status:</span>
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
                job.status
              )}`}
            >
              {job.status.replace("_", " ").toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-pacific font-medium">Location:</span>
            <span className="text-cerulean">
              {job.city}, {job.state}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-pacific font-medium">Contractor:</span>
            <span className="text-cerulean">
              {job.contractor_id ? job.contractor_id.slice(0, 8) : "Unassigned"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
