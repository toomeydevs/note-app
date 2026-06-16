import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import NotesGrid from './components/NotesGrid';
import NoteModal from './components/NoteModal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useNotes } from './hooks/useNotes';
import './App.css';

function NotesApp() {
  const { user, logout } = useAuth();
  const {
    notes, loading, error, category, search,
    setCategory, setSearch, addNote, editNote, removeNote,
  } = useNotes();

  // 'closed' | 'create' | 'edit' | 'view'
  const [modalMode, setModalMode] = useState('closed');
  const [activeNote, setActiveNote] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('note-app-theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('note-app-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  function handleAddNote() {
    setActiveNote(null);
    setModalMode('create');
  }

  function handleViewNote(note) {
    setActiveNote(note);
    setModalMode('view');
  }

  function handleEditNote(note) {
    setActiveNote(note);
    setModalMode('edit');
  }

  function handleSwitchToEdit() {
    setModalMode('edit');
  }

  function handleCloseModal() {
    setModalMode('closed');
    setActiveNote(null);
  }

  async function handleSave(noteData) {
    if (modalMode === 'edit') {
      await editNote(activeNote._id, noteData);
    } else {
      await addNote(noteData);
    }
    handleCloseModal();
  }

  return (
    <div className="app">
      <Header
        user={user}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
        onAddNote={handleAddNote}
        onLogout={logout}
      />

      <Toolbar
        category={category}
        search={search}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
      />

      {error && <div className="error-message">{error}</div>}

      <NotesGrid
        notes={notes}
        loading={loading}
        onView={handleViewNote}
        onEdit={handleEditNote}
        onDelete={removeNote}
        onAddNote={handleAddNote}
      />

      {modalMode !== 'closed' && (
        <NoteModal
          note={activeNote}
          mode={modalMode}
          onSave={handleSave}
          onClose={handleCloseModal}
          onSwitchToEdit={handleSwitchToEdit}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <NotesApp />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;