import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateUser, loginSuccess } from '../redux/features/authSlice';
import axios from 'axios';

const User = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = token || localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Token manquant. Veuillez vous reconnecter.');
        }

        const response = await axios.post(
          'http://localhost:3001/api/v1/user/profile',
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const userDetails = response.data.body;
        setFirstName(userDetails.firstName);
        setLastName(userDetails.lastName);
        setTransactions(userDetails.transactions || []);
        dispatch(loginSuccess({ user: userDetails, token: storedToken }));
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, [dispatch, token]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = response.data.body;
      dispatch(updateUser(updatedUser));
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back <br /> {firstName} {lastName}!</h1>
        <div>
            <div>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <button onClick={handleUpdate}>Mettre à jour</button>
            </div>
        </div>
      <h2>Vos transactions :</h2>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <li key={index}>
              <strong>Date :</strong> {transaction.date} <br />
              <strong>Montant :</strong> {transaction.amount}€ <br />
              <strong>Description :</strong> {transaction.description}
            </li>
          ))
        ) : (
          <p>Aucune transaction disponible.</p>
        )}
      </ul>
    </div>
    </main>
  );
};

export default User;
