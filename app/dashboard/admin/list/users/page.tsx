import TableForList from "@/components/forList/TableForUsersList";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

const users: User[] = [
  {
    id: "1",
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.j@example.com",
    phone: "+1-555-0101",
    role: "admin",
    is_active: true,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    first_name: "Michael",
    last_name: "Chen",
    email: "michael.c@example.com",
    phone: "+1-555-0102",
    role: "contractor",
    is_active: true,
    created_at: "2024-01-20",
  },
  {
    id: "3",
    first_name: "Emily",
    last_name: "Rodriguez",
    email: "emily.r@example.com",
    phone: "+1-555-0103",
    role: "customer",
    is_active: false,
    created_at: "2024-02-01",
  },
  {
    id: "4",
    first_name: "James",
    last_name: "Wilson",
    email: "james.w@example.com",
    phone: "+1-555-0104",
    role: "contractor",
    is_active: true,
    created_at: "2024-02-10",
  },
  {
    id: "5",
    first_name: "Aisha",
    last_name: "Patel",
    email: "aisha.p@example.com",
    phone: "+1-555-0105",
    role: "customer",
    is_active: true,
    created_at: "2024-02-15",
  },
];

const AdminListPage = () => {
  return (
    <div>
      AdminListPage
      <table>
        <TableForList data={users} />
      </table>
    </div>
  );
};

export default AdminListPage;
