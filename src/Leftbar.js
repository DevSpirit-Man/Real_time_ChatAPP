import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import TagIcon from '@mui/icons-material/Tag';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './css/Responsive.css'
import CloseIcon from '@mui/icons-material/Close';
export const Leftbar = (props) => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState([])
  const qr = query(collection(db, props.roomid));
  useEffect(
    () => {
      onSnapshot(qr, (snapshot) => setUser(snapshot.docs.map((doc) => doc.data().name)))
    }
    , []);
  function menu() {
    if (show === false) {
      document.getElementById('showleft').style.display = "block"
      setShow(!show)
    }
    else {
      document.getElementById('showleft').style.display = "none"
      setShow(!show)
    }
  }
  return (
    <>
      <div className="hamburger">
        {
          (!show) ? (<button onClick={() => { menu() }} style={{ width: 'fit-content', margin: '0', outline: 'none', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><MenuIcon style={{ margin: '0', fontSize: '19px', marginBottom: '-4.5px',color:'white' }} ></MenuIcon></button>) : (<button onClick={() => { menu() }} style={{ width: 'fit-content', margin: '0', outline: 'none', border: 'none', backgroundColor: 'transparent', cursor: 'pointer',color:'white'  }}><CloseIcon style={{ fontSize: '19px', marginBottom: '-4.5px' }}></CloseIcon></button>)
        }

      </div>
      <div className='leftbar' id='showleft' style={{ backgroundColor: 'rgb(18,15,19)', minWidth: '262px', borderRight: '1px solid #616161', position: 'relative', height: '100%', flex: '0.17', transition: 'all 0.25s' }}>

        <div className="roomdetails" style={{ height: '48.75px', borderBottom: '1px solid #616161', display: 'flex', alignItems: 'center', position: 'relative',}}>
          <ChatIcon color="diabled" style={{ marginLeft: '30px', width: '22px' }}></ChatIcon>
          <h4 style={{ marginLeft: '5px', fontSize: '14.85px', marginTop: '-4px', color: 'white' }}>Chatzoid</h4>
        </div>
        <div className="roomidandstuff" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 29px', marginTop: '29px' }}>
          <h5 style={{ color: 'white', fontSize: '14px' }}>Room id</h5>
        </div>
        <div className="rommspecificidandp" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '22px' }}>
          <TagIcon style={{ marginLeft: '27px', width: '19px' }} color="diabled"></TagIcon>
          <p style={{ color: 'white', fontSize: '14.5px', fontWeight: '600', marginLeft: '4px', marginRight: '26px' }}>{props.roomid}</p>

        </div>

        <div className="sepater" style={{ marginTop: '29px', overflowY: 'scroll', height: '50vh' }}>
          <div className="roomidandstuff" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 29px', marginTop: '9px', marginBottom: '23.5px' }}>
            <h5 style={{ color: 'white', fontSize: '14px' }}>participants</h5>
          </div>
          {
            Array.from(new Set(user)).map((item) => {
              return (
                <div className="people" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '9px', marginBottom: '18px' }}>
                  <img style={{ width: '40px', borderRadius: '100%', marginLeft: '22px' }} src={`https://avatars.dicebear.com/api/male/${item}.svg?&skin=light&mouth=smile`} alt="" />
                  <p style={{ color: 'white', fontSize: '14.5px', fontWeight: '600', marginLeft: '12px' }}>{item.split(' ')[0] + " " + item.split(' ')[1]}</p>
                </div>)
            })
          }
        </div>
        <div className="switchroom" style={{ width: '100%', position: 'absolute', bottom: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={() => { props.switchroom() }} size="small" sx={{ fontWeight: '500',color:'white' }}>
            switch room
          </Button>
        </div>
        <div className="userdetails" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: '0px', height: '52px', backgroundColor: 'rgb(60,57,63)', borderTop: '1px solid #616161', width: '100%' }}>
          <img src={props.photo} style={{ width: '35px', borderRadius: '100%', marginLeft: '24px' }} alt="" />
          <h5 style={{ marginLeft: '12px', color: 'white' }}>{props.name.split(' ')[0]}</h5>
          <button onClick={() => { props.logout(); }} style={{ cursor: 'pointer', width: '100%', marginLeft: '59px', outline: 'none', border: 'none', backgroundColor: 'transparent', position: 'absolute', left: '29px' }}><LogoutIcon style={{ width: '20px',color:'white' }}></LogoutIcon></button>
        </div>
      </div>
    </>
  )
}
