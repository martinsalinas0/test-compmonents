import React from "react";

interface UserCardProps {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
    is_active: boolean;
  };
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="border border-cerulean-200 bg-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between border-b border-cerulean-100 pb-2">
          <h2 className="text-lg font-semibold text-cerulean">
            {user.first_name} {user.last_name}
          </h2>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${user.role}`}
          >
            {user.role.toUpperCase()}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-pacific font-medium">Email:</span>
            <span className="text-cerulean truncate ml-2">{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-pacific font-medium">Phone:</span>
            <span className="text-cerulean">{user.phone || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-pacific font-medium">Status:</span>
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                user.is_active
                  ? "bg-olive-50 text-olive"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {user.is_active ? "ACTIVE" : "INACTIVE"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
