import { FC } from 'react';
import { Table, Flex, Text } from "@radix-ui/themes";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { User } from "../../entities/user";
import DeleteUserDialog from "../DeleteUserDialog";

interface UserRowProps {
  user: User;
  index: number;
  isDragged: boolean;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}

export const UserRow: FC<UserRowProps> = ({
  user,
  index,
  isDragged,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => (
  <Table.Row
    key={user.id}
    className={`hover:bg-gray-50 ${isDragged ? "bg-gray-100" : ""}`}
    draggable
    onDragStart={(e) => onDragStart(e, index)}
    onDragOver={(e) => onDragOver(e, index)}
    onDragEnd={onDragEnd}
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
);