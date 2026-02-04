"use client";

import QuickActionBar from "@/components/layouts/QuickActionBar";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clientConfig } from "@/lib/config";
import type { Customer, Job, Payment } from "@/lib/types/all";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2, response3] = await Promise.all([
          axios.get(`${clientConfig.apiUrl}/customers`),
          axios.get(`${clientConfig.apiUrl}/jobs/status/open`),
          axios.get(`${clientConfig.apiUrl}/payments/successful`),
        ]);
        setCustomers(response1.data.data ?? []);
        setJobs(response2.data.data ?? []);
        setPayments(response3.data.data ?? []);
      } catch (err) {
        console.error(err);
        setError("Error loading dashboard data");
      }
    };
    fetchData();
  }, []);

  const totalPaid = payments.reduce(
    (sum, p) => sum + Number(p.amount),
    0
  );
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-row items-center justify-between m-3 p-2">
        <h1 className="text-3xl font-bold text-cerulean">Admin Dashboard</h1>
        <div>
          <QuickActionBar />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Total Customers</CardTitle>
            <CardDescription className="text-gray-600">
              Active Customers in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-cerulean">{customers.length}</p>
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
            <p className="text-5xl font-bold text-cerulean">{jobs.length}</p>
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
            <p className="text-5xl font-bold text-cerulean">
              ${totalPaid.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <p className="text-sm text-orange-600 font-medium">
              23 need attention
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="border-b bg-cerulean text-white">
            <CardTitle className="text-xl text-center m-1 tracking-widest uppercase">
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border"
            />
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
              <Link
                href="/admin/users/new"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-cerulean hover:text-white transition-colors border border-cerulean-200 font-medium"
              >
                Add New User
              </Link>
              <Link
                href="/admin/jobs/new"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-cerulean hover:text-white transition-colors border border-cerulean-200 font-medium"
              >
                Post New Job
              </Link>
              <Link
                href="/admin/list/jobs/task-requests"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-cerulean hover:text-white transition-colors border border-cerulean-200 font-medium"
              >
                Review Applications
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
