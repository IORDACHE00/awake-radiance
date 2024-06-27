import { z } from "zod";

export const noteSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  is_archived: z.boolean(),
  created_at: z.string().transform((v) => new Date(v).toISOString()),
  updated_at: z.string().transform((v) => new Date(v).toISOString()),
});

export type TNote = z.infer<typeof noteSchema>;

export const noteFormDataSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  content: z.string().min(1, { message: "Content is required." }),
  is_archived: z.boolean().optional(),
});

export type TNoteFormData = z.infer<typeof noteFormDataSchema>;
