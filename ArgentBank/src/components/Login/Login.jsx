import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/features/authSlice';
import { login, fetchUserDetails } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200 && response.body?.token) {
        const { token } = response.body;
        console.log('Réponse API:', response);

        localStorage.setItem('token', token);

        const userDetails = await fetchUserDetails(token);
        dispatch(loginSuccess({ user: userDetails, token }));
        navigate(`/user/${userDetails.id}`);
      } else {
        throw new Error(response.message || 'Erreur inconnue');
      }
    } catch (error) {
      alert(`Échec de la connexion : ${error.message}`);
    }
  };

  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className='input-wrapper'>
            <label htmlFor="username">Username</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='input-wrapper'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </section>
    </main>
  );
};

export default LoginForm;
