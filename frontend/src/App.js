import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [alert, setalert] = useState(null);
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home  showAlert={showAlert}/>}/>
              <Route path='/about' element={<About showAlert={showAlert} />} />
              <Route path='/login' element={<Login showAlert={showAlert} />} ></Route>
              <Route path='/signup' element={<Signup  showAlert={showAlert}/>}></Route>

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
