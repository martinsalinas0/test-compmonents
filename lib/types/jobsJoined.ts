export type JobsJoined = {
  id: string;
  title: string;
  status: string;
  city: string;
  created_at: string;

  customer: {
    id: string;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
  };
};
