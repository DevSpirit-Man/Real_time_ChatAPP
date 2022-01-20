import './App.css';
import { Leftbar } from './components/Leftbar'
import Chat from './components/Chat'
function App() {
  return (
    <div className="App">
      <div className="app__cont">
        <Leftbar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
