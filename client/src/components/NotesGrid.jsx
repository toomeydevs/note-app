import { Pencil, Trash2, StickyNote, Loader2 } from 'lucide-react';

function NotesGrid({ notes, loading, onEdit, onDelete, onAddNote }) {
  if (loading) {
    return (
      <div className="notes-loading">
        <Loader2 size={18} className="spin" />
        Loading your notes…
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="notes-empty">
        <StickyNote className="notes-empty__icon" />
        <p>No notes yet.</p>
        <button className="btn btn--primary" onClick={onAddNote}>
          Create your first note
        </button>
      </div>
    );
  }

  return (
    <section className="notes-grid">
      {notes.map((note) => (
        <article key={note._id} className="note-card">
          <div className="note-card__header">
            <h2 className="note-card__title">{note.title}</h2>
            <span className={`note-card__badge note-card__badge--${note.category}`}>
              {note.category}
            </span>
          </div>

          <p className="note-card__content">{note.content}</p>

          <div className="note-card__actions">
            <button className="btn" onClick={() => onEdit(note)}>
              <Pencil size={14} />
              Edit
            </button>
            <button className="btn btn--danger" onClick={() => onDelete(note._id)}>
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default NotesGrid;