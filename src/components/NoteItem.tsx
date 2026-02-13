import { useState } from "react";
import type { Note } from "../types/note.types";
import NoteForm from "./NoteForm";

interface Props {
  note: Note;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (
    id: string,
    data: { title: string; content: string }
  ) => Promise<void>;
}

const NoteItem = ({ note, onDelete, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing) {
    return (
      <div style={styles.card}>
        <NoteForm
          initialData={note}
          submitLabel="Update"
          onSubmit={async (data) => {
            await onUpdate(note._id, data);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>

      <div style={styles.actions}>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteItem;

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "12px",
    borderRadius: "6px",
  },
  actions: {
    marginTop: "8px",
    display: "flex",
    gap: "8px",
  },
};
