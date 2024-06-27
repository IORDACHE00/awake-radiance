import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import { GetNotesParams, UpdateNoteParams } from "@/types/notes";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../services/notes";
import { queryClient } from "@/App";
import { TNoteFormData } from "@/schema/note";

export function useCreateNote() {
  return useMutation({
    mutationFn: (payload: TNoteFormData) => createNote(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTES],
      }),
  });
}

export function useGetNotes({ search, isArchived }: GetNotesParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_NOTES, search, isArchived],
    queryFn: ({ pageParam }) => getNotes({ search, isArchived, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length ? pages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });
}

export function useGetNote(noteId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTE, noteId],
    queryFn: () => getNote(noteId),
    refetchOnWindowFocus: false,
  });
}

export function useUpdateNote() {
  return useMutation({
    mutationFn: ({ payload, noteId }: UpdateNoteParams) =>
      updateNote({ payload, noteId }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTES],
      }),
  });
}

export function useDeleteNote() {
  return useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTES],
      }),
  });
}
