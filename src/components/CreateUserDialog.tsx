import { FC, useState } from "react";
import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useUserStore from "../store/useUserStore";
import usersService from "../services/users-service";

const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .refine(async (username) => {
      try {
        const exists = await usersService.checkUsername(username);
        return !exists;
      } catch {
        return true;
      }
    }, "Username is already taken"),
  age: z
    .number()
    .min(18, "Must be at least 18")
    .max(100, "Must be less than 100"),
});

type UserFormInputs = z.input<typeof userSchema>;
type UserFormData = z.output<typeof userSchema>;

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

            <TextField.Root
              placeholder="Username"
              {...register("username")} // Remove the validate option
            />
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
