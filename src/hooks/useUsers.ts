import { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import useUserQueryStore from "../store/useUserQueryStore";
import usersService from "../services/users-service";

const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userQuery } = useUserQueryStore();
  const { setUsers } = useUserStore();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getAll({
        searchQuery: userQuery.searchQuery,
        sortDirection: userQuery.sortDirection,
      });
      setUsers(data);
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
