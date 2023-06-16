import { dbService, storageService } from 'fbinstanc';
import { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    //삭제 비동기 함수
    const onDeleteClick = async () => {
        const ok = window.confirm('삭제하시곗습니까?');

        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if (nweetObj.attachementUrl !== '') await storageService.refFromURL(nweetObj.attachementUrl).delete();
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
        setEditing(false);
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input value={newNweet} onChange={onChange} required />
                        <input type="submit" value="업데이트 트윗" />
                    </form>
                    <button onClick={toggleEditing}>취소</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachementUrl && <img src={nweetObj.attachementUrl} width="50px" heigth="50px" />}
                    {/* 트윗 주인이 작성한 경우에만 보여줌 */}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>트윗 삭제하기</button>
                            <button onClick={toggleEditing}>트윗 수정하기</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;
