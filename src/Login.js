import React from 'react';
import logo from './ico/logo.png'
import { getAuth, signInWithPopup,  } from "firebase/auth";
import { provider } from './firebase';
export const Login = (props) => {
    const loginstyle={
        display:'flex',
        flexDirection:'column',
        width:'90px',
        margin:'auto',
        justifyContent:'center',
        height:'80vh',
    }
    async function senduserdetails(e){
        e.preventDefault();
        const auth = getAuth();
        const user=await signInWithPopup(auth, provider)
        props.getuser(user.user)
    }
    return (

        <div className='login' style={loginstyle}>
            <img src={logo} alt="" />
            <h3 style={{margin:'15px 0'}}>ChatApp</h3>
            <button style={{marginTop:'10px',backgroundColor:'black',color:'white',height:'36px',border:'none',outline:'none',width:'99px',cursor:'pointer',fontSize:'14px',borderRadius:'6px'}} onClick={senduserdetails}>LogIn</button>
        </div>
    );
};
