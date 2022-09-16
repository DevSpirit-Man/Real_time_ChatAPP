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
    const [photo, setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(1).png?alt=media&token=4aa1e582-191d-476c-8d96-a6930e3131e6')
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
            <Button variant="text" sx={{ marginTop: '16px', width: '105px', position: 'absolute', top: '0', right: '9px', fontFamily: 'Poppins', color: 'white' }} onClick={handleClickOpen} size="large">
                Sign Up
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins' }}> Signup</DialogTitle>
                <DialogContent>
                    <div className="avatar" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Button onClick={goLeft} type="text" ><ArrowLeftIcon  style={{width: '50px', height: '55px' }} /></Button> */}
                        <img src={photo} style={{ margin: 'auto', width: '135px', height: '137px', marginBottom: '19px', position: 'relative', borderRadius: '40%' }} alt=""></img>
                        <Fab onClick={handleClickOpen1} style={{ position: 'absolute', left: '56%', width: '45px', height: '45px', bottom: '62%', backgroundColor: 'gray' }} aria-label="edit">
                            <EditIcon />
                        </Fab>
                        <Dialog maxWidth="sm" open={open1} onClose={handleClose1}>
                            <DialogTitle style={{ margin: 'auto', fontFamily: 'Poppins' }}>Select Avatar</DialogTitle>
                            <DialogContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(1).png?alt=media&token=4aa1e582-191d-476c-8d96-a6930e3131e6"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(1).png?alt=media&token=4aa1e582-191d-476c-8d96-a6930e3131e6'); handleClose1(); }} alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(2).png?alt=media&token=250496c5-f5a5-4f01-96f3-af0b42472916"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(2).png?alt=media&token=250496c5-f5a5-4f01-96f3-af0b42472916'); handleClose1(); }}
                                    alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(3).png?alt=media&token=57b4b6d8-7327-46f5-9206-59e5c2e84f4c"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(3).png?alt=media&token=57b4b6d8-7327-46f5-9206-59e5c2e84f4c'); handleClose1(); }} alt=""
                                />

                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(4).png?alt=media&token=467a6fa6-e28b-4a37-b38b-42ce422c20ed"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(4).png?alt=media&token=467a6fa6-e28b-4a37-b38b-42ce422c20ed'); handleClose1(); }} alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(5).png?alt=media&token=f15327dd-3c69-4d16-a91c-8f3df7c81f32"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(5).png?alt=media&token=f15327dd-3c69-4d16-a91c-8f3df7c81f32'); handleClose1(); }}
                                    alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(6).png?alt=media&token=f4c087c4-c18a-45a2-a8cb-9d4375be3ec1"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(6).png?alt=media&token=f4c087c4-c18a-45a2-a8cb-9d4375be3ec1'); handleClose1(); }} alt=""
                                /><img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(7).png?alt=media&token=e87e1348-c4c4-4bf1-9c07-5297bb2ae63e"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(7).png?alt=media&token=e87e1348-c4c4-4bf1-9c07-5297bb2ae63e'); handleClose1(); }} alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(8).png?alt=media&token=60fc06dd-6031-4c27-b7c7-747695832817"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(8).png?alt=media&token=60fc06dd-6031-4c27-b7c7-747695832817'); handleClose1(); }}
                                    alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(9).png?alt=media&token=b44b7184-5600-490c-9b3b-e6a60e837bcb"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(9).png?alt=media&token=b44b7184-5600-490c-9b3b-e6a60e837bcb'); handleClose1(); }} alt=""
                                /><img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(10).png?alt=media&token=7ce54be7-223c-4d35-90c2-c97b3bea3953"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(10).png?alt=media&token=7ce54be7-223c-4d35-90c2-c97b3bea3953'); handleClose1(); }} alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(11).png?alt=media&token=32143193-6c4d-47ae-b24b-4e095f7cab8f"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(11).png?alt=media&token=32143193-6c4d-47ae-b24b-4e095f7cab8f'); handleClose1(); }}
                                    alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(12).png?alt=media&token=73fc4856-7efb-4d3b-af8a-fed210c26300"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(12).png?alt=media&token=73fc4856-7efb-4d3b-af8a-fed210c26300'); handleClose1(); }} alt=""
                                /><img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(13).png?alt=media&token=8f290263-3d1a-45e9-a082-c92f14f71937"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(13).png?alt=media&token=8f290263-3d1a-45e9-a082-c92f14f71937'); handleClose1(); }} alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(14).png?alt=media&token=39ada782-7f35-417f-b1a1-542dcd19d107"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(14).png?alt=media&token=39ada782-7f35-417f-b1a1-542dcd19d107'); handleClose1(); }}
                                    alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(15).png?alt=media&token=44829fe4-1784-4882-949c-64f11b92cc3c"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(15).png?alt=media&token=44829fe4-1784-4882-949c-64f11b92cc3c'); handleClose1(); }} alt=""
                                /><img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(16).png?alt=media&token=db8feb30-fca2-407d-8126-0bd099a70f6c"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(16).png?alt=media&token=db8feb30-fca2-407d-8126-0bd099a70f6c'); handleClose1(); }} alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(17).png?alt=media&token=35176f10-b12a-4a50-8044-c6f479b94477"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(17).png?alt=media&token=35176f10-b12a-4a50-8044-c6f479b94477'); handleClose1(); }}
                                    alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(18).png?alt=media&token=92f431c3-f688-49b7-902e-e08d764b3d6b"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(18).png?alt=media&token=92f431c3-f688-49b7-902e-e08d764b3d6b'); handleClose1(); }} alt=""
                                /><img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(19).png?alt=media&token=a0617572-21b6-44b3-817e-ff833dfbc4b9"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(19).png?alt=media&token=a0617572-21b6-44b3-817e-ff833dfbc4b9'); handleClose1(); }} alt=""
                                />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(20).png?alt=media&token=8f355050-86c4-498d-88bf-4eea6d9cfe51"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer", borderRadius: '50%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/newlowdp%2Favatar%20(20).png?alt=media&token=8f355050-86c4-498d-88bf-4eea6d9cfe51'); handleClose1(); }}
                                    alt=""
                                />

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
