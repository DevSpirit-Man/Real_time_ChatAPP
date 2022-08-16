import { Button, Input } from '@mui/material'
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { db } from './firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
export const Room = (props) => {
  const [roomid, setRoomid] = useState("")
  async function handleRoomID() {
    const q = query(collection(db, roomid), where("alert", "==", true), where("name", "==", props.name));
    const querySnapshot = await getDocs(q);
    let arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.id, " => ", doc.data());
    });
    if (arr.length === 0) {
      const msg = `${props.name} joined the chat`;
      await addDoc(collection(db, roomid), {
        alert: true,
        name: props.name,
        text: msg,
        userimg: props.photo,
        timestamp: serverTimestamp(),
        date: new Date().toString()
      });
    }
    props.roomfunc(roomid)

  }
  function handleGenerate() {
    const random = new Date().getHours().toString() + new Date().getMinutes().toString() + new Date().getSeconds().toString() + props.name.slice(0, Math.floor(Math.random() * 4)) + props.photo.slice(9, 10).toString()
    setRoomid(random)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '21px', alignItems: 'center', backgroundColor: '#252329', padding: '43px 56px', borderRadius: '8px', width: '422px' }}>
      <div className="usernameandall" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img style={{ width: '115px', height: '115px' }} alt={props.name} src={props.photo} />
        <h2 style={{ margin: 'auto', marginTop: '20px', color: 'white', fontFamily: 'Poppins', marginBottom: '10px', fontWeight: '400' }}>{props.name}</h2>
      </div>
      <Input autoFocus placeholder="Enter a room Id" inputProps={{ style: { fontSize: '14.75px', fontFamily: 'Poppins' } }} sx={{ width: '280px', color: 'white' }} value={roomid}
        onChange={(e) => { setRoomid(e.target.value) }} />
      <div className="btns">

      </div>
      <Button sx={{ fontWeight: 'bold',fontFamily: 'Poppins' }} onClick={() => { handleGenerate() }}>Generate one</Button>
      {
        roomid ? (<Button onClick={() => { handleRoomID() }} sx={{ width: "179px", margin: 'auto', fontWeight: 'bold',fontFamily: 'Poppins' }} variant="outlined">Join Room <LoginIcon style={{ marginLeft: '9px', width: '25px', height: '24px' }}></LoginIcon></Button>) : (<Button disabled sx={{ width: "179px", margin: 'auto', fontWeight: 'bold',fontFamily: 'Poppins' }} variant="outlined">Join Room <LoginIcon style={{ marginLeft: '9px', width: '25px', height: '24px' }}></LoginIcon></Button>)
      }
      <Button onClick={() => { props.setUser(null) }} style={{ position: 'absolute', top: 0, right: 0, marginTop: '19px', marginLeft: "19px",}}><LogoutIcon sx={{width:'22px'}} /></Button>

    </div>
  )
}
