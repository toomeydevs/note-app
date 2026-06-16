
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleSubmit(formData) {
    try {
      setError('');
      await signup(formData.name, formData.email, formData.password);
      navigate('/');  // Redirect to notes on success
    } catch (err) {
      setError(err.message);
    }
  }

  return <AuthForm mode="signup" onSubmit={handleSubmit} error={error} />;
}

export default SignupPage;