import React from 'react';
import logo from './ico/logo.png'
import { getAuth, signInWithPopup, } from "firebase/auth";
import { provider } from './firebase';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
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
        backgroundColor:'#f1f7ff',
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
            <img style={{width:'120px'}} src={logo} alt="" />
            <p style={{margin:'15px 0',fontSize:'22px',fontWeight:'400',color:'#6e6d6d',width:"295px",textAlign:'center'}}>Chatzoid</p>
            <h2 style={{color:'#6e6d6d',fontWeight:'400'}}>Welcome Back!</h2>
            <p style={{fontSize:'15px',width:'295px',marginTop:'9px',color:'#6e6d6d'}}>we are so exicted to see you again</p>
            <Button variant="text" sx={{ marginTop: '21px',width:'fit-content' }} onClick={senduserdetails} size="large">
                <GoogleIcon color="action" style={{width:'24px'}}></GoogleIcon>
                <p style={{width:'190px',color:'#6e6d6d',fontWeight:'600',marginLeft:'3px',marginBottom:'-3px'}}>Login using Google</p>
            </Button>
        </div>
    );
};
