"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Briefcase,
  Building2,
  LayoutDashboard,
  UserCog,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";

const DashboardHomePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Choose a dashboard or go to the main admin panel
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin">
          <Card className="shadow-sm hover:shadow-md transition-shadow h-full border-primary/20 hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Admin Dashboard</CardTitle>
                <CardDescription>
                  KPIs, needs attention, recent activity, and revenue
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/list/users">
          <Card className="shadow-sm hover:shadow-md transition-shadow h-full hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">Users</CardTitle>
                <CardDescription>
                  Employees, contractors, and customers
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/list/jobs">
          <Card className="shadow-sm hover:shadow-md transition-shadow h-full hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Briefcase className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">Jobs</CardTitle>
                <CardDescription>
                  All jobs, active, completed, task requests
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/analytics">
          <Card className="shadow-sm hover:shadow-md transition-shadow h-full hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <BarChart3 className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">Analytics</CardTitle>
                <CardDescription>
                  Platform analytics and key metrics
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Role-specific dashboards</CardTitle>
          <CardDescription>
            Quick links to dashboards by role (for full admin access use the Admin Dashboard above)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/admin/employee"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-accent transition-colors"
            >
              <UserCog className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Employee Dashboard</span>
            </Link>
            <Link
              href="/admin/customer"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-accent transition-colors"
            >
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Customer Dashboard</span>
            </Link>
            <Link
              href="/admin/contractor"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-accent transition-colors"
            >
              <Wrench className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Contractor Dashboard</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHomePage;
