import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fbinstanc';
import AuthForm from 'componets/AuthForm';

const Auth = () => {
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
            <AuthForm />
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
