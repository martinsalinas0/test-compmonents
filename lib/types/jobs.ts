export interface Job {
  id: string;
  title: string;
  description: string;
  customer_id: string;
  contractor_id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  status: string;
  priority: string;
  pay_type: string;
  hours_worked: string;
  scheduled_date: string;
  scheduled_time: string;
  started_at: string;
  completed_at: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  cancelled_at: string;
  cancelled_by: string;
  cancellation_reason: string;
}
