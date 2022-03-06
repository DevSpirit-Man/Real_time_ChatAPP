import React from 'react';
import logo from './ico/logo.png'
import { getAuth, signInWithPopup, } from "firebase/auth";
import { provider } from './firebase';
import Button from '@mui/material/Button';
import gicon from './ico/gicon.png'
export const Login = (props) => {
    const loginstyle = {
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        margin: 'auto',
        justifyContent: 'center',
        alignItems:'center',
        height: 'fit-content',
        padding:'92px 31px',
        backgroundColor:'white',
        borderRadius:'14px'
    }
    async function senduserdetails(e) {
        e.preventDefault();
        const auth = getAuth();
        const user = await signInWithPopup(auth, provider)
        props.getuser(user.user)
    }
    return (

        <div className='login' style={loginstyle}>
            <img style={{width:'120px'}} src={logo} alt="" />
            <p style={{margin:'15px 0',fontSize:'22px',fontWeight:'400',color:'#6e6d6d',width:"295px",textAlign:'center'}}>Chat App</p>
            <Button sx={{ marginTop: '21px',width:'fit-content' }} onClick={senduserdetails} variant="outlined" size="large">
                <img style={{width:'20px'}} src={gicon} alt="" />
                <p style={{width:'190px',color:'#6e6d6d',fontWeight:'bold',marginLeft:'3px'}}>Login using Google</p>
            </Button>
        </div>
    );
};
