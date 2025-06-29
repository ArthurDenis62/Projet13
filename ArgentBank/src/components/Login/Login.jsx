import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate(`/user/${resultAction.payload.user.id}`);
    } else if (login.rejected.match(resultAction)) {
      alert(`Échec de la connexion : ${resultAction.payload}`);
    }
  };

  return (
    <section className='main'>
      <section className='sign-in-content'>
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className='input-wrapper'>
            <label htmlFor="username">Username</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='input-wrapper'>
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='input-wrapper' style={{flexDirection: 'row'}}>
            <input type="checkbox" id='remember-me' />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className='edit-button' disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          {error && <div style={{color: 'red'}}>{error}</div>}
        </form>
      </section>
    </section>
  );
};

export default LoginForm;
