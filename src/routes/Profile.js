import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbinstanc';
import { useNavigate } from 'react-router-dom/dist';
import Nweet from 'componets/Nweet';

const Profile = ({ userObj, refreshUser }) => {
    const [myNweets, setMyNweets] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName || '');
    const navigate = useNavigate();

    //로그아웃 함수
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };

    // displayName 변경하는 함수
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefalut();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    };

    // const getMyNweets = async () => {
    //     const nweets = await dbService
    //         .collection('nweets')
    //         .where('ccreatorId', '==', userObj.uid)
    //         .orderBy('createdAt', 'asc')
    //         .get();
    //     const myNweet = nweets.docs.map((doc) => doc.data());
    //     setMyNweets(myNweet);
    // };

    // useEffect(() => {
    //     getMyNweets();
    // }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                <input type="submit" value="Update profile" />
            </form>
            <button onClick={onLogOutClick}> 로그아웃</button>
            {myNweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.ccreatorId === userObj.uid} />
            ))}
        </>
    );
};
export default Profile;
