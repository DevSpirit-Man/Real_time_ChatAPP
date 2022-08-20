import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, onAuthStateChanged, getIdToken } from "firebase/auth";
import Button from '@mui/material/Button';
// import GoogleIcon from '@mui/icons-material/Google';
import toast, { Toaster } from 'react-hot-toast';
import { DialogContentText, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import logo from './ico/logo1.png'


export const Login = (props) => {
    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const [open1, setOpen1] = useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [resetemail, setresetemail] = useState("")
    
    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    // const [i, setI] = useState(0)
    const [photo, setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(1).png?alt=media&token=79495e45-5d89-44e5-b02d-95eef1d8a944')
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
            toast.error('Enter email', {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '12.5px'
                },
            });
            return
        }
        if (!password) {
            toast.error('Enter Password', {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '12.5px'
                },
            });
            return
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user);
                props.getuser(user)
            })
            .catch((error) => {
                toast.error(error.message.slice(16), {
                    style: {
                        fontFamily: 'Poppins',
                        fontSize: '12.5px'
                    },
                })
            });
    }
    async function signup() {
        if (!email) {
            toast.error('Enter email', {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '12.5px'
                },
            });
            return
        }
        if (!password) {
            toast.error('Enter Password', {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '12.5px'
                },
            });
            return
        }
        if (!name) {
            toast.error('Enter Name', {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '12.5px'
                },
            });
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
                toast.error(error.message.slice(16), {
                    style: {
                        fontFamily: 'Poppins',
                        fontSize: '12.5px'
                    },
                })
            });
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const resetPassword = () => {
        sendPasswordResetEmail(auth, resetemail)
            .then(() => {
                toast.success("Check your mail for password reset link ", {
                    style: {
                        fontFamily: 'Poppins',
                        fontSize: '12.5px'
                    },
                })
            })
            .catch((error) => {
                toast.error(error.message.slice(16), {
                    style: {
                        fontFamily: 'Poppins',
                        fontSize: '12.5px'
                    },
                })
            });

    }
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

    const getIdTokenPromise = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                if (user) {
                    getIdToken(user).then((idToken) => {
                        resolve(idToken);
                    }, (error) => {
                        resolve(null);
                    });
                } else {
                    resolve(null);
                }
            });
        });
    };
    getIdTokenPromise()
    return (

        <div className='login' style={loginstyle}>
            <Toaster />
            {/* <ChatIcon color="disabled" sx={{ fontSize: 140 }} ></ChatIcon> */}
            <img src={logo} style={{ width: '145px', marginBottom: '8px' }} alt=""></img>
            <h2 style={{ color: 'white', fontWeight: '400' }}>Chatzoid - Sign In</h2>
            {/* <p style={{ fontSize: '16px', width: '295px', marginTop: '9px', color: 'white' }}>we are so exicted to see you again</p> */}
            <TextField
                inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
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
                inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password}
                onChange={e => setpassword(e.target.value)}
                style={{ width: '92%', marginTop: '19px' }}
            />
            <Button sx={{ marginTop: '21px', fontFamily: 'Poppins', color: 'white' }} onClick={handleClickOpen3} variant="text">Forgot Password ?</Button>
            <Dialog open={open3} onClose={handleClose3}>
                <DialogTitle sx={{ fontFamily: 'Poppins' }}>Forgot Password ? </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '13.75px', fontFamily: 'Poppins' }}>
                        Enter your email to get password reset link
                    </DialogContentText>
                    <TextField
                        inputProps={{
                            style: {
                                fontSize: '13.75px', fontFamily: 'Poppins',
                                
                            }
                        }}
                        
                        style={{ marginTop: '18px' }}
                        value={resetemail}
                        onChange={e => setresetemail(e.target.value)}
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontFamily: 'Poppins', color: 'white' }} onClick={handleClose3}>Cancel</Button>
                    <Button sx={{ fontFamily: 'Poppins', color: 'white' }} onClick={resetPassword}>Reset</Button>
                </DialogActions>
            </Dialog>
            <Button sx={{ marginTop: '19px', width: '115px', backgroundColor: 'gray' }} onClick={senduserdetails} size="large">
                <p style={{ width: '190px', color: 'white', fontWeight: '500', marginLeft: '3px', marginBottom: '-3px', fontFamily: 'Poppins' }}>Sign In</p>
            </Button>
            <Button variant="text" sx={{ marginTop: '16px', width: '105px', position: 'absolute', top: '0', right: '9px', fontFamily: 'Poppins', color: 'white'  }} onClick={handleClickOpen} size="large">
                Sign Up
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins' }}> Signup</DialogTitle>
                <DialogContent>
                    <div className="avatar" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Button onClick={goLeft} type="text" ><ArrowLeftIcon  style={{width: '50px', height: '55px' }} /></Button> */}
                        <img src={photo} style={{ margin: 'auto', width: '135px', height: '137px', marginBottom: '19px', position: 'relative', borderRadius: '40%' }} alt=""></img>
                        <Fab onClick={handleClickOpen1} style={{ position: 'absolute', left: '56%', width: '45px', height: '45px', bottom: '62%',backgroundColor:'gray' }} aria-label="edit">
                            <EditIcon />
                        </Fab>
                        <Dialog maxWidth="xl" open={open1} onClose={handleClose1}>
                            <DialogTitle style={{ margin: 'auto', fontFamily: 'Poppins' }}>Select Avatar</DialogTitle>
                            <DialogContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(1).png?alt=media&token=79495e45-5d89-44e5-b02d-95eef1d8a944"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '40%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(1).png?alt=media&token=79495e45-5d89-44e5-b02d-95eef1d8a944'); handleClose1(); }} alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(16).png?alt=media&token=6b668c40-e269-4a73-9510-667531a02cd7"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '40%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(16).png?alt=media&token=6b668c40-e269-4a73-9510-667531a02cd7'); handleClose1(); }}
                                    alt=""
                                />

                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(25).png?alt=media&token=4638f032-1c4f-41e3-9624-93f2a4b48885"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '40%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(25).png?alt=media&token=4638f032-1c4f-41e3-9624-93f2a4b48885'); handleClose1(); }} alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(8).png?alt=media&token=3dce6f19-940d-4a09-bfb9-d2b619e1dad0"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '40%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(8).png?alt=media&token=3dce6f19-940d-4a09-bfb9-d2b619e1dad0'); handleClose1(); }}
                                    alt=""
                                />


                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker.png?alt=media&token=c123fe70-5719-4255-8a76-378bd52c07df"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '40%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker.png?alt=media&token=c123fe70-5719-4255-8a76-378bd52c07df'); handleClose1(); }}
                                    alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(5).png?alt=media&token=33a94024-936d-48d9-b23a-23f2cf68c335"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '40%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(5).png?alt=media&token=33a94024-936d-48d9-b23a-23f2cf68c335'); handleClose1(); }}
                                    alt=""
                                />




                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(21).png?alt=media&token=2e14b031-8faa-4b2f-b5f3-866cd687d7bc"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '40%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(21).png?alt=media&token=2e14b031-8faa-4b2f-b5f3-866cd687d7bc'); handleClose1(); }}
                                    alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(24).png?alt=media&token=4b733097-bdf9-4a99-a614-24840ede9509"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '40%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2FAvatarMaker%20(24).png?alt=media&token=4b733097-bdf9-4a99-a614-24840ede9509'); handleClose1(); }}
                                    alt=""
                                />
                                {/* <Avatar
                                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light'); handleClose1(); }}
                                /> */}

                                {/* <Avatar
                                    src="https://avataaars.io/?avatarStyle=Circle&topType=Turban&accessoriesType=Blank&hatColor=Black&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Heather&eyeType=Default&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Light"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://avataaars.io/?avatarStyle=Circle&topType=Turban&accessoriesType=Blank&hatColor=Black&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Heather&eyeType=Default&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Light'); handleClose1(); }}
                                /> */}

                            </DialogContent>
                            <DialogActions>
                                {/* <Button onClick={handleClose1}>Done</Button> */}
                            </DialogActions>
                        </Dialog>

                        {/* <Button onClick={goRight} type="text"><ArrowRightIcon  style={{width: '50px', height: '55px' }} /></Button> */}
                    </div>
                    <TextField
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
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
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
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
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
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
                    <Button sx={{ fontFamily: 'Poppins', color: 'white' }} onClick={signup}>Signup</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
