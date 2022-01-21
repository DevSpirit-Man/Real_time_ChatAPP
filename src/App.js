import './App.css';
import { Leftbar } from './components/Leftbar'
import Chat from './components/Chat'
import { useState } from 'react';
import { Login } from './components/Login';
function App() {
  const [user, setUser] = useState(null)
  const [photo,setphoto]=useState(null)
  function setgetuser(e) {
    // console.log(e);
    setUser(e)
    setphoto(e.photoURL)
  }
  return (
    <div className="App">
      {
        (!user) ?
          (<Login getuser={setgetuser} />) :
          (<div className="app__cont">
            <Leftbar avatar={photo}/>
            <Chat />
          </div>)
      }
    </div>
  )
}

export default App;
