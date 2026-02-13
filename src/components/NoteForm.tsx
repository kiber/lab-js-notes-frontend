import { useState } from "react";
import type { Note } from "../types/note.types";

interface Props {
  initialData?: Partial<Note>;
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

const NoteForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: Props) => {
  const [title, setTitle] = useState<string>(initialData.title || "");
  const [content, setContent] = useState<string>(
    initialData.content || ""
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> =
    async (e) => {
      e.preventDefault();
      if (!title.trim() || !content.trim()) return;

      setLoading(true);
      await onSubmit({ title, content });
      setLoading(false);
    };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={styles.input}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        style={styles.textarea}
      />
      <div style={styles.actions}>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;

const styles = {
  form: { display: "flex", flexDirection: "column" as const, gap: "8px" },
  input: { padding: "6px" },
  textarea: { padding: "6px", minHeight: "60px" },
  actions: { display: "flex", gap: "8px" },
};
