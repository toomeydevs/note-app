import { BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Plus, LogOut } from 'lucide-react';

function Header({ darkMode, onToggleDarkMode, onAddNote }) {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__brand">
        <BookOpen size={22} className="header__logo-icon" />
        <h1 className="header__title">My Notes</h1>
      </div>

      <div className="header__actions">
        <span className="header__username">{user?.name}</span>

        <button
          className="btn btn--icon"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button className="btn btn--primary" onClick={onAddNote}>
          <Plus size={16} />
          New Note
        </button>

        <button className="btn btn--danger" onClick={logout} title="Log out">
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;