import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleSubmit(formData) {
    try {
      setError('');
      await login(formData.email, formData.password);
      navigate('/');  // Redirect to notes on success
    } catch (err) {
      setError(err.message);
    }
  }

  return <AuthForm mode="login" onSubmit={handleSubmit} error={error} />;
}

export default LoginPage;