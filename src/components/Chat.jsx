import React, { useEffect, useState } from 'react';
import '../css/chatbox.css'
import '../css/chatpage.css'
import attach from '../ico/attach.png'
import search from '../ico/search.png'
import menu from '../ico/menu.png'
import emoji from '../ico/emoji.png'
import send from '../ico/send.png'
import { collection, collectionGroup, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { doc } from "firebase/firestore";
function Chat() {
    const [message, setMessage] = useState([])
    console.log(message);
    useEffect(() =>
        onSnapshot(collectionGroup(db,"messages"), (snapshot) => setMessage(snapshot.docs.map(doc=>doc.data())))
    , [])
    return (
        <div className='chatbox'>
            <div className="chat__header">
                <div className="avatar__chat__header">
                    <img src={`https://avatars.dicebear.com/api/male/f.svg?background=%230000ff`} alt="" />
                </div>
                <div className="chat__header__name">
                    <h5>Party Poopers</h5>
                    <p>last seen Tue, 18 Aug 2020 - 18:40:54 </p>
                </div>
                <div className="chat__header__logosec">
                    <img className='chat_header_ico' src={search} alt="" />
                    <img className='chat_header_ico' src={attach} alt="" />
                    <img className='chat_header_ico' src={menu} alt="" />
                </div>
            </div>
            <div className="chat__body">
                <div className="messageboxcont">
                    <div className="messageboxright">
                        <p className="chat__body__message">
                            Hello mfs
                        </p>
                        <span className="timestamp">
                            19:45 Wednesday
                        </span>
                    </div>
                </div>

                {
                    message.map(item => {
                        return (<div className="messageboxcont">
                            <span className='authorof__msg'>{item.name}</span>
                            <div className="messagebox">
                                <p className="chat__body__message">
                                    {item.message}
                                </p>
                                <span className="timestamp">
                                    {/* {item.time.toDate()} */}.
                                </span>
                            </div>
                        </div>)
                    })
                }



            </div>
            <div className="chat__footer">
                <img className='chat_header_ico1' src={emoji} alt="" />
                <input type="text" placeholder='Type a message...' />
                <img className='chat_header_ico1' src={send} alt="" />
            </div>
        </div >
    );
}

export default Chat;
