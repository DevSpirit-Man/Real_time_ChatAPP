import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';
import { Avatar, Button } from '@mui/material';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MenuIcon from '@mui/icons-material/Menu';
import './css/Responsive.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import { where, getDocs, limit } from "firebase/firestore";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast, { Toaster } from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const Leftbar = (props) => {

  const [show, setShow] = useState(false)
  const [user, setUser] = useState([])
  const qr = query(collection(db, props.roomid));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const map = new Map();
  useEffect(
    () => {
      onSnapshot(qr, (snapshot) => setUser(snapshot.docs.map((doc) => [{ name: doc.data().name, img: doc.data().userimg }])))
    }
    , []);
  user.forEach((item) => {
    map.set(item[0].name, item[0].img);
  })

  //  function getPhoto(name) {
  //   const q = query(collection(db, props.roomid), where("name", "==", name), limit(1));
  //   let querySnapshot;
  //   getDocs(q).then((sm)=>{
  //     querySnapshot=sm
  //     const iarr = []
  //     querySnapshot?.forEach((doc) => {
  //       iarr.push(doc.data().userimg)
  //       // console.log(doc.data().userimg,Math.random());
  //     });
  //     console.log(iarr[0]);
  //     return iarr[0]
  //   }).catch((err)=>{

  //   })


  // }
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
      <Toaster />
      <div className="hamburger">
        {
          (!show) ? (<button onClick={() => { menu() }} style={{ width: 'fit-content', margin: '0', outline: 'none', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><MenuIcon style={{ margin: '0', fontSize: '19px', marginBottom: '-7.15px', color: 'white' }} ></MenuIcon></button>) : (<button onClick={() => { menu() }} style={{ width: 'fit-content', margin: '0', outline: 'none', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'white' }}><ArrowBackIosNewIcon style={{ fontSize: '17px', marginBottom: '-6.65px' }}></ArrowBackIosNewIcon></button>)
        }

      </div>
      <div className='leftbar' id='showleft' style={{ backgroundColor: 'rgb(18,15,19)', minWidth: '284px', position: 'relative', height: '100%', flex: '0.17', transition: 'all 0.25s' }}>

        <div className="roomdetails" style={{ height: '48.75px', borderBottom: '2px solid rgb(26,26,26)', display: 'flex', alignItems: 'center', position: 'relative', backgroundColor: '#120F13' }}>
          <ChatIcon color="diabled" style={{ marginLeft: '30px', width: '25px', marginBottom: '-4px' }}></ChatIcon>
          <h4 style={{ marginLeft: '9px', marginTop: '0px', color: 'white', font: 'Noto Sans', fontWeight: '500', fontStyle: 'normal', fontSize: '18px', letterSpacing: '-0.035em' }}>Chatzoid</h4>
        </div>

        <div className="rommspecificidandp" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '34px' }}>
          <p style={{ color: 'white', font: 'Noto Sans', fontWeight: '500', fontStyle: 'normal', fontSize: '16.85px', letterSpacing: '-0.035em', marginLeft: '31px', marginRight: '26px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>{props.roomid}<ContentCopyIcon color="primary" style={{ marginLeft: '12px', width: '18.25px', marginBottom: '-6px', cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText(props.roomid); toast.success('Room id copied to clipboard'); }} /></p>

        </div>

        <div className="roomidandstuff" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 29px', marginTop: '29px' }}>
          <p style={{ color: 'white', font: 'Noto Sans', fontWeight: '400', fontStyle: 'normal', fontSize: '15px', letterSpacing: '-0.035em' }}>Share this room id to your friends</p>
        </div>


        <h5 style={{ color: 'white', font: 'Noto Sans', fontWeight: '500', fontStyle: 'normal', fontSize: '16.85px', letterSpacing: '-0.035em', marginTop: '29px', marginLeft: '29px', marginBottom: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>Members &nbsp; :</h5>
        <div className="sepater" style={{ overflowY: 'scroll', height: '58vh' }}>
          <div className="roomidandstuff" style={{ display: 'flex', flexDirection: 'row', padding: '0 29px', marginTop: '-2.5px', marginBottom: '20.5px' }}>
          </div>
          {
            Array.from(map, ([key, value]) => {
              return (
                <div className="people" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '16px', marginBottom: '12px' }}>
                  {/* <FiberManualRecordIcon color="disabled" style={{ width: '10px', marginLeft: '29.99px', marginTop: '1px' }} /> */}
                  <div className="imagebox" style={{ width: '42px', height: '42px', borderRadius: '100%', marginLeft: '30.99px' }}>
                    <Avatar src={value} style={{ width: '42px', height: '42px' }} alt="" />
                  </div>
                  <p style={{ color: '#828282', marginLeft: '15.5px', font: 'Noto Sans', fontWeight: '500', fontStyle: 'normal', fontSize: '15.58px', letterSpacing: '-0.035em' }}>{key}</p>
                </div>)
            })
          }
        </div>
        <div className="switchroom" style={{ width: '100%', position: 'absolute', bottom: '68px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={() => { props.switchroom() }} size="small" sx={{ color: '#828282', font: 'Noto Sans', fontWeight: '600', fontStyle: 'normal', fontSize: '15px', letterSpacing: '-0.019em', textTransform: 'lowercase',padding:'5px 12px', }}>
            <span style={{ textTransform: 'uppercase' }}>s</span> witch &nbsp; <span style={{ textTransform: 'uppercase' }}> r</span>oom 
          </Button>
        </div>
        <div className="userdetails" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: '0px', height: '55px', backgroundColor: '#0B090C', width: '100%', borderTop: '2px solid rgb(26,26,26)' }}>
          <img src={props.photo} style={{ width: '40px', height: '42px', borderRadius: '50%', marginLeft: '24px', marginTop: '-1.5px' }} alt="" />
          <h5 style={{ marginLeft: '12px', color: 'white', font: 'Noto Sans', fontWeight: '500', fontStyle: 'normal', fontSize: '15px', letterSpacing: '-0.035em', zIndex: '99' }}>{props.name}</h5>
          <button onClick={() => { handleClickOpen() }} style={{ cursor: 'pointer', width: 'fit-content%', marginLeft: '221px', outline: 'none', border: 'none', backgroundColor: 'transparent', position: 'absolute', left: '29px', marginTop: '4px' }}><LogoutIcon color="primary" style={{ width: '19.2px' }}></LogoutIcon></button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Logout
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure , do you want to logout
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => props.logout()}>yes</Button>
              <Button onClick={handleClose} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  )
}
