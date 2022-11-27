import React, { useEffect, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './css/Responsive.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast, { Toaster } from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

export const Leftbar = (props) => {

  const [show, setShow] = useState(false)
  const [user, setUser] = useState([])
  const qr = query(collection(db, props.roomid));
  const [open, setOpen] = React.useState(false);
  const [showRooms, setShowRooms] = useState(false)
  const [filtered, setFiltered] = useState([])
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

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
    , [props.roomid]);
  user.forEach((item) => {
    map.set(item[0].name, item[0].img);
  })

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
  const roomsArr = localStorage.getItem('rooms')
  const [newroomid, setNewRoomid] = useState('')

  function updateLocal() {
    if (!newroomid) return toast.error('invalid room id')
    localStorage.setItem('rooms', JSON.stringify([...JSON.parse(roomsArr), newroomid]))
    setNewRoomid('')
    handleCloseAdd()
  }

  function setFilter(text) {
    setFiltered(JSON.parse(roomsArr).filter(item => item.toLowerCase().includes(text.toLowerCase())))
    console.log(filtered);
  }

  return (
    <>
      <Toaster />
      <div className="hamburger">
        {
          (!show) ? (<button onClick={() => { menu() }} style={{ width: 'fit-content', margin: '0', outline: 'none', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><MenuIcon style={{ margin: '0', fontSize: '22px', marginBottom: '-6.15px', color: 'white', marginLeft: '-4.95px' }} ></MenuIcon></button>) : (<button onClick={() => { menu() }} style={{ width: 'fit-content', margin: '0', outline: 'none', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'white', position: 'absolute', left: '83vw' }}><ClearIcon style={{ fontSize: '18px', marginBottom: '-8.85px' }}></ClearIcon></button>)
        }

      </div>
      <div className='leftbar' id='showleft' style={{ backgroundColor: 'rgb(18,15,19)', minWidth: '284px', position: 'relative', height: '100%', flex: '0.17', transition: 'all 0.25s' }}>
        <div className="channelheader" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '52px', borderBottom: '1px solid rgb(35 35 35)' }}>
          {
            showRooms ? <><p style={{ fontSize: '16px', marginLeft: '34px', fontWeight: 'bold' }}> Rooms</p><div onClick={() => { handleClickOpenAdd() }} style={{ marginLeft: 'auto', marginRight: '20px', backgroundColor: '#252329', padding: '5px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer' }}><AddIcon sx={{}} /></div></> : <>
              <ArrowBackIosIcon onClick={() => { setShowRooms(prev => !prev) }} sx={{ fontSize: '18.5px', marginLeft: '32px', marginRight: '7px', cursor: 'pointer' }} />
              <p onClick={() => { setShowRooms(prev => !prev) }} style={{ fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>All Rooms</p>
            </>
          }
        </div>
        <Dialog PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "380px!important",
          }, style: { borderRadius: '11px' }
        }} open={openAdd} onClose={handleCloseAdd}>
          <div style={{ backgroundColor: '#252329' }}>
            <DialogTitle>Add Room</DialogTitle>
            <DialogContent>
              <input
                style={{ width: '92%', marginTop: '18px', fontSize: '13.75px', fontFamily: 'Poppins', backgroundColor: '#3C393F', height: '45px', border: 'none', outline: 'none', borderRadius: '7px', color: 'white', padding: '6px 13px' }}
                placeholder="Enter roomid"
                value={newroomid} onChange={e => setNewRoomid(e.target.value)}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAdd} style={{ fontFamily: 'Poppins' }}>Cancel</Button>
              <Button onClick={() => updateLocal()} style={{ fontFamily: 'Poppins' }}>Add</Button>
            </DialogActions>
          </div>

        </Dialog>
        {
          showRooms ? <>

            <div className="people" style={{ display: 'flex', flexDirection: 'column', marginTop: '16px', marginBottom: '12px', marginLeft: '28.59px', overflow: 'scroll', height: '88vh' }}>
              <div className="searchbox" style={{ backgroundColor: '#3C393F', width: '90%', borderRadius: '8px', padding: '3.5px 0px', marginBottom: '22px', marginTop: '15px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <SearchIcon sx={{ marginLeft: '12px' }} />
                <input onChange={e => setFilter(e.target.value)} style={{ border: 'none', outline: 'none', padding: '10px 15px', backgroundColor: 'transparent', color: 'white' }} type="text" placeholder='Search' />
              </div>
              {
                roomsArr && filtered.length === 0 && JSON.parse(roomsArr).map(item => {
                  return <div onClick={() => { props.switchroom(item); setShowRooms(false) }} key={item} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                    <div style={{ backgroundColor: '#252329', padding: '11px 18px', borderRadius: '11px', marginRight: '15px', fontSize: '15px' }} className="box">{item.slice(0, 1)}</div>
                    <p style={{ fontSize: '15px' }}>{item}</p></div>
                })
              }
              {
                filtered.map(item => {
                  return <div onClick={() => { props.switchroom(item); setShowRooms(false) }} key={item} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                    <div style={{ backgroundColor: '#252329', padding: '11px 18px', borderRadius: '11px', marginRight: '15px', fontSize: '15px' }} className="box">{item.slice(0, 1)}</div>
                    <p style={{ fontSize: '15px' }}>{item}</p></div>
                })
              }
            </div>
          </> :
            <>
              <div className="rommspecificidandp" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '34px' }}>
                <p style={{ color: 'white', font: 'Noto Sans', fontWeight: '500', fontStyle: 'normal', fontSize: '18.85px', letterSpacing: '-0.035em', marginLeft: '31px', marginRight: '26px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>{props.roomid}<ContentCopyIcon style={{ marginLeft: '12px', width: '18.25px', marginBottom: '-1.8px', cursor: 'pointer', color: 'white' }} onClick={() => {
                  navigator.clipboard.writeText(props.roomid); toast.success('Room id copied to clipboard', {
                    style: {
                      fontFamily: 'Poppins',
                      fontSize: '12.5px'
                    },
                  });
                }} /></p>

              </div>

              <div className="roomidandstuff" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 29px', marginTop: '29px' }}>
                <p style={{ color: 'white', font: 'Noto Sans', fontWeight: '400', fontStyle: 'normal', fontSize: '15px', letterSpacing: '-0.035em' }}>Share this room id to your friends</p>
              </div>


              <h5 className="memheader">{showRooms ? "Rooms" : "Members"} &nbsp; : </h5>
              <div className="sepater" style={{ overflowY: 'scroll', height: '50vh' }}>
                <div className="roomidandstuff" style={{ display: 'flex', flexDirection: 'row', padding: '0 29px', marginTop: '-2.5px', marginBottom: '20.5px' }}>
                </div>
                {
                  Array.from(map, ([key, value]) => {
                    return (
                      <div className="people" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '16px', marginBottom: '12px' }}>
                        {/* <FiberManualRecordIcon color="disabled" style={{ width: '10px', marginLeft: '29.99px', marginTop: '1px' }} /> */}
                        <div className="imagebox" style={{ width: '42px', height: '42px', borderRadius: '100%', marginLeft: '30.99px' }}>
                          <img src={value} style={{ width: '38px', height: '38px', borderRadius: '11px' }} alt="" />
                        </div>
                        <p style={{ color: '#828282', marginLeft: '15.5px', font: 'Noto Sans', fontWeight: '500', fontStyle: 'normal', fontSize: '15.58px', letterSpacing: '-0.035em' }}>{key}</p>
                      </div>)
                  })
                }
              </div>
            </>
        }

        <div className="userdetails" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: '0px', height: '57px', backgroundColor: '#0B090C', width: '100%', borderTop: '1px solid rgb(22 21 21)' }}>
          <img src={props.photo} style={{ width: '35px', height: '35px', borderRadius: '11px', marginLeft: '24px', marginTop: '-1.0px' }} alt="" />
          <h5 style={{ marginLeft: '12px', font: 'Noto Sans', fontWeight: '500', fontStyle: 'normal', fontSize: '15px', letterSpacing: '-0.035em', zIndex: '99', color: '#828282' }}>{props.name}</h5>
          <button onClick={() => { handleClickOpen() }} style={{ cursor: 'pointer', width: 'fit-content%', marginLeft: '221px', outline: 'none', border: 'none', backgroundColor: 'transparent', position: 'absolute', left: '29px', marginTop: '4px' }}><LogoutIcon style={{ width: '20.2px', color: 'white' }}></LogoutIcon></button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: { borderRadius: '11px' }
            }}
          >
            <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'Poppins' }}>
              Logout
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" sx={{ fontFamily: 'Poppins' }}>
                Are you sure , do you want to logout
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button sx={{ fontFamily: 'Poppins', color: 'white' }} onClick={() => props.logout()}>yes</Button>
              <Button sx={{ fontFamily: 'Poppins', color: 'white' }} onClick={handleClose} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  )
}
