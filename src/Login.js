import React from 'react';
import { getAuth, signInWithPopup, } from "firebase/auth";
import { provider } from './firebase';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import ChatIcon from '@mui/icons-material/Chat';
export const Login = (props) => {
    const loginstyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '492px',
        margin: 'auto',
        justifyContent: 'center',
        alignItems:'center',
        height: 'fit-content',
        padding:'62px 21px',
        backgroundColor:'rgb(37,35,41)',
        borderRadius:'8px',
        textAlign:'center'
    }
    async function senduserdetails(e) {
        e.preventDefault();
        const auth = getAuth();
        const user = await signInWithPopup(auth, provider)
        props.getuser(user.user)
    }
    return (

        <div className='login' style={loginstyle}>
            <ChatIcon color="primary" sx={{ fontSize: 120 }} ></ChatIcon>
            {/* <img style={{width:'120px'}} src={logo} alt="" /> */}
            <p style={{margin:'15px 0',fontSize:'22px',fontWeight:'400',color:'white',width:"295px",textAlign:'center'}}>Chatzoid</p>
            <h2 style={{color:'white',fontWeight:'400'}}>Welcome Back!</h2>
            <p style={{fontSize:'16px',width:'295px',marginTop:'9px',color:'white'}}>we are so exicted to see you again</p>
            <Button variant="text" sx={{ marginTop: '21px',width:'fit-content' }} onClick={senduserdetails} size="large">
                <GoogleIcon color="white" style={{width:'24px'}}></GoogleIcon>
                <p style={{width:'190px',color:'white',fontWeight:'600',marginLeft:'3px',marginBottom:'-3px'}}>Login using Google</p>
            </Button>
        </div>
    );
};
