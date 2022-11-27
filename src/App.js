import './App.css';
import Chat from './Chat'
import { useEffect, useState } from 'react';
import { Login } from './Login';
import { Room } from './Room';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Leftbar } from './Leftbar';
import Signup from './Signup';
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const [user, setUser] = useState(null)
  const [room, setroom] = useState(null)
  const [signup, setSignUp] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('user')) {
      if (localStorage.getItem('user') !== 'undefined') {
        setUser(JSON.parse(localStorage.getItem('user')))
      }
    }
    if (localStorage.getItem('room')) {
      setroom(localStorage.getItem('room'))
    }
  }, [])

  function setgetuser(e) {
    setUser(e)
    localStorage.setItem('user', JSON.stringify(e))
  }
  function handlelogout() {
    setUser(null)
    setroom(null)
    localStorage.removeItem('user')
    localStorage.setItem('rooms', JSON.stringify([]))
    localStorage.removeItem('room')
  }
  function roomfunc(e) {
    setroom(e)
    localStorage.setItem('room', e)
  }
  function roomswitch(item) {
    setroom(item)
    localStorage.setItem('room', item)
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        {
          (!user) ?
            (signup ? <Signup setSignUp={setSignUp} getuser={setgetuser} /> : <Login setSignUp={setSignUp} getuser={setgetuser} />) :
            (room ? (<div className="app__cont">
              <Leftbar photo={user.photoURL} logout={handlelogout} name={user.displayName} roomid={room} switchroom={roomswitch} />
              <Chat photo={user.photoURL} logout={handlelogout} name={user.displayName} roomid={room} switchroom={roomswitch} a />
            </div>) : <Room roomfunc={roomfunc} photo={user.photoURL} name={user.displayName} setUser={setgetuser} />
            )
        }
      </div>
    </ThemeProvider>
  )
}

export default App;
