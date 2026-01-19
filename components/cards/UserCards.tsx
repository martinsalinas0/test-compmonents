"use client";

import { Ellipsis } from "lucide-react";
import React from "react";

// User type definition
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md border border-cerulean-100 overflow-hidden">
        <div className="bg-linear-to-r from-cerulean to-pacific h-32 text-white">
          User Name Profile
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center gap-4 -mt-16 mb-6">
            <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-cerulean">
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </div>
            <div className="mt-16">
              <h1 className="text-3xl font-bold text-cerulean">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-pacific text-sm mt-1">
                {user.role.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-cerulean border-b border-cerulean-100 pb-2">
                Contact Information
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-pacific font-medium">
                    Email
                  </label>
                  <p className="text-cerulean">{user.email}</p>
                </div>

                <div>
                  <label className="text-sm text-pacific font-medium">
                    Phone
                  </label>
                  <p className="text-cerulean">{user.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-cerulean border-b border-cerulean-100 pb-2">
                Account Details
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-pacific font-medium">
                    User ID
                  </label>
                  <p className="text-cerulean font-mono text-sm">{user.id}</p>
                </div>

                <div>
                  <label className="text-sm text-pacific font-medium">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium `}
                    >
                      {user.is_active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-pacific font-medium">
                    Member Since
                  </label>
                  <p className="text-cerulean">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-cerulean-100">
            <button className="px-6 py-2 bg-cerulean text-white rounded-md hover:bg-pacific transition-colors">
              Edit Profile
            </button>
            <button className="px-6 py-2 bg-white border border-cerulean-100 text-cerulean rounded-md hover:bg-olive-50 transition-colors">
              Reset Password
            </button>
            <button className="px-6 py-2 bg-white border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors">
              {user.is_active ? "Deactivate" : "Activate"}
            </button>
            <Ellipsis />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
