import { FC } from "react";
import { Table, Text, Flex, IconButton } from "@radix-ui/themes";
import {
  CaretDownIcon,
  CaretUpIcon,
  DragHandleDots2Icon,
} from "@radix-ui/react-icons";
import useUserStore from "../store/useUserStore";
import useUserQueryStore from "../store/useUserQueryStore";
import useDragAndDrop from "../hooks/useDragAndDrop";
import useUsers from "../hooks/useUsers";
import DeleteUserDialog from "./DeleteUserDialog";

export const UsersTable: FC = () => {
  const { loading } = useUsers();
  const users = useUserStore((state) => state.users);
  const sortUsers = useUserStore((state) => state.sortUsers);
  const { userQuery, setSortDirection } = useUserQueryStore();
  const { draggedIndex, handleDragStart, handleDragOver, handleDragEnd } =
    useDragAndDrop();

  const handleSort = () => {
    const newDirection = userQuery.sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    sortUsers(newDirection);
  };

  if (loading) {
    return (
      <Table.Row>
        <Table.Cell colSpan={3}>
          <Flex align="center" justify="center" className="py-8">
            <Text className="text-gray-500">Loading users...</Text>
          </Flex>
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell className="font-semibold">
            Full Name
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="font-semibold">
            Username
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="font-semibold text-center">
            <Flex align="center" justify="center" gap="2">
              Age
              <IconButton variant="ghost" onClick={handleSort}>
                {userQuery.sortDirection === "asc" ? (
                  <CaretUpIcon />
                ) : (
                  <CaretDownIcon />
                )}
              </IconButton>
            </Flex>
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={3}>
              <Flex
                direction="column"
                align="center"
                justify="center"
                className="py-8 gap-2"
              >
                <Text className="text-gray-500">No users found</Text>
                {userQuery.searchQuery && (
                  <Text className="text-sm text-gray-400">
                    Try adjusting your search query
                  </Text>
                )}
              </Flex>
            </Table.Cell>
          </Table.Row>
        ) : (
          users.map((user, index) => (
            <Table.Row
              key={user.id}
              className={`hover:bg-gray-50 ${
                draggedIndex === index ? "bg-gray-100" : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <Table.Cell>
                <Flex align="center" gap="2">
                  <DragHandleDots2Icon className="text-gray-400 cursor-move" />
                  {user.firstName} {user.lastName}
                </Flex>
              </Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>
                <Flex align="center" justify="between" gap="2">
                  <Text className="text-center flex-1">{user.age}</Text>
                  <DeleteUserDialog
                    userId={user.id}
                    userName={`${user.firstName} ${user.lastName}`}
                  />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
};
