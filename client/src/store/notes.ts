import { TNote } from "@/schema/note";
import { create } from "zustand";

type TNoteStore = {
  isUpdateOpen: boolean;
  isCreateOpen: boolean;

  note: TNote;
  setNote: (note: TNote) => void;

  toggleUpdate: () => void;
  toggleCreate: () => void;
};

export const useNoteStore = create<TNoteStore>((set) => ({
  isUpdateOpen: false,
  isCreateOpen: false,

  note: {} as TNote,
  setNote: (note: TNote) => set({ note }),

  toggleUpdate: () => set((state) => ({ isUpdateOpen: !state.isUpdateOpen })),
  toggleCreate: () => set((state) => ({ isCreateOpen: !state.isCreateOpen })),
}));
