import './App.css';
import Chat from './Chat'
import { useState } from 'react';
import { Login } from './Login';
function App() {
  const [user, setUser] = useState(null)
  function setgetuser(e) {
    setUser(e)
  }
  function handlelogout(){
    setUser(null)
  }
  return (
    <div className="App">
      {
        (!user) ?
          (<Login getuser={setgetuser} />) :
          (<div className="app__cont">
            <Chat photo={user.photoURL} logout={handlelogout} name={user.displayName} />
          </div>)
      }
    </div>
  )
}

export default App;
