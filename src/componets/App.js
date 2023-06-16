import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { authService, firebaseInstance } from 'fbinstanc';
import Home from 'routes/Home';

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                // setIsLoggedIn(user);
                const user = authService.currentUser;
                setUserObj({
                    uid: user.uid,
                    displayName: user.displayName,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(false);
            }
            setInit(true);
        });
    }, []);
    const refreshUser = () => {
        setUserObj(authService.currentUser);
    };
    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} />
            ) : (
                'initializing...'
            )}
        </>
    );
}

export default App;
