import {
  ContractorInvoiceStatus,
  EmailStatus,
  InvoiceStatus,
  JobStatus,
  NoteType,
  PaymentStatus,
  PayType,
  PhotoType,
  PriorityLevel,
  QuoteStatus,
  TaskStatus,
  UserRole,
} from "./enums";

export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  last_login: Date | null;
}

// ============================================
// CONTRACTORS
// ============================================
export interface Contractor {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  company_name: string | null;
  phone: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  hourly_rate: number;
  flat_rate: number;
  tax_id: string | null;
  insurance_info: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login: Date | null;
}

// ============================================
// CUSTOMERS
// ============================================
export interface Customer {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  billing_address: string | null;
  billing_city: string | null;
  billing_state: string | null;
  billing_zip: string | null;
  stripe_customer_id: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: string; // FK -> User
}

// ============================================
// REFRESH TOKENS
// ============================================
export interface RefreshToken {
  id: string;
  token_hash: string;
  user_id: string | null; // FK -> User
  contractor_id: string | null; // FK -> Contractor
  customer_id: string | null; // FK -> Customer
  user_type: string;
  expires_at: Date;
  created_at: Date;
  revoked_at: Date | null;
}

// ============================================
// TASK REQUESTS
// ============================================
export interface TaskRequest {
  id: string;
  title: string;
  description: string;
  customer_id: string | null; // FK -> Customer
  address: string | null;
  priority: PriorityLevel;
  status: TaskStatus;
  rejection_reason: string | null;
  submitted_by: string; // FK -> User
  reviewed_by: string | null; // FK -> User
  reviewed_at: Date | null;
  job_id: string | null; // FK -> Job
  created_at: Date;
  updated_at: Date;
}

// ============================================
// JOBS
// ============================================
export interface Job {
  id: string;
  title: string;
  description: string;
  customer_id: string; // FK -> Customer
  contractor_id: string | null; // FK -> Contractor
  address: string;
  city: string;
  state: string;
  zip_code: string;
  status: JobStatus;
  priority: PriorityLevel;
  pay_type: PayType | null;
  hours_worked: number | null;
  scheduled_date: Date | null;
  scheduled_time: string | null; // Postgres TIME type usually returns as string "14:30:00"
  started_at: Date | null;
  completed_at: Date | null;
  created_by: string; // FK -> User
  created_at: Date;
  updated_at: Date;
  cancelled_at: Date | null;
  cancelled_by: string | null; // FK -> User
  cancellation_reason: string | null;
}

// ============================================
// JOB PHOTOS
// ============================================
export interface JobPhoto {
  id: string;
  job_id: string; // FK -> Job
  photo_url: string;
  thumbnail_url: string | null;
  photo_type: PhotoType;
  caption: string | null;
  uploaded_by_contractor: string | null; // FK -> Contractor
  uploaded_by_user: string | null; // FK -> User
  created_at: Date;
}

// ============================================
// JOB NOTES
// ============================================
export interface JobNote {
  id: string;
  job_id: string; // FK -> Job
  note: string;
  note_type: NoteType;
  created_by_user: string | null; // FK -> User
  created_by_contractor: string | null; // FK -> Contractor
  created_at: Date;
}

// ============================================
// QUOTES
// ============================================
export interface Quote {
  id: string;
  job_id: string; // FK -> Job
  customer_id: string; // FK -> Customer
  quote_number: string;
  hourly_rate: number;
  estimated_hours: number | null;
  flat_amount: number | null;
  materials_cost: number | null;
  subtotal: number;
  tax_rate: number | null;
  tax_amount: number | null;
  total: number;
  description: string | null;
  terms: string | null;
  valid_until: Date | null;
  status: QuoteStatus;
  sent_at: Date | null;
  responded_at: Date | null;
  rejection_reason: string | null;
  created_by: string; // FK -> User
  created_at: Date;
  updated_at: Date;
  version: number;
}

// ============================================
// QUOTE LINE ITEMS
// ============================================
export interface QuoteLineItem {
  id: string;
  quote_id: string; // FK -> Quote
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  sort_order: number;
}

// ============================================
// CUSTOMER INVOICES
// ============================================
export interface CustomerInvoice {
  id: string;
  job_id: string; // FK -> Job
  customer_id: string; // FK -> Customer
  quote_id: string | null; // FK -> Quote
  invoice_number: string;
  subtotal: number;
  tax_rate: number | null;
  tax_amount: number | null;
  total: number;
  status: InvoiceStatus;
  due_date: Date;
  sent_at: Date | null;
  viewed_at: Date | null;
  paid_at: Date | null;
  payment_method: string | null;
  stripe_payment_intent_id: string | null;
  stripe_invoice_id: string | null;
  notes: string | null;
  created_by: string; // FK -> User
  created_at: Date;
  updated_at: Date;
}

// ============================================
// CONTRACTOR INVOICES
// ============================================
export interface ContractorInvoice {
  id: string;
  job_id: string; // FK -> Job
  contractor_id: string; // FK -> Contractor
  invoice_number: string;
  pay_type: PayType;
  hourly_rate: number | null;
  hours_worked: number | null;
  flat_rate: number | null;
  total: number;
  status: ContractorInvoiceStatus;
  rejection_reason: string | null;
  approved_by: string | null; // FK -> User
  approved_at: Date | null;
  processed_at: Date | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

// ============================================
// PAYMENTS
// ============================================
export interface Payment {
  id: string;
  customer_invoice_id: string; // FK -> CustomerInvoice
  customer_id: string; // FK -> Customer
  amount: number;
  stripe_payment_intent_id: string;
  stripe_charge_id: string | null;
  status: PaymentStatus;
  payment_method_type: string | null;
  card_last_four: string | null;
  card_brand: string | null;
  failure_reason: string | null;
  refunded_amount: number | null;
  refunded_at: Date | null;
  created_at: Date;
}

// ============================================
// NOTIFICATIONS
// ============================================
export interface Notification {
  id: string;
  user_id: string | null; // FK -> User
  contractor_id: string | null; // FK -> Contractor
  customer_id: string | null; // FK -> Customer
  type: string;
  title: string;
  message: string;
  data: Record<string, string> | null; // JSONB
  read_at: Date | null;
  created_at: Date;
}

// ============================================
// EMAIL LOG
// ============================================
export interface EmailLog {
  id: string;
  to_email: string;
  subject: string;
  template: string;
  status: EmailStatus;
  related_type: string | null;
  related_id: string | null;
  sent_at: Date | null;
  error_message: string | null;
  created_at: Date;
}

// ============================================
// AUDIT LOG
// ============================================
export interface AuditLog {
  id: string;
  user_id: string | null; // FK -> User
  contractor_id: string | null; // FK -> Contractor
  customer_id: string | null; // FK -> Customer
  action: string;
  entity_type: string;
  entity_id: string;
  old_values: Record<string, null> | null; // JSONB
  new_values: Record<string, null> | null; // JSONB
  ip_address: string | null;
  user_agent: string | null;
  created_at: Date;
}

// ============================================
// SETTINGS
// ============================================
export interface Setting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  updated_by: string | null; // FK -> User
  updated_at: Date;
}
