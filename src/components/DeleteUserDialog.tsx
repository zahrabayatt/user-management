import { FC } from "react";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import useUserStore from "../store/useUserStore";

interface DeleteUserDialogProps {
  userId: string;
  userName: string;
}

const DeleteUserDialog: FC<DeleteUserDialogProps> = ({ userId, userName }) => {
  const deleteUser = useUserStore((state) => state.deleteUser);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://682e10ed746f8ca4a47bc516.mockapi.io/api/v1/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
