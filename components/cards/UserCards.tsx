"use client";

import { User } from "@/lib/types/user";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import React from "react";

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-pacific h-32 text-primary-foreground"></div>

        <div className="px-6 pb-6">
          <div className="flex items-center gap-4 -mt-16 mb-6">
            <div className="w-32 h-32 rounded-full bg-card border-4 border-card shadow-lg flex items-center justify-center text-4xl font-bold text-primary">
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </div>
            <div className="mt-16">
              <h1 className="text-3xl font-bold text-primary">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {user.role.toUpperCase()}
              </p>

              <p className="text-muted-foreground font-semibold text-xs mt-1">
                {user.is_active ? "active" : "inactive"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary border-b border-border pb-2">
                Contact Information
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground font-medium">
                    Email
                  </label>
                  <p className="text-foreground">{user.email}</p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground font-medium">
                    Password
                  </label>
                  <p className="text-foreground">•••••••</p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground font-medium">
                    Phone
                  </label>
                  <p className="text-foreground">{user.phone ?? "—"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary border-b border-border pb-2">
                Account Details
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground font-medium">
                    User ID
                  </label>
                  <p className="text-foreground font-mono text-sm">{user.id}</p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground font-medium">
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
<label className="text-sm text-muted-foreground font-medium">
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
                  <span>
                    <label className="text-sm text-muted-foreground font-medium">
                      last updated at
                    </label>
                    <p>
                      {new Date(user.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </span>
                  <span>
                    <label className="text-sm text-muted-foreground font-medium">
                      last login at
                    </label>
                    <p>
                      {" "}
                      {user.last_login
                      ? new Date(user.last_login).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Never"}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
            <Link href={`/admin/users/update/${user.id}`}>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Edit Profile
              </button>
            </Link>
            <button className="px-6 py-2 bg-card border border-border text-primary rounded-md hover:bg-muted transition-colors">
              Reset Password
            </button>
            <button className="px-6 py-2 bg-card border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors">
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
