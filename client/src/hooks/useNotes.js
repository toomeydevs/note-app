import { useState, useEffect, useCallback } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote } from '../services/api';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotes({ category, search });
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  async function addNote(noteData) {
    const newNote = await createNote(noteData);
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }

  async function editNote(id, noteData) {
    const updated = await updateNote(id, noteData);
    setNotes(prev => prev.map(note => (note._id === id ? updated : note)));
    return updated;
  }

  async function removeNote(id) {
    await deleteNote(id);
    setNotes(prev => prev.filter(note => note._id !== id));
  }

  return { notes, loading, error, category, search, setCategory, setSearch, addNote, editNote, removeNote };
}