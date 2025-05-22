import { FC } from "react";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import useUserStore from "../store/useUserStore";
import usersService from "../services/users-service";

interface DeleteUserDialogProps {
  userId: string;
  userName: string;
}

const DeleteUserDialog: FC<DeleteUserDialogProps> = ({ userId, userName }) => {
  const deleteUser = useUserStore((state) => state.deleteUser);

  const handleDelete = async () => {
    try {
      await usersService.delete(userId);
      deleteUser(userId);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton color="red" variant="ghost" size="2">
          <TrashIcon width="16" height="16" />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete User</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete {userName}? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteUserDialog;
