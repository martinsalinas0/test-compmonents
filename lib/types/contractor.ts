export interface Contractor {
  id: string;
  email: string;

  // FIXED: Renamed to match SQL column
  password_hash: string;

  first_name: string;
  last_name: string;
  phone: string;

  // FIXED: These are nullable in SQL, so they must be nullable here
  company_name: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  tax_id: string | null;
  insurance_info: string | null;

  hourly_rate: number;
  flat_rate: number;

  is_active: boolean;
  is_verified: boolean;

  // NOTE: Keep as 'string' for JSON/Frontend, change to 'Date' for Backend/DB
  created_at: string;
  updated_at: string;
  last_login: string | null; // This can be null too
}
