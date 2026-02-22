"use client";

import { User } from "@/lib/types/user";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="p-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <div className="bg-linear-to-r from-cerulean to-pacific h-32"></div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-16 mb-6">
            <div className="w-32 h-32 rounded-full bg-card border-4 border-card shadow-lg flex items-center justify-center text-4xl font-bold text-cerulean">
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </div>
            <div className="pb-2">
              <h1 className="text-3xl font-bold text-white">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-muted-foreground font-medium mt-1">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
              <span
                className={`inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium ${
                  user.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Contact Information
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground font-medium block mb-1">
                    Email
                  </label>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-cerulean hover:underline"
                  >
                    {user.email}
                  </a>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground font-medium block mb-1">
                    Phone
                  </label>
                  <p className="text-foreground">
                    {user.phone ? (
                      <a
                        href={`tel:${user.phone}`}
                        className="text-cerulean hover:underline"
                      >
                        {user.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Account Details
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground font-medium block mb-1">
                    User ID
                  </label>
                  <p className="text-foreground font-mono text-sm">
                    {user.id.slice(-8)}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground font-medium block mb-1">
                    Member Since
                  </label>
                  <p className="text-foreground">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground font-medium block mb-1">
                    Last Updated
                  </label>
                  <p className="text-foreground">
                    {new Date(user.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground font-medium block mb-1">
                    Last Login
                  </label>
                  <p className="text-foreground">
                    {user.last_login
                      ? new Date(user.last_login).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Never"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
            <Link href={`/admin/users/update/${user.id}`}>
              <button className="px-6 py-2 bg-cerulean text-white rounded-md hover:bg-pacific transition-colors">
                Edit Profile
              </button>
            </Link>
            <button className="px-6 py-2 bg-card border border-border text-foreground rounded-md hover:bg-muted transition-colors">
              Reset Password
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                user.is_active
                  ? "bg-card border border-red-300 text-red-600 hover:bg-red-50"
                  : "bg-card border border-green-300 text-green-600 hover:bg-green-50"
              }`}
            >
              {user.is_active ? "Deactivate Account" : "Activate Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
