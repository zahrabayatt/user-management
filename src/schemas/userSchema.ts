import { z } from "zod";
import usersService from "../services/users-service";

export const userSchema = z.object({
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

export type UserFormInputs = z.input<typeof userSchema>;
export type UserFormData = z.output<typeof userSchema>;
