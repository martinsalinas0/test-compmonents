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
import { HelpCircle, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cerulean flex items-center gap-2">
          <HelpCircle size={32} />
          Support
        </h1>
        <p className="text-pacific-600 mt-1">
          Get help and contact support
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail size={20} />
              Contact support
            </CardTitle>
            <CardDescription>
              Send us a message and we’ll get back to you as soon as we can.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <p className="text-green-600 font-medium">
                Thank you. Your message has been sent. We’ll respond within 1–2 business days.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-1">
                    Name
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="border-cerulean-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className="border-cerulean-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-1">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="How can we help?"
                    className="w-full min-h-[100px] px-3 py-2 border border-cerulean-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pacific"
                    required
                  />
                </div>
                <Button type="submit" className="bg-cerulean hover:bg-pacific text-white">
                  Send message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare size={20} />
              Help resources
            </CardTitle>
            <CardDescription>
              Documentation and FAQs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <a
              href="#"
              className="block p-3 rounded-lg border border-cerulean-100 hover:bg-cerulean-50 text-cerulean font-medium transition-colors"
            >
              Getting started guide
            </a>
            <a
              href="#"
              className="block p-3 rounded-lg border border-cerulean-100 hover:bg-cerulean-50 text-cerulean font-medium transition-colors"
            >
              Jobs and task requests
            </a>
            <a
              href="#"
              className="block p-3 rounded-lg border border-cerulean-100 hover:bg-cerulean-50 text-cerulean font-medium transition-colors"
            >
              Billing and invoices
            </a>
            <p className="text-sm text-pacific-600 pt-2">
              Email: support@prossfora.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
