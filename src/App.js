import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import NoteSate from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import React, { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <NoteSate>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert} />} />
              <Route exact path='/signup' element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteSate>
    </>
  );
}

export default App;
