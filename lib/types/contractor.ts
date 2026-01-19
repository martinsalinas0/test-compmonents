export interface Contractor {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  hourly_rate: number;
  flat_rate: number;
  tax_id: string;
  insurance_info: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login: string;
  company_name: string;
}
