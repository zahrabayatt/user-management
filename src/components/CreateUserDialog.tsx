import { FC, useState } from "react";
import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "../store/useUserStore";
import usersService from "../services/users-service";
import {
  userSchema,
  UserFormInputs,
  UserFormData,
} from "../schemas/userSchema";

const CreateUserDialog: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const addUser = useUserStore((state) => state.addUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(userSchema),
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) reset();
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      const newUser = await usersService.create(data);
      addUser(newUser);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <Button size="3">Create User</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create New User</Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <TextField.Root
              placeholder="First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <Text size="1" color="red" as="p">
                {errors.firstName.message}
              </Text>
            )}

            <TextField.Root placeholder="Last Name" {...register("lastName")} />
            {errors.lastName && (
              <Text size="1" color="red" as="p">
                {errors.lastName.message}
              </Text>
            )}

            <TextField.Root placeholder="Username" {...register("username")} />
            {errors.username && (
              <Text size="1" color="red" as="p">
                {errors.username.message}
              </Text>
            )}

            <TextField.Root
              type="number"
              placeholder="Age"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && (
              <Text size="1" color="red" as="p">
                {errors.age.message}
              </Text>
            )}

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit">Save</Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateUserDialog;
