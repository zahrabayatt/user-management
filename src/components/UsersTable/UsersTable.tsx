import { FC } from "react";
import { Table } from "@radix-ui/themes";
import useUsers from "../../hooks/useUsers";
import useUserStore from "../../store/useUserStore";
import useUserQueryStore from "../../store/useUserQueryStore";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import LoadingUsersTableSkeleton from "../LoadingUsersTableSkeleton";
import { TableHeader } from "./TableHeader";
import { EmptyState } from "./EmptyState";
import { UserRow } from "./UserRow";

export const UsersTable: FC = () => {
  const { loading } = useUsers();
  const users = useUserStore((state) => state.users);
  const sortUsers = useUserStore((state) => state.sortUsers);
  const { userQuery, setSortDirection } = useUserQueryStore();
  const {
    draggedIndex,
    previewUsers,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop();

  const handleSort = () => {
    const newDirection = userQuery.sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    sortUsers(newDirection);
  };

  return (
    <Table.Root variant="surface">
      <TableHeader
        sortDirection={userQuery.sortDirection ?? "asc"}
        onSort={handleSort}
      />

      {loading ? (
        <LoadingUsersTableSkeleton />
      ) : users.length === 0 ? (
        <EmptyState searchQuery={userQuery.searchQuery} />
      ) : (
        <Table.Body>
          {(previewUsers || users).map((user, index) => (
            <UserRow
              key={user.id}
              user={user}
              index={index}
              isDragged={draggedIndex === index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Table.Body>
      )}
    </Table.Root>
  );
};
