"use client";

import FooterLink from "@/components/layouts/FooterLink";
import { clientConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${clientConfig.apiUrl}/auth/sign-in`, {
        email: email.trim(),
        password,
      });
      if (res.data?.token || res.data?.data?.token) {
        router.push("/admin");
        return;
      }
      router.push("/admin");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Sign in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-cerulean">
          Welcome Back
        </h1>
        <p className="text-pacific mt-2">Sign in to continue to Prossfora</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-cerulean mb-1.5">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-border focus:ring-ring"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-cerulean">
              Password
            </label>
            <Link
              href="/authentication/forgot-password"
              className="text-sm text-pacific hover:text-pacific-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-border focus:ring-ring"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yarrow hover:bg-yarrow-500 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6">
        <FooterLink
          text="Don't have an account?"
          linkText="Create an Account"
          href="/auth/sign-up"
        />
      </div>
    </div>
  );
}
