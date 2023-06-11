import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fbinstanc';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    const togggleAccount = () => setNewAccount((prev) => !prev);

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
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const onSocialClick = async (event) => {
        console.log(event.target.name);
        const {
            target: { name },
        } = event;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

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
            <div>
                <button onClick={onSocialClick} name="google">
                    구글로 로그인하기
                </button>
                <button onClick={onSocialClick} name="github">
                    깃허브로 로그인하기
                </button>
            </div>
        </>
    );
};

export default Auth;
