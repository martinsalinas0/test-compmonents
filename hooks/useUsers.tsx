import api from "@/lib/api";
import { User } from "@/lib/types/all";
import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchUsers = async () => {
      try {
        const response = await api.get("users/getAllUsers");
        if (!cancelled) setUsers(response.data.data ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  return { users, loading, error };
};
