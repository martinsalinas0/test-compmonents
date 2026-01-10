"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/all`)
      .then((response) => setUsers(response.data.data))
      .catch((err) => console.error(err));
  }, []);
  console.log(users.length);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-cerulean mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>Active users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-cerulean">{users.length}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted">+12% from last month</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
            <CardDescription>Currently open positions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-cerulean">56</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted">8 new this week</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Pending review</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-cerulean">189</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted">23 need attention</p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">• New user registered: John Doe</p>
              <p className="text-sm">• Job posted: Senior Developer</p>
              <p className="text-sm">
                • Application received for Marketing Manager
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                Add New User
              </button>
              <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                Post New Job
              </button>
              <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
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
