import { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbinstanc';
import Nweet from 'componets/Nweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachementUrl = '';
        if (attachment !== '') {
            const attachementRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachementRef.putString(attachment, 'data_url');
            attachementUrl = await response.ref.getDownloadURL();
        }
        await dbService.collection('nweets').add({
            text: nweet,
            createdAt: Date.now(),
            ccreatorId: userObj.uid,
            attachementUrl,
        });
        setNweet('');
        setAttachment('');
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    // 파일 업로드 관련
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    // 파일 취소버튼

    const onClearAttachment = () => setAttachment('');

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
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="what's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" heigth="50px" />
                        <button onClick={onClearAttachment}> 이미지 업로드 취소</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.ccreatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
};

export default Home;
