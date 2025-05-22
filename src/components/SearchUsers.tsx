import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import useUserQueryStore from "../store/useUserQueryStore";

const SearchUsers: FC = () => {
  const { userQuery, setSearchQuery } = useUserQueryStore();
  const [searchTerm, setSearchTerm] = useState(userQuery.searchQuery);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(searchTerm ?? "");
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, setSearchQuery]);

  return (
    <TextField.Root
      placeholder="Search by username..."
      value={userQuery.searchQuery}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full max-w-xs"
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" className="text-gray-400" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SearchUsers;
