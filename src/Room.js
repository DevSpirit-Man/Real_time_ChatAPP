import { Avatar, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

export const Room = (props) => {
    const [roomid,setRoomid]=useState("")
    function handleRoomID(){
        props.roomfunc(roomid)
    }
  return (
    <div style={{display:'flex',flexDirection:'column',rowGap:'21px',alignItems:'center'}}>
        {/* <Input  placeholder="Enter a room Id" inputProps={ariaLabel} /> */}
        <div className="usernameandall">
        <Avatar sx={{width:'105px',height:'105px'}} alt={props.name} src={props.photo} />
        <h3 style={{margin:'auto',marginTop:'10px',color:'#5c5b5b',fontFamily:'sans-serif'}}>{props.name}</h3>
        </div>
        <TextField sx={{width:'280px'}}
          id="standard-textarea"
          label="Room Id"
          placeholder="Enter a room Id"
          multiline
          variant="standard"
          value={roomid}
          onChange={(e)=>{setRoomid(e.target.value)}}
        />
        {
            roomid?( <Button onClick={()=>{handleRoomID()}} sx={{width:"179px",margin:'auto'}} variant="outlined">Join Room</Button>):( <Button disabled sx={{width:"179px",margin:'auto'}} variant="outlined">Join Room</Button>)
        }
       
    </div>
  )
}
