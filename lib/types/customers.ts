export interface Customer {
  id: string;

  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  stripe_customer_id: string;
  notes: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}
