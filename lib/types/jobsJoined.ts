export type JobJoined = {
  // jobs table
  id: string;
  title: string;
  description: string;

  customer_id: string;
  contractor_id: string | null;

  address: string;
  city: string;
  state: string;
  zip_code: string;

  status: string;
  priority: string;

  pay_type: string | null;
  hours_worked: number | null;

  scheduled_date: string | null;
  scheduled_time: string | null;

  started_at: string | null;
  completed_at: string | null;

  cancelled_at: string | null;
  cancelled_by: string | null;
  cancellation_reason: string | null;

  created_by: string;
  created_at: string;
  updated_at: string;

  // joined customer
  customer: {
    id: string;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
  };

  // joined contractor (LEFT JOIN)
  contractor: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
  } | null;
};
