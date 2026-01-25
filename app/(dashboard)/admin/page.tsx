"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clientConfig } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${clientConfig.apiUrl}/users`);
        setUsers(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.error(err);
        setError("error fetching users");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-cerulean mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Total Users</CardTitle>
            <CardDescription className="text-gray-600">
              Active users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-cerulean">{users.length}</p>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <p className="text-sm text-green-600 font-medium">
              +12% from last month
            </p>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Active Jobs</CardTitle>
            <CardDescription className="text-gray-600">
              Currently open job
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-cerulean">56</p>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <p className="text-sm text-blue-600 font-medium">8 new this week</p>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Monthly Revenue</CardTitle>
            <CardDescription className="text-gray-600">
              Pending review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-cerulean">189</p>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <p className="text-sm text-orange-600 font-medium">
              23 need attention
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card className="shadow-md">
          <CardHeader className="border-b">
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription className="text-gray-600">
              Latest system events
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                New user registered: John Doe
              </p>
              <p className="text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Job posted: Senior Developer
              </p>
              <p className="text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Application received for Marketing Manager
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="border-b">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-cerulean hover:text-white transition-colors border border-cerulean-200 font-medium">
                Add New User
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-cerulean hover:text-white transition-colors border border-cerulean-200 font-medium">
                Post New Job
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-cerulean hover:text-white transition-colors border border-cerulean-200 font-medium">
                Review Applications
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
