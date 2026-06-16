const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function fetchNotes({ category, search } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);

  const url = `${API_URL}/notes${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url, { headers: getAuthHeaders() });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch notes');
  }

  return response.json();
}

async function createNote(noteData) {
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create note');
  }

  return response.json();
}

async function updateNote(id, noteData) {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update note');
  }

  return response.json();
}

async function deleteNote(id) {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to delete note');
  }

  return response.json();
}

export { fetchNotes, createNote, updateNote, deleteNote };