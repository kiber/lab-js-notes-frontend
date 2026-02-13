import type { Note } from "../types/note.types";
import NoteItem from "./NoteItem";

interface Props {
  notes: Note[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (
    id: string,
    data: { title: string; content: string }
  ) => Promise<void>;
}

const NoteList = ({ notes, onDelete, onUpdate }: Props) => {
  if (notes.length === 0) {
    return <p>No notes available.</p>;
  }

  return (
    <div style={styles.container}>
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default NoteList;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    marginTop: "20px",
  },
};
