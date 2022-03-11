import './App.css';
import Chat from './Chat'
import { useState} from 'react';
import { Login } from './Login';
import { Room } from './Room';
import { Leftbar } from './Leftbar';
function App() {
  const [user, setUser] = useState(null)
  const [room, setroom] = useState(null)

  function setgetuser(e) {
    setUser(e)
  }
  function handlelogout() {
    setUser(null)
    setroom(null)
  }
  function roomfunc(e) {
    setroom(e)
  }
  function roomswitch(){
    setroom(null)
  }
  return (
    <div className="App">
      {
        (!user) ?
          (<Login getuser={setgetuser} />) :
          (room ? (<div className="app__cont">
            <Leftbar photo={user.photoURL} logout={handlelogout} name={user.displayName} roomid={room} switchroom={roomswitch} />
            <Chat photo={user.photoURL} logout={handlelogout} name={user.displayName} roomid={room} switchroom={roomswitch} a />
          </div>) : <Room roomfunc={roomfunc} photo={user.photoURL} name={user.displayName} />
          )
      }
    </div>
  )
}

export default App;
