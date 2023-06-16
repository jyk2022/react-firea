import { useEffect, useState } from 'react';
import { dbService } from 'fbinstanc';
import Nweet from 'componets/Nweet';

import NweetFactory from 'componets/NweetFactory';

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        dbService.collection('nweets').onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
    }, []);

    return (
        <>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.ccreatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
};

export default Home;
