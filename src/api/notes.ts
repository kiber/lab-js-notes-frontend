import notesApi from "./axiosNotes";
import type { ApiResponse, Note, NotesMeta } from "../types/note.types";

export const getNotes = async () => {
  const response = await notesApi.get<ApiResponse<Note[], NotesMeta>>("/notes");
  return response.data;
};

export const createNote = async (data: Partial<Note>) => {
  const response = await notesApi.post<ApiResponse<Note>>("/notes", data);
  return response.data;
};

export const updateNote = async (id: string, data: Partial<Note>) => {
  const response = await notesApi.put<ApiResponse<Note>>(`/notes/${id}`, data);
  return response.data;
};

export const deleteNote = (id: string) =>
  notesApi.delete<ApiResponse<null>>(`/notes/${id}`);
