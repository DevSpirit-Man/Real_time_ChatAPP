import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import Button from '@mui/material/Button';
// import GoogleIcon from '@mui/icons-material/Google';
import toast, { Toaster } from 'react-hot-toast';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

export const Login = (props) => {
    const auth = getAuth();
    // const arr = ['https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(5).png?alt=media&token=ac625817-f05e-4e16-9751-00d972bf7eb6', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(4).png?alt=media&token=9cafcace-1e62-4961-992b-a5d22e85a627', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(6).png?alt=media&token=ee647bd7-b54e-4365-ad93-ffbc1d4b4fe2', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(7).png?alt=media&token=789bdada-11bf-4fac-9eb4-c8a41971ac58', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(8).png?alt=media&token=7fa37bcb-ec1a-4891-8815-6a656605cbfb', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars.png?alt=media&token=bd6ddf4b-4d07-4646-a582-d774a62723e4', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(9).png?alt=media&token=f52a07a5-39a7-4ce6-8259-3a4159bc5229']
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const [open1, setOpen1] = useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    // const [i, setI] = useState(0)
    const [photo, setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(5).png?alt=media&token=ac625817-f05e-4e16-9751-00d972bf7eb6')
    const loginstyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '492px',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'fit-content',
        padding: '62px 21px',
        backgroundColor: '#252329',
        borderRadius: '8px',
        textAlign: 'center',
    }
    async function senduserdetails() {
        if (!email) {
            toast.error('Enter email');
            return
        }
        if (!password) {
            toast.error('Enter Password');
            return
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user);
                props.getuser(user)
            })
            .catch((error) => {
                toast.error(error.message.slice(16))
            });
    }
    async function signup() {
        if (!email) {
            toast.error('Enter email');
            return
        }
        if (!password) {
            toast.error('Enter Password');
            return
        }
        if (!name) {
            toast.error('Enter Name');
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.debug(user)
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photo
                }).then(() => {
                    // console.log(auth.currentUser);
                    props.getuser(auth.currentUser)
                }).catch((error) => {
                });

            })
            .catch((error) => {
                toast.error(error.message.slice(16))
            });
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    // const goLeft = () => {
    //     if (i > 0) {
    //         setI(i - 1);
    //         setPhoto(arr[i])
    //     }
    //     else if (i === 0) {
    //         setI(arr.length - 1)
    //         setPhoto(arr[i])
    //     }
    // }
    // const goRight = () => {
    //     if (i <= arr.length - 1) {
    //         setI(i + 1);
    //         setPhoto(arr[i])
    //     } else if (i === arr.length) {
    //         setI(0);
    //         setPhoto(arr[i])
    //     }
    // }
    return (

        <div className='login' style={loginstyle}>
            <Toaster />
            <ChatIcon color="primary" sx={{ fontSize: 120 }} ></ChatIcon>
            <h2 style={{ color: 'white', fontWeight: '400' }}>Chatzoid - Sign In</h2>
            {/* <p style={{ fontSize: '16px', width: '295px', marginTop: '9px', color: 'white' }}>we are so exicted to see you again</p> */}
            <TextField
                id="standard-password-input"
                label="Email"
                type="email"
                autoComplete="current-password"
                variant="outlined"
                value={email}
                onChange={e => setEmail(e.target.value)}

                style={{ width: '92%', marginTop: '29px' }}
            />
            <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password}
                onChange={e => setpassword(e.target.value)}
                style={{ width: '92%', marginTop: '19px' }}
            />

            <Button variant="contained" sx={{ marginTop: '21px', width: '125px', backgroundColor: '#5090D3' }} onClick={senduserdetails} size="large">
                <p style={{ width: '190px', color: 'white', fontWeight: '500', marginLeft: '3px', marginBottom: '-3px' }}>Sign In</p>
            </Button>
            <Button variant="text" sx={{ marginTop: '16px', width: '155px', position: 'absolute', top: '0', right: '0' }} onClick={handleClickOpen} size="large">
                <p style={{ width: '190px', color: 'white', fontWeight: '500', marginLeft: '3px', marginBottom: '-3px' }}>Sign Up</p>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}> Signup</DialogTitle>
                <DialogContent>
                    <div className="avatar" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Button onClick={goLeft} type="text" ><ArrowLeftIcon  style={{width: '50px', height: '55px' }} /></Button> */}
                        <Avatar src={photo} style={{ margin: 'auto', width: '125px', height: '125px', marginBottom: '19px', position: 'relative' }}></Avatar>
                        <Fab onClick={handleClickOpen1} style={{ position: 'absolute', left: '56%', width: '45px', height: '45px', bottom: '65%' }} color="primary" aria-label="edit">
                            <EditIcon />
                        </Fab>
                        <Dialog maxWidth="md" open={open1} onClose={handleClose1}>
                            <DialogTitle style={{ margin: 'auto' }}>Select Avatar</DialogTitle>
                            <DialogContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',flexWrap:'wrap' }}>
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(5).png?alt=media&token=ac625817-f05e-4e16-9751-00d972bf7eb6"
                                    style={{ width: "105px", height: "105px", marginTop: "2px", marginRight: '9px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(5).png?alt=media&token=ac625817-f05e-4e16-9751-00d972bf7eb6');handleClose1(); }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(4).png?alt=media&token=9cafcace-1e62-4961-992b-a5d22e85a627"
                                    style={{ width: "105px", height: "105px", marginTop: "2px", marginRight: '9px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(4).png?alt=media&token=9cafcace-1e62-4961-992b-a5d22e85a627');handleClose1();  }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(6).png?alt=media&token=ee647bd7-b54e-4365-ad93-ffbc1d4b4fe2"
                                    style={{ width: "105px", height: "105px", marginTop: "2px", marginRight: '9px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(6).png?alt=media&token=ee647bd7-b54e-4365-ad93-ffbc1d4b4fe2');handleClose1();  }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(7).png?alt=media&token=789bdada-11bf-4fac-9eb4-c8a41971ac58"
                                    style={{ width: "105px", height: "105px", marginTop: "2px", marginRight: '9px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(7).png?alt=media&token=789bdada-11bf-4fac-9eb4-c8a41971ac58');handleClose1();  }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(8).png?alt=media&token=7fa37bcb-ec1a-4891-8815-6a656605cbfb"
                                    style={{ width: "105px", height: "105px", marginTop: "2px", marginRight: '9px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(8).png?alt=media&token=7fa37bcb-ec1a-4891-8815-6a656605cbfb');handleClose1();  }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars.png?alt=media&token=bd6ddf4b-4d07-4646-a582-d774a62723e4"
                                    style={{ width: "105px", height: "105px", marginTop: "2px", marginRight: '9px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars.png?alt=media&token=bd6ddf4b-4d07-4646-a582-d774a62723e4');handleClose1();  }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(9).png?alt=media&token=f52a07a5-39a7-4ce6-8259-3a4159bc5229"
                                    style={{ width: "105px", height: "105px", marginTop: "2px", marginRight: '9px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(9).png?alt=media&token=f52a07a5-39a7-4ce6-8259-3a4159bc5229');handleClose1(); }}
                                />
                            </DialogContent>
                            <DialogActions>
                                {/* <Button onClick={handleClose1}>Done</Button> */}
                            </DialogActions>
                        </Dialog>

                        {/* <Button onClick={goRight} type="text"><ArrowRightIcon  style={{width: '50px', height: '55px' }} /></Button> */}
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Password atleast 6 digits"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => { setpassword(e.target.value) }}
                        variant="outlined"
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Enter Your Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={e => setName(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={signup}>Signup</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
