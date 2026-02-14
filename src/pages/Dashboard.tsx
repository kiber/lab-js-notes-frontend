import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes"; // Notes service
import type { Note } from "../types/note.types";
import { AuthContext } from "../context/AuthContext";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("AuthContext must be used within AuthProvider");
  const { logout } = auth;

  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const res = await getNotes(); // Notes service
        setNotes(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load notes");
        } else {
          setError("Unexpected error occurred");
        }
      }
    };
    loadNotes();
  }, []);

  const handleCreate = async (data: { title: string; content: string }) => {
    try {
      const res = await createNote(data); // Notes service
      setNotes((prev) => [res.data, ...prev]);
    } catch {
      setError("Create failed");
    }
  };

  const handleUpdate = async (id: string, data: { title: string; content: string }) => {
    try {
      const res = await updateNote(id, data); // Notes service
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
    } catch {
      setError("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id); // Notes service
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch {
      setError("Delete failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Notes Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <NoteForm onSubmit={handleCreate} submitLabel="Add Note" />

      <NoteList notes={notes} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default Dashboard;
