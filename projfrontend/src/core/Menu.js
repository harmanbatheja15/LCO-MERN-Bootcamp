import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return 'active';
    }
    return '';
}

const Menu = ({ history }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Tshirt Store</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">

                    <li className={`nav-item mx-lg-3 ${currentTab(history, "/")}`}>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>

                    <li className={`nav-item mx-lg-3 ${currentTab(history, "/cart")}`}>
                        <Link to="/cart" className="nav-link">Cart</Link>
                    </li>

                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className={`nav-item mx-lg-3 ${currentTab(history, "/user/dashboard")}`}>
                            <Link to="/user/dashboard" className="nav-link">User Dashboard</Link>
                        </li>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className={`nav-item mx-lg-3 ${currentTab(history, "/admin/dashboard")}`}>
                            <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                        </li>
                    )}

                    {!isAuthenticated() && (
                        <Fragment>
                            <li className={`nav-item mx-lg-3 ${currentTab(history, "/signup")}`}>
                                <Link to="/signup" className="nav-link">Signup</Link>
                            </li>

                            <li className={`nav-item mx-lg-3 ${currentTab(history, "/signin")}`}>
                                <Link to="/signin" className="nav-link">Signin</Link>
                            </li>
                        </Fragment>
                    )}

                    {isAuthenticated() && (
                        <li className="nav-item mx-lg-3">
                            <Link to="" className="nav-link" onClick={() => {
                                signout(() => {
                                    history.push("/")
                                });
                            }}>Signout</Link>
                        </li>
                    )}

                </ul>
            </div>
        </nav>
    );
}

export default withRouter(Menu);
