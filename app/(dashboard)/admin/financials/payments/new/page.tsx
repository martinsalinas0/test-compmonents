"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function NewPaymentPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            New payment
          </CardTitle>
          <CardDescription>
            Create a new payment. This form will be wired to the API when the
            backend endpoint is available.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Payment creation (e.g. record manual payment, link to Stripe) can be
            added here.
          </p>
          <Link href="/admin/list/financials/payments">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to payments
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
