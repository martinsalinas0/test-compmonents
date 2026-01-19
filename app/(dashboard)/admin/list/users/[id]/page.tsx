import UserCard from "@/components/cards/UserCards";

const UserDetailsPage = () => {
  const user = {
    id: "31413",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    phone: "+1 (555) 123-4567",
    role: "admin",
    is_active: true,
    created_at: "2024-01-15T10:30:00Z",
  };

  return (
    <div>
      <UserCard user={user} />
    </div>
  );
};

export default UserDetailsPage;
