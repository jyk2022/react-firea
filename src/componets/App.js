import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { authService, firebaseInstance } from 'fbinstanc';
import Home from 'routes/Home';

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(user);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return <>{init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'initializing...'}</>;
}

export default App;
