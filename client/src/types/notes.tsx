import { TNoteFormData } from "@/schema/note";

export type GetNotesParams = {
  search: string;
  isArchived: boolean;
};

export type UpdateNoteParams = {
  noteId: string;
  payload: TNoteFormData;
};
