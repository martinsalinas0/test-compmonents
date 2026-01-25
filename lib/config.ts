// lib/config.ts

// Server-side only variables
export const serverConfig = {
  dbUrl: process.env.DB_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || "5000",
} as const;

// Client-side accessible variables
export const clientConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
} as const;

// Validate server-side variables (only runs on server)
if (typeof window === "undefined") {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
}

// Validate client-side variables (runs everywhere)
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn(
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined - Stripe features may not work"
  );
}
