export interface Contractor {
  id: string;
  email: string;

  password_hash: string;

  first_name: string;
  last_name: string;
  phone: string;

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

  created_at: string;
  updated_at: string;
  last_login: string | null;
}
