import { Avatar, Button, Input } from '@mui/material'
import React, { useState } from 'react'

export const Room = (props) => {
    const [roomid,setRoomid]=useState("")
    function handleRoomID(){
        props.roomfunc(roomid)
    }
    function handleGenerate(){
        const random=new Date().getHours().toString()+new Date().getMinutes().toString()+new Date().getSeconds().toString()+props.name.slice(0,Math.floor(Math.random()*4))+props.photo.slice(9,18).toString()
        setRoomid(random)
    }
  return (
    <div style={{display:'flex',flexDirection:'column',rowGap:'21px',alignItems:'center',backgroundColor:'#f1f7ff', padding:'72px 39px', borderRadius:'8px',width:'422px'}}>
        {/* <Input  placeholder="Enter a room Id" inputProps={ariaLabel} /> */}
        <div className="usernameandall">
        <Avatar sx={{width:'105px',height:'105px'}} alt={props.name} src={props.photo} />
        <h3 style={{margin:'auto',marginTop:'20px',color:'#5c5b5b',fontFamily:'sans-serif',marginBottom:'20px',fontWeight:'400'}}>{props.name}</h3>
        </div>
        <Input placeholder="Enter a room Id" sx={{width:'280px'}} value={roomid}
          onChange={(e)=>{setRoomid(e.target.value)}} />
        <Button onClick={()=>{handleGenerate()}}>Generate one</Button>
        {
            roomid?( <Button onClick={()=>{handleRoomID()}} sx={{width:"179px",margin:'auto'}} variant="outlined">Join Room</Button>):( <Button disabled sx={{width:"179px",margin:'auto'}} variant="outlined">Join Room</Button>)
        }
       
    </div>
  )
}
