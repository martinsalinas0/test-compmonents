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
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <QuickActionBar />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Total Customers</CardTitle>
            <CardDescription>
              Active Customers in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-primary">{customers.length}</p>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <p className="text-sm text-olive-600 font-medium">
              +12% from last month
            </p>
          </CardFooter>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Active Jobs</CardTitle>
            <CardDescription>
              Currently open job
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-primary">{jobs.length}</p>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <p className="text-sm text-cerulean-600 font-medium">8 new this week</p>
          </CardFooter>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Monthly Revenue</CardTitle>
            <CardDescription>
              Pending review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-primary">
              ${totalPaid.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <p className="text-sm text-yarrow-600 font-medium">
              23 need attention
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-primary text-primary-foreground">
            <CardTitle className="text-xl text-center m-1 tracking-widest uppercase">
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border border-border"
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Link
                href="/admin/users/new"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors border border-border font-medium"
              >
                Add New User
              </Link>
              <Link
                href="/admin/jobs/new"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors border border-border font-medium"
              >
                Post New Job
              </Link>
              <Link
                href="/admin/list/jobs/task-requests"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors border border-border font-medium"
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
