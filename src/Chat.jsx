import React, { useEffect } from 'react';
import './css/chatbox.css'
import './css/chatpage.css'
import toast, { Toaster } from 'react-hot-toast';
import attach from './ico/attach.png'
import { useState } from 'react';
import { db, storage } from './firebase';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { LinearProgress } from '@mui/material';
import Navbar from './Navbar'
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import VideocamIcon from '@mui/icons-material/Videocam';
import { red } from '@mui/material/colors';
function Chat(props) {
    const [input, setInput] = useState("")
    const [message, setMessage] = useState([])
    const [uploading, setUploading] = useState(false)
    // const q = query(collection(db, "messages"), orderBy('timestamp', 'asc'));
    const qr = query(collection(db, props.roomid), orderBy('timestamp', 'asc'));
    // const q1 = query(collection(db, "messages"),where(documentId(),'==', '3PPly1FEJjtJntqPEFAb'));
    // const document=doc(db, "messages", "153yJtULNbDsTSRSfdCR");
    // getDoc(document).then((e)=>{
    //     console.log(e.data());
    // })
    function inputhandler(e) {
        setInput(e.target.value)
    }

    useEffect(
        () => {
            onSnapshot(qr, (snapshot) => setMessage(snapshot.docs.map((doc) => doc.data())))
        }
        , []);
    useEffect(() => {
        updateScroll()
    }, [message])
    async function sendMessage() {
        if (input) {
            const msg = input;
            setInput("")
            await addDoc(collection(db, props.roomid), {
                name: props.name,
                text: msg,
                userimg: props.photo,
                timestamp: serverTimestamp()
            });
        }
    }
    function updateScroll() {
        var element = document.getElementById("custom");
        element.scrollTop = element.scrollHeight;
    }
    function handlefiles(e) {
        // console.log(e.target.files[0]);
        if (e.target.files[0].type === "image/png" || e.target.files[0].type === "application/pdf" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "video/mp4" || e.target.files[0].type === "audio/mpeg") {
            upload(e.target.files[0]);
        }
        else {
            toast.error('Unsupported file format', {
                duration: 1200,
                position: 'top-center',
            });
        }
    }
    function handleEnterButton(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    }
    function upload(file) {
        const storageRef = ref(storage, 'files/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setUploading(true);
        toast('Uploading your file ...', {
            icon: '⏳',
            duration: 2000,
            position: 'top-center',
        });
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
                    setUploading(false)
                    async function sendfile() {
                        await addDoc(collection(db, props.roomid), {
                            name: props.name,
                            text: msg,
                            userimg: props.photo,
                            timestamp: serverTimestamp(),
                            filename: file.name,
                            filetype: file.type
                        });
                    }
                    toast.success('Done uploading', {
                        duration: 1200,
                        position: 'top-center',
                    });
                });
            }
        );
    }
    return (
        <div className='chatbox'>
            <Toaster />
            <div className="chat__header" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <Navbar roomid={props.roomid}></Navbar>
            </div>
            <div className="uploadprogress">
                {
                    uploading ? (<LinearProgress sx={{ height: '2px' }} />) : (<></>)
                }
            </div>

            <div className="chat__body" id="custom">
                {
                    message.map((item, index) => {
                        // props.arr.push(item.name)
                        return (
                            <div className="messageboxcont">

                                <img style={{ width: '40px', borderRadius: '100%', marginTop: '-4px' }} src={`https://avatars.dicebear.com/api/male/${item.name}.svg?&skin=light&mouth=smile&background=white`} alt="" />
                                <div className="messagebox">
                                    <h5 style={{ fontSize: '15.5px', fontWeight: '600' }}>{item.name.split(' ')[0] + " " + item.name.split(' ')[1]}</h5>
                                    {
                                        item.text.includes('http') ? (
                                            <div className="file" style={{ border: '1.5px solid rgb(230, 230, 230)', borderRadius: '9px', padding: '2px 12px', marginTop: '5px', backgroundColor: 'rgb(255,255,255)', paddingBottom: '12px',width:'245px',overflowX:'scroll',marginBottom:'-13px' }}>
                                                <div className="headerfileformat" style={{ marginTop: '9px', }}>
                                                    <h5> Shared : </h5>
                                                </div>
                                                <a key={index} href={item.text} target="_blank" className="chat__body__message" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', paddingTop: '5px',textDecoration:'none',MarginRight:'9px' }}>
                                                    {

                                                        (item.filetype === "image/png" || item.filetype === "image/jpg" || item.filetype === "image/jpeg") ? (
                                                            <ImageIcon color="primary" style={{ marginRight: '9px' ,fontSize:'24px' }}></ImageIcon>
                                                        ) : (<></>)
                                                    }
                                                    {

                                                        (item.filetype === "application/pdf") ? (
                                                            <PictureAsPdfIcon sx={{ color: red[700] }}  style={{ marginRight: '9px',fontSize:'24px' }}></PictureAsPdfIcon>
                                                        ) : (<></>)
                                                    }
                                                    {

                                                        (item.filetype === "audio/mpeg") ? (
                                                            <LibraryMusicIcon color="success" style={{ marginRight: '9px',fontSize:'24px' }}></LibraryMusicIcon>
                                                        ) : (<></>)
                                                    }
                                                    {

                                                        (item.filetype === "video/mp4") ? (
                                                            <VideocamIcon color="secondary" style={{ marginRight: '9px',fontSize:'24px' }}></VideocamIcon>
                                                        ) : (<></>)
                                                    }
                                                    {
                                                        (item.filetype)?(item.filename):(item.text)
                                                    }
                                                   
                                                </a>
                                            </div>
                                        ) : (
                                            <p key={index} className="chat__body__message">
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
                <div className="forbginput chat__footer" >
                    <input value={input} type="text" placeholder='Type a message...' onKeyPress={(e) => handleEnterButton(e)} onChange={inputhandler} />
                    <input type="file" name="" onChange={(e) => handlefiles(e)} id="filein" hidden />
                    <label htmlFor='filein' style={{ border: 'none', outline: 'none', cursor: 'pointer' }}><img style={{ width: '22px', marginTop: '3px' }} src={attach} alt="" /></label>

                    {/* {
                        input ? (<Button onClick={() => { sendMessage() }} variant="outlined" style={{ height: '35px', marginRight: '9px' }} size="small">
                            <p style={{ fontWeight: 'bold' }}>send</p>
                        </Button>) : (<Button disabled variant="outlined" style={{ height: '35px', marginRight: '9px' }} size="small">
                            <p style={{ fontWeight: 'bold' }}>send</p>
                        </Button>)
                    } */}

                </div>
            </div>
        </div >
    );
}

export default Chat;
