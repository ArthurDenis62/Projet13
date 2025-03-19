import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/features/authSlice';
import { login } from '../../api/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log('Réponse API:', data);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
    } catch (error) {
      alert('Échec de la connexion', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginForm;
