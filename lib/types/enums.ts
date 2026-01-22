// ============================================
// ENUM TYPES
// ============================================

export type UserRole = "admin" | "manager" | "employee";

export type PriorityLevel = "low" | "medium" | "high" | "urgent";

export type TaskStatus = "pending" | "approved" | "rejected";

export type JobStatus =
  | "open"
  | "needs_quote"
  | "quote_pending"
  | "quote_rejected"
  | "approved"
  | "in_progress"
  | "completed"
  | "paid"
  | "cancelled";

export type PayType = "hourly" | "flat";

export type PhotoType = "before" | "during" | "after";

export type NoteType = "internal" | "repair" | "customer_visible";

export type QuoteStatus =
  | "draft"
  | "sent"
  | "approved"
  | "rejected"
  | "expired";

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "paid"
  | "overdue"
  | "cancelled";

export type ContractorInvoiceStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "processed";

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export type EmailStatus = "pending" | "sent" | "failed" | "bounced";
