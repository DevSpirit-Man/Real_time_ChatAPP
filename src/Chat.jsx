import React, { useEffect } from 'react';
import './css/chatbox.css'
import './css/chatpage.css'
import toast, { Toaster } from 'react-hot-toast';
import Button from '@mui/material/Button';
import attach from './ico/attach.png'
// import menu from './ico/menu.png'
import { useState } from 'react';
import { db, storage } from './firebase';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
    function updateScroll(){
        var element = document.getElementById("custom");
        element.scrollTop = element.scrollHeight;
    }
    function handlefiles(e) {
        if (e.target.files[0].type === "image/png" || e.target.files[0].type === "application/pdf" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/jpeg") {
            upload(e.target.files[0]);
        }
        else {
            toast.error('Unsupported file format', {
                duration: 1200,
                position: 'top-center',
            });
        }
    }
    function upload(file) {
        const storageRef = ref(storage, 'files/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const msg = downloadURL;
                    sendfile()
                    async function sendfile() {
                        await addDoc(collection(db, 'messages'), {
                            name: props.name,
                            text: msg,
                            userimg: props.photo,
                            timestamp: serverTimestamp()
                        });
                    }
                });
            }
        );
    }
    return (
        <div className='chatbox'>
            <Toaster />
            <div className="chat__header">
                <div className="siginmenu" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '-9px' }}>
                    <div className="avatar__chat__header">
                        <img src={props.photo} alt="" />
                    </div>
                    <div className="chat__header__name">
                        <h5>{props.name}</h5>
                    </div>
                </div>
            </div>

            <div className="chat__body" id="custom">
                {
                    message.map(item => {
                        return (
                            <div className="messageboxcont">
                                <img style={{ width: '38px', borderRadius: '100%' }} src={item.userimg} alt="" />
                                <div className="messagebox">
                                    <h5 style={{ fontSize: '15px', fontWeight: '500' }}>{item.name}</h5>
                                    {
                                        item.text.includes('http') ? (
                                            <div className="file" style={{ width: '50%', height: '95px', border: '1.5px solid rgb(230, 230, 230)', borderRadius: '9px', padding: '2px 12px', marginTop: '5px', backgroundColor: 'rgb(255,255,255)' }}>
                                                <div className="headerfileformat" style={{ marginTop: '9px' }}>
                                                    <h5>File Shared : </h5>
                                                </div>
                                                <a href={item.text} className="chat__body__message">
                                                    {item.text}
                                                </a>
                                            </div>
                                        ) : (
                                            <p className="chat__body__message">
                                                {item.text}
                                            </p>
                                        )
                                    }

                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="chat__footer">
                <input value={input} type="text" placeholder='Type a message...' onChange={inputhandler} />
                <input type="file" name="" onChange={(e) => handlefiles(e)} id="filein" hidden />
                <label htmlFor='filein' style={{ border: 'none', outline: 'none', cursor: 'pointer' }}><img style={{ width: '25px' }} src={attach} alt="" /></label>
                <Button onClick={() => { sendMessage() }} variant="outlined" style={{ height: '35px' }} size="small">
                    <p style={{ fontWeight: 'bold' }}>send</p>
                </Button>
            </div>
        </div >
    );
}

export default Chat;
