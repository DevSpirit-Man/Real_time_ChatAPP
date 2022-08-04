import React, { useEffect } from 'react';
import './css/chatbox.css'
import './css/chatpage.css'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { db, storage } from './firebase';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, LinearProgress, Snackbar } from '@mui/material';
import Navbar from './Navbar'
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import VideocamIcon from '@mui/icons-material/Videocam';
import { red, teal } from '@mui/material/colors';
import AttachmentIcon from '@mui/icons-material/Attachment';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import './css/Responsive.css'
import ReactTimeAgo from 'react-time-ago'

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
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
        handleClick()
    };
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
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '12.5px'
                  },
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
                        style: {
                            fontFamily: 'Poppins',
                            fontSize: '12.5px'
                          },
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
                        return (<>
                            {
                                (item.alert === true) ? (
                                    (Math.abs(Date.parse(item.date) - Date.parse(new Date().toString())) < 3000) ?
                                        (item.name !== props.name) ?
                                            <Snackbar
                                                open={open}
                                                autoHideDuration={2500}
                                                onClose={handleClose}
                                                message={item.text}
                                                sx={{fontFamily:'Poppins'}}
                                            /> : <></> : <></>

                                ) :
                                    <div className="messageboxcont">
                                        <div className="imgbox" style={{ width: '55px', height: '57px', borderRadius: '7px', marginTop: '-6px', marginRight: '1px', marginLeft: '1.15vw' }}>
                                            <img style={{ width: '55px', height: '57px',borderRadius:'50%'}} src={item.userimg} alt="" />
                                        </div>
                                        <div className="messagebox">
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <p className='fontemmm'>{item.name}</p>
                                                <div className="timestamp" style={{ marginLeft: '11.25px', marginBottom: '-2px' }}>
                                                    <p className='tieemmm' style={{ fontSize: '11.5px', color: '#828282', lineHeight: '25px', letterSpacing: '-0.035em', fontFamily: 'Poppins' }}>{
                                                        item.timestamp?
                                                        <ReactTimeAgo date={Date.parse(item.timestamp.toDate())} locale="en-US"/>:<></>
                                                    }</p>
                                                </div>
                                                
                                            </div>
                                            {
                                                item.text.includes('http') ? (
                                                    <div className="file" style={{ border: '0px solid #616161', borderRadius: '9px', padding: '2px 2px', marginTop: '5px', backgroundColor: '', paddingBottom: '3px', overflowX: 'scroll', marginBottom: '-3px', zIndex: '99' }}>
                                                        <a key={index} href={item.text} target="_blank" className="chat__body__message" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', paddingTop: '0px', textDecoration: 'none', MarginRight: '9px', marginLeft: '-3px', marginBottom: '-3px',fontSize:'13px' }}>
                                                            {

                                                                (item.filetype === "image/png" || item.filetype === "image/jpg" || item.filetype === "image/jpeg") ? (
                                                                    <ImageIcon color="primary" style={{ marginRight: '6px', fontSize: '24px' }}></ImageIcon>
                                                                ) : (<></>)
                                                            }
                                                            {

                                                                (item.filetype === "application/pdf") ? (
                                                                    <PictureAsPdfIcon sx={{ color: red[500] }} style={{ marginRight: '6px', fontSize: '24px' }}></PictureAsPdfIcon>
                                                                ) : (<></>)
                                                            }
                                                            {

                                                                (item.filetype === "audio/mpeg") ? (
                                                                    <LibraryMusicIcon sx={{ color: teal[500] }} style={{ marginRight: '6px', fontSize: '24px' }}></LibraryMusicIcon>
                                                                ) : (<></>)
                                                            }
                                                            {

                                                                (item.filetype === "video/mp4") ? (
                                                                    <VideocamIcon color="secondary" style={{ marginRight: '6px', fontSize: '24px' }}></VideocamIcon>
                                                                ) : (<></>)
                                                            }
                                                            {
                                                                (item.filetype) ? (item.filename) : (item.text)
                                                            }

                                                        </a>
                                                    </div>
                                                ) : (
                                                    <p key={index} className="chat__body__message">
                                                        {item.text} 
                                                        {/* {(item.name===props.name)?
                                                        <DeleteOutlineIcon style={{width:'19px',marginLeft:'19px',marginBottom:'-1px',cursor:'pointer'}}/>:<></>} */}
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>}
                        </>
                        )
                    })
                }
            </div>

            <div className="chat__footer">
                <div className="forbginput chat__footer" >
                    <input value={input} type="text" placeholder='Type a message...' onKeyPress={(e) => handleEnterButton(e)} onChange={inputhandler} />
                    <input type="file" name="" onChange={(e) => handlefiles(e)} id="filein" hidden />
                    <label htmlFor='filein' style={{ border: 'none', outline: 'none', cursor: 'pointer' }}><AttachmentIcon /></label>

                    {
                        input ? (<Button onClick={() => { sendMessage() }} style={{ height: '35px', marginRight: '-19px' }} size="small">
                            <SendIcon sx={{ fontSize: "21px" }}></SendIcon>
                        </Button>) : (<Button disabled style={{ height: '35px', marginRight: '-19px' }} size="small">
                            <SendIcon sx={{ fontSize: "21px" }}></SendIcon>
                        </Button>)
                    }

                </div>
            </div>
        </div >
    );
}

export default Chat;
