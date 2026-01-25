import { Button } from "@/components/ui/button";
import FooterLink from "@/components/layouts/FooterLink";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-cerulean">
          Welcome Back
        </h1>
        <p className="text-pacific mt-2">Sign in to continue to ProssFora</p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-cerulean mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 border border-cerulean-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pacific focus:border-transparent transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-cerulean">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-pacific hover:text-pacific-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-cerulean-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pacific focus:border-transparent transition-all"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-yarrow hover:bg-yarrow-500 text-white font-semibold py-3 rounded-lg transition-all"
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6">
        <FooterLink
          text="Don't have an account?"
          linkText="Create an Account"
          href="/sign-up"
        />
      </div>
    </div>
  );
};

export default SignInPage;
