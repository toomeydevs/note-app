import { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';

const categories = ['Personal', 'Work', 'Study', 'Ideas'];

function NoteModal({ note, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Personal',
  });

  useEffect(() => {
    setFormData({
      title: note?.title || '',
      content: note?.content || '',
      category: note?.category || 'Personal',
    });
  }, [note]);

  function handleChange(event) {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formData);
  }

  return (
    <div role="presentation" className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 className="modal__title">{note ? 'Edit Note' : 'New Note'}</h2>
          <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

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
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            <Save size={15} />
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteModal;