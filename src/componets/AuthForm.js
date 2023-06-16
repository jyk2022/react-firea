import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fbinstanc';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    const onChange = (event) => {
        console.log(event.target.name);
        const {
            target: { name, value },
        } = event;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const togggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="Email" required value={email} onChange={onChange} />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
            </form>
            {error}
            <span onClick={togggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>
        </>
    );
};

export default AuthForm;
