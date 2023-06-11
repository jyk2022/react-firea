import React from 'react';
import { authService } from 'fbinstanc';
import { useNavigate } from 'react-router-dom/dist';

const Profile = () => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };

    return (
        <>
            <button onClick={onLogOutClick}> 로그아웃</button>
        </>
    );
};
export default Profile;
