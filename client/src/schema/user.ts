import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  created_at: z.string().transform((value) => new Date(value).toISOString()),
});

export type TUser = z.infer<typeof userSchema>;
