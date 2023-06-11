import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            <Routes>
                {isLoggedIn && <Route path="/" element={<Navigation />} />}
                {isLoggedIn ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
