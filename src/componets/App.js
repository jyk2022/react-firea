import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { authService, firebaseInstance } from 'fbinstanc';

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'initializing...'}
            <footer>&copy; Nwitter{new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
