import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/authSlice';

const Layout = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src="../design/img/argentBankLogo.png" alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className="main-nav-wrapper">
                {user ? (<>
                    <div className="main-nav-content">
                        <img className="main-profile-logo-image" src="../design/img/profile.png" alt="Profile" />
                        <Link to={`/user/${user.id}`} className="main-nav-item">
                            {user.firstName}
                        </Link>
                    </div>
                    <div className="main-nav-content-bis">
                        <a className="main-nav-item" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </a>
                    </div>
                    </>) : (
                    <Link className="main-nav-item" to="/signin">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Layout;