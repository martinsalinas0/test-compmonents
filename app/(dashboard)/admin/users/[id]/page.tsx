"use client";

import UserProfileCard from "@/components/cards/UserCards";
import { User } from "@/lib/types/user";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleUserPage = () => {
  const params = useParams();
  const userId = params?.id as string | undefined;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    axios
      .get(`http://localhost:5000/api/v1/users/${userId}`)
      .then((response) => {
        const userData = response.data?.data;

        if (!userData) {
          setError("User not found.");
        } else {
          setUser(userData);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  // UI States
  if (loading) return <div className="p-4">Loading user...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!user) return <div className="p-4">No user found.</div>;

  return (
    <div className="p-4">
      <UserProfileCard user={user} />
    </div>
  );
};

export default SingleUserPage;
