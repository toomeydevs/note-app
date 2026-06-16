import { useEffect, useState } from 'react';
import { X, Save, Pencil } from 'lucide-react';

const categories = ['Personal', 'Work', 'Study', 'Ideas'];

function NoteModal({ note, mode, onSave, onClose, onSwitchToEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Personal',
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setFormData({
      title: note?.title || '',
      content: note?.content || '',
      category: note?.category || 'Personal',
    });
    setIsDirty(false);
  }, [note, mode]);

  function handleChange(event) {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setIsDirty(true);
  }

  function handleClose() {
    if (isDirty && mode !== 'view') {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
      if (!confirmed) return;
    }
    onClose();
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsDirty(false);
    onSave(formData);
  }

  const isView = mode === 'view';

  return (
    <div role="presentation" className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal"
        role={isView ? 'dialog' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal__header">
          <h2 className="modal__title">
            {isView ? 'View Note' : note ? 'Edit Note' : 'New Note'}
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {isView && (
              <button
                type="button"
                className="btn btn--primary"
                onClick={onSwitchToEdit}
                aria-label="Edit note"
              >
                <Pencil size={14} />
                Edit
              </button>
            )}
            <button
              type="button"
              className="btn btn--icon"
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* View Mode: read-only */}
        {isView ? (
          <div className="modal__view-body">
            <span className={`note-card__badge note-card__badge--${note?.category}`} style={{ marginBottom: '1rem', display: 'inline-block' }}>
              {note?.category}
            </span>
            <h3 className="modal__view-title">{note?.title}</h3>
            <div className="modal__view-content">
              {note?.content.split('\n').map((line, i) => (
                <p key={i}>{line || <br />}</p>
              ))}
            </div>
          </div>
        ) : (
          /* Edit / Create Mode: form */
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-group__label" htmlFor="modal-title">Title</label>
              <input
                id="modal-title"
                className="form-group__input"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={100}
                placeholder="Give your note a title…"
              />
            </div>

            <div className="form-group">
              <label className="form-group__label" htmlFor="modal-content">Content</label>
              <textarea
                id="modal-content"
                className="form-group__textarea"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={7}
                placeholder="Write something…"
              />
            </div>

            <div className="form-group">
              <label className="form-group__label" htmlFor="modal-category">Category</label>
              <select
                id="modal-category"
                className="form-group__select"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="modal__footer">
              <button type="button" className="btn" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary">
                <Save size={15} />
                Save Note
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default NoteModal;