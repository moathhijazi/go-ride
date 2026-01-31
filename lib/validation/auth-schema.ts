import { z } from "zod";


export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, "Min 6 characters"),
});


export type LoginForm = z.infer<typeof loginSchema>;
