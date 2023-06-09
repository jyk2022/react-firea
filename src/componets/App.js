import React, { useState } from 'react';
import AppRouter from './Router';
import { authService } from 'fbinstanc';

function App() {
    console.log(authService.currentUser);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn} />
            <footer>&copy; Nwitter{new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
