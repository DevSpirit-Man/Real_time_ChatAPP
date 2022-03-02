import React, { useEffect } from 'react';
import './css/chatbox.css'
import './css/chatpage.css'
import Button from '@mui/material/Button';
// import attach from './ico/attach.png'
// import menu from './ico/menu.png'
import { useState } from 'react';
import { db } from './firebase';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
function Chat(props) {
    const [input, setInput] = useState("")
    const [message, setMessage] = useState([])
    const q = query(collection(db, "messages"), orderBy('timestamp', 'asc'));
    function inputhandler(e) {
        setInput(e.target.value)
    }
    useEffect(
        () => {
            onSnapshot(q, (snapshot) => setMessage(snapshot.docs.map((doc) => doc.data())))
        }

        , [q]);
    // useEffect(()=>{
    //     updateScroll()
    // },[message])
    async function sendMessage() {
        const msg = input;

        setInput("")
        await addDoc(collection(db, 'messages'), {
            name: props.name,
            text: msg,
            userimg: props.photo,
            timestamp: serverTimestamp()
        });
        // updateScroll()
    }
    // function updateScroll(){
    //     var element = document.getElementById("custom");
    //     element.scrollTop = element.scrollHeight;
    // }
    return (
        <div className='chatbox'>
            <div className="chat__header">
                <div className="siginmenu" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '-9px' }}>
                    <div className="avatar__chat__header">
                        <img src={props.photo} alt="" />
                    </div>
                    <div className="chat__header__name">
                        <h5>{props.name}</h5>
                    </div>
                </div>
                {/* <div className="chat__header__logosec">
                    <img className='chat_header_ico' src={attach} alt="" />
                    <img className='chat_header_ico' src={menu} alt="" />
                </div> */}
            </div>



            <div className="chat__body" id="custom">
                {
                    message.map(item => {
                        return (
                            <div className="messageboxcont">
                                <img style={{ width: '38px', borderRadius: '100%' }} src={item.userimg} alt="" />
                                <div className="messagebox">
                                    <h5 style={{ fontSize: '15px', fontWeight: '500' }}>{item.name}</h5>
                                    <p className="chat__body__message">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="chat__footer">
                <input value={input} type="text" placeholder='Type a message...' onChange={inputhandler} />
                {/* <button onClick={() => { sendMessage() }} style={{ width: '79px', height: '35px', background: '#86bbec', color: 'black', border: 'none', outline: 'none', borderRadius: '11px', fontWeight: 'bold', cursor: 'pointer' }}>send</button> */}
                <Button onClick={() => { sendMessage() }}  variant="outlined" style={{height:'35px'}} size="small">
                    <p style={{fontWeight:'bold'}}>send</p>
                </Button>
            </div>
        </div >
    );
}

export default Chat;
