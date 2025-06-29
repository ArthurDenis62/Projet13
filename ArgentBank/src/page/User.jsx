import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchUser, updateUser } from '../redux/features/authSlice';
import axios from 'axios';

const User = () => {
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedToken = token || localStorage.getItem('token');
    if (storedToken && !user) {
      dispatch(fetchUser(storedToken));
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
  }, [user]);

  const handleUpdate = async () => {
    const storedToken = token || localStorage.getItem('token');
    const resultAction = await dispatch(updateUser({ firstName, lastName, token: storedToken }));
    if (updateUser.fulfilled.match(resultAction)) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setIsEditing(false);
  };

  return (
    <main>
      <div className="header">
        <h1>Welcome back</h1>
        {!isEditing ? (
          <>
            <h1>{firstName} {lastName}!</h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
          </>
        ) : (
          <div>
            <div className='input-content'>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className='input-content'>
              <button className="edited-button" onClick={handleUpdate} disabled={loading}>
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button className="edited-button" onClick={handleCancel}>Cancel</button>
            </div>
            {error && <div style={{color: 'red'}}>{error}</div>}
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
    </main>
  );
};

export default User;
