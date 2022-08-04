import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import Button from '@mui/material/Button';
// import GoogleIcon from '@mui/icons-material/Google';
import toast, { Toaster } from 'react-hot-toast';
import { Avatar, DialogContentText, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import logo from './ico/logo.png'


export const Login = (props) => {
    const auth = getAuth();
    // const arr = ['https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(5).png?alt=media&token=ac625817-f05e-4e16-9751-00d972bf7eb6', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(4).png?alt=media&token=9cafcace-1e62-4961-992b-a5d22e85a627', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(6).png?alt=media&token=ee647bd7-b54e-4365-ad93-ffbc1d4b4fe2', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(7).png?alt=media&token=789bdada-11bf-4fac-9eb4-c8a41971ac58', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(8).png?alt=media&token=7fa37bcb-ec1a-4891-8815-6a656605cbfb', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars.png?alt=media&token=bd6ddf4b-4d07-4646-a582-d774a62723e4', 'https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(9).png?alt=media&token=f52a07a5-39a7-4ce6-8259-3a4159bc5229']
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
            toast.error('Enter email',{
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '12.5px'
                  },
            });
            return
        }
        if (!password) {
            toast.error('Enter Password',{
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
                toast.error(error.message.slice(16),{
                    style: {
                        fontFamily: 'Poppins',
                        fontSize: '12.5px'
                      },
                })
            });
    }
    async function signup() {
        if (!email) {
            toast.error('Enter email',{
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '12.5px'
                  },
            });
            return
        }
        if (!password) {
            toast.error('Enter Password',{
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '12.5px'
                  },
            });
            return
        }
        if (!name) {
            toast.error('Enter Name',{
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
                toast.error(error.message.slice(16),{
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
                toast.success("Check your mail for password reset link ",{
                    style: {
                        fontFamily: 'Poppins',
                        fontSize: '12.5px'
                      },
                })
            })
            .catch((error) => {
                toast.error(error.message.slice(16),{
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
    return (

        <div className='login' style={loginstyle}>
            <Toaster />
            {/* <ChatIcon color="disabled" sx={{ fontSize: 140 }} ></ChatIcon> */}
            <img src={logo} style={{width:'145px',marginBottom:'8px'}} alt=""></img>
            <h2 style={{ color: 'white', fontWeight: '400' }}>Chatzoid - Sign In</h2>
            {/* <p style={{ fontSize: '16px', width: '295px', marginTop: '9px', color: 'white' }}>we are so exicted to see you again</p> */}
            <TextField
            inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                autoFocus
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
            <Button sx={{ marginTop: '21px' ,fontFamily: 'Poppins' }} onClick={handleClickOpen3} variant="text">Forgot Password ?</Button>
            <Dialog open={open3} onClose={handleClose3}>
                <DialogTitle sx={{fontFamily: 'Poppins' }}>Forgot Password ? </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{fontSize: '13.75px', fontFamily: 'Poppins'}}>
                        Enter your email to get password reset link
                    </DialogContentText>
                    <TextField
            inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        style={{ marginTop: '18px' }}
                        value={resetemail}
                        onChange={e => setresetemail(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{fontFamily: 'Poppins' }} onClick={handleClose3}>Cancel</Button>
                    <Button sx={{fontFamily: 'Poppins' }} onClick={resetPassword}>Reset</Button>
                </DialogActions>
            </Dialog>
            <Button variant="contained" sx={{ marginTop: '19px', width: '115px', backgroundColor: '#5090D3' }} onClick={senduserdetails} size="large">
                <p style={{ width: '190px', color: 'white', fontWeight: '500', marginLeft: '3px', marginBottom: '-3px',fontFamily: 'Poppins'  }}>Sign In</p>
            </Button>
            <Button variant="text" sx={{ marginTop: '16px', width: '105px', position: 'absolute', top: '0', right: '9px' }} onClick={handleClickOpen} size="large">
                <p style={{ width: '190px', color: '#5090D3', fontWeight: '600', marginLeft: '3px', marginBottom: '-3px',fontFamily: 'Poppins'  }}>Sign Up</p>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',fontFamily: 'Poppins'  }}> Signup</DialogTitle>
                <DialogContent>
                    <div className="avatar" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Button onClick={goLeft} type="text" ><ArrowLeftIcon  style={{width: '50px', height: '55px' }} /></Button> */}
                        <Avatar src={photo} style={{ margin: 'auto', width: '125px', height: '125px', marginBottom: '19px', position: 'relative' }}></Avatar>
                        <Fab onClick={handleClickOpen1} style={{ position: 'absolute', left: '56%', width: '45px', height: '45px', bottom: '65%' }} color="primary" aria-label="edit">
                            <EditIcon />
                        </Fab>
                        <Dialog maxWidth="xl" open={open1} onClose={handleClose1}>
                            <DialogTitle style={{ margin: 'auto',fontFamily: 'Poppins'  }}>Select Avatar</DialogTitle>
                            <DialogContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(5).png?alt=media&token=ac625817-f05e-4e16-9751-00d972bf7eb6"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer",borderRadius:'100%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(5).png?alt=media&token=ac625817-f05e-4e16-9751-00d972bf7eb6'); handleClose1(); }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(7).png?alt=media&token=0d4dd492-d111-4dab-be81-59ca6d47c44a"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(7).png?alt=media&token=0d4dd492-d111-4dab-be81-59ca6d47c44a'); handleClose1(); }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(6).png?alt=media&token=b8d83d6e-9226-41f6-afcd-4545ef4823f7"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(6).png?alt=media&token=b8d83d6e-9226-41f6-afcd-4545ef4823f7'); handleClose1(); }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(4).png?alt=media&token=7de167ad-ba3e-49c2-ae99-2066c0193b7c"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(4).png?alt=media&token=7de167ad-ba3e-49c2-ae99-2066c0193b7c'); handleClose1(); }}
                                />

                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(3).png?alt=media&token=414181bb-f0c5-4b7d-817c-8a32dc6566a1"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(3).png?alt=media&token=414181bb-f0c5-4b7d-817c-8a32dc6566a1'); handleClose1(); }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars.png?alt=media&token=bd6ddf4b-4d07-4646-a582-d774a62723e4"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars.png?alt=media&token=bd6ddf4b-4d07-4646-a582-d774a62723e4'); handleClose1(); }}
                                />
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(2).png?alt=media&token=1b6e0c46-2886-4c1d-9cdf-f8d6eca1b566"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(2).png?alt=media&token=1b6e0c46-2886-4c1d-9cdf-f8d6eca1b566'); handleClose1(); }}
                                />
                                {/* <Avatar
                                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer" }}
                                    onClick={() => { setPhoto('https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light'); handleClose1(); }}
                                /> */}
                                <Avatar
                                    src="https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(1).png?alt=media&token=0f14db78-3efc-4340-95f4-a213c99dbfcb"
                                    style={{ width: "105px", height: "105px", marginTop: "6px", marginRight: '15px', cursor: "pointer",borderRadius:'100%' }}
                                    onClick={() => { setPhoto('https://firebasestorage.googleapis.com/v0/b/chat-app-f81cf.appspot.com/o/avatars%2Favataaars%20(1).png?alt=media&token=0f14db78-3efc-4340-95f4-a213c99dbfcb'); handleClose1(); }}
                                />
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
                    <Button sx={{fontFamily: 'Poppins' }} onClick={signup}>Signup</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
