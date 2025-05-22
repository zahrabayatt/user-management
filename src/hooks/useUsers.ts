import { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import useUserQueryStore from "../store/useUserQueryStore";

const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userQuery } = useUserQueryStore();
  const { setUsers } = useUserStore();

  const fetchUsers = async () => {
    setLoading(true);
    const searchParam = userQuery.searchQuery
      ? `username=${userQuery.searchQuery}`
      : "";
    const sortParam = `sortBy=age&order=${userQuery.sortDirection}`;
    const queryParams = [searchParam, sortParam].filter(Boolean).join("&");

    try {
      const response = await fetch(
        `https://682e10ed746f8ca4a47bc516.mockapi.io/api/v1/users?${queryParams}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setUsers([]);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data ?? []);
      setError("");
    } catch (err) {
      setError(`Failed to fetch users. Error: ${err}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userQuery.searchQuery]);

  return { loading, error, refetch: fetchUsers };
};

export default useUsers;
