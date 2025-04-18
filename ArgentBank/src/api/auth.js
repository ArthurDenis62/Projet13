import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/user';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Erreur de connexion', error);
    throw error;
  }
};

export const fetchUserDetails = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/profile`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.body;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails utilisateur', error);
    throw error;
  }
};
