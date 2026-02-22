"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Settings, Users, CreditCard, Shield } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "prossfora_admin_settings";

type GeneralSettings = {
  companyName: string;
  timeZone: string;
};

function loadGeneral(): GeneralSettings {
  if (typeof window === "undefined")
    return { companyName: "", timeZone: "America/Chicago" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { companyName: "Prossfora", timeZone: "America/Chicago" };
    const parsed = JSON.parse(raw) as Partial<GeneralSettings>;
    return {
      companyName: parsed.companyName ?? "Prossfora",
      timeZone: parsed.timeZone ?? "America/Chicago",
    };
  } catch {
    return { companyName: "Prossfora", timeZone: "America/Chicago" };
  }
}

function saveGeneral(settings: GeneralSettings) {
  if (typeof window === "undefined") return;
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    const merged = existing ? { ...JSON.parse(existing), ...settings } : settings;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [general, setGeneral] = useState<GeneralSettings>({
    companyName: "",
    timeZone: "America/Chicago",
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setGeneral(loadGeneral());
    setHydrated(true);
  }, []);

  const handleSaveGeneral = () => {
    saveGeneral(general);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Settings size={32} />
          Settings
        </h1>
        <p className="text-pacific-600 mt-1">
          Manage general, team, billing, and limits
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} />
              General
            </CardTitle>
            <CardDescription>
              Company name and default preferences (saved in this browser)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Company name
              </label>
              <Input
                placeholder="Prossfora"
                className="max-w-md border-border"
                value={hydrated ? general.companyName : ""}
                onChange={(e) =>
                  setGeneral((prev) => ({ ...prev, companyName: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Time zone
              </label>
              <Input
                placeholder="America/Chicago"
                className="max-w-md border-border"
                value={hydrated ? general.timeZone : ""}
                onChange={(e) =>
                  setGeneral((prev) => ({ ...prev, timeZone: e.target.value }))
                }
              />
            </div>
            <Button
              onClick={handleSaveGeneral}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Save general
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Team
            </CardTitle>
            <CardDescription>
              Invite members and manage roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-pacific-600 mb-4">
              Invite new team members by email. Role-based access can be configured per user.
            </p>
            <Input
              placeholder="email@example.com"
              type="email"
              className="max-w-md border-border mb-2"
            />
            <Button variant="outline" className="border-border text-primary">
              Send invite
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard size={20} />
              Billing
            </CardTitle>
            <CardDescription>
              Plan and payment method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-pacific-600">
              Manage your subscription and payment details. Stripe can be connected here.
            </p>
            <Button variant="outline" className="mt-4 border-border text-primary">
              Manage billing
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} />
              Limits
            </CardTitle>
            <CardDescription>
              Usage limits and quotas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-pacific-600">
              Set limits for users, jobs, or API usage per plan.
            </p>
          </CardContent>
        </Card>
      </div>

      {saved && (
        <p className="mt-4 text-sm text-olive-600 font-medium">
          Settings saved.
        </p>
      )}
    </div>
  );
}
