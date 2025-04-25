import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { loginSuccess } from './redux/features/authSlice';
import { fetchUserDetails } from './api/auth';

const initializeUser = async (store) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const userDetails = await fetchUserDetails(token);
      store.dispatch(loginSuccess({ user: userDetails, token }));
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
    }
  }
};

initializeUser(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
