import notesApi from "./axiosNotes";
import type { Note } from "../types/note.types";

export const getNotes = () =>
  notesApi.get<Note[]>("/notes");

export const createNote = (data: Partial<Note>) =>
  notesApi.post<Note>("/notes", data);

export const updateNote = (id: string, data: Partial<Note>) =>
  notesApi.put<Note>(`/notes/${id}`, data);

export const deleteNote = (id: string) =>
  notesApi.delete(`/notes/${id}`);
