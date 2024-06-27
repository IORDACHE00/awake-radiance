import { TNote, TNoteFormData } from "@/schema/note";
import { queryBuilder } from "@/utils/query-builder";

const BASE_API_URL = import.meta.env.VITE_APP_BASE_URL;

export async function getNotes({
  search,
  isArchived,
  pageParam,
}: {
  search: string;
  isArchived: boolean;
  pageParam: number;
}): Promise<TNote[]> {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const constructedQuery = queryBuilder("notes", {
    search,
    isArchived,
    page: pageParam,
  });

  const response = await fetch(constructedQuery, {
    method: "GET",
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error(
      "Server returned an error during fetching notes. Please try again later."
    );
  }

  const result = await response.json();

  return result.data.notes;
}

export async function getNote(noteId: string): Promise<TNote> {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const response = await fetch(`${BASE_API_URL}/notes/${noteId}`, {
    method: "GET",
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error(
      "Server returned an error during fetching note. Please try again later."
    );
  }

  const result = await response.json();

  return result.data.note;
}

export async function createNote(payload: TNoteFormData): Promise<TNote> {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const response = await fetch(`${BASE_API_URL}/notes`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error(
      "Server returned an error during creating note. Please try again later."
    );
  }

  const result = await response.json();

  return result.data.note;
}

export async function updateNote({
  payload,
  noteId,
}: {
  payload: TNoteFormData;
  noteId: string;
}): Promise<void> {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const response = await fetch(`${BASE_API_URL}/notes/${noteId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error(
      "Server returned an error during updating note. Please try again later."
    );
  }

  const result = await response.json();

  return result.data.note;
}

export async function deleteNote(noteId: string): Promise<void> {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const response = await fetch(`${BASE_API_URL}/notes/${noteId}`, {
    method: "DELETE",
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error(
      "Server returned an error during deleting note. Please try again later."
    );
  }

  return await response.json();
}
