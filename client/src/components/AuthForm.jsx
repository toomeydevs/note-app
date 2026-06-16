import { useState } from 'react';
import { AlertCircle, BookOpen } from 'lucide-react';

function AuthForm({ mode, onSubmit, error }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationError, setValidationError] = useState('');

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setValidationError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    setValidationError('');

    if (mode === 'signup') {
      if (!formData.name.trim()) {
        setValidationError('Name is required');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setValidationError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setValidationError('Password must be at least 6 characters');
        return;
      }
    }

    onSubmit(formData);
  }

  const displayError = validationError || error;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__icon">
          <BookOpen size={36} />
        </div>

        <h2 className="auth-card__title">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="auth-card__subtitle">
          {mode === 'login'
            ? 'Sign in to your notes'
            : 'Start capturing your ideas'}
        </p>

        {displayError && (
          <div className="auth-card__error">
            <AlertCircle size={15} />
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-group__label" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-group__input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-group__label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-group__input"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-group__input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-group__label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-group__input"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn--primary"
            style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center', padding: '0.75rem' }}
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-card__footer">
          {mode === 'login' ? (
            <>Don&apos;t have an account? <a href="/signup">Sign up</a></>
          ) : (
            <>Already have an account? <a href="/login">Log in</a></>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthForm;