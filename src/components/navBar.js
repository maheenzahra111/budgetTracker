// src/components/navBar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../styles/navBar.css';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement your logout logic here
        // For example, clearing user data from localStorage or sending a logout request
        navigate('/signin');
    };

    const isDashboardPage = location.pathname.includes('/dashboard');

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link className="budget-link" to={isDashboardPage ? '/dashboard' : '/'}>Budget Tracker</Link>
            </div>
            <div className="navbar-right">

                <Link className="profile" to="/signin">
                    <UserOutlined />
                </Link>

            </div>
        </nav>
    );
};

export default NavBar;
