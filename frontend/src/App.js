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
import React, { useState, useEffect } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const initialColor = localStorage.getItem('mode') || 'light';
  const [mode, setMode] = useState(initialColor);

  useEffect(() => {
    document.body.style.backgroundColor = mode === 'light' ? '#ffffff' : '#202124';
    localStorage.setItem('mode', mode);
  }, [mode]);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleShow = () => {
    if (mode === 'light') {
      showAlert("Dark mode has been enabled", "success");
    }
    else {
      showAlert("Dark mode has been disabled", "success");
    }
  }

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? '#202124' : 'light';
      toggleShow();
      return newMode;
    });
  };

  return (
    <>
      <NoteSate>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alert alert={alert} />
          <div className="container mt-5">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} mode={mode} toggleMode={toggleMode} />} />
              <Route exact path='/about' element={<About mode={mode} toggleMode={toggleMode} />} />
              <Route exact path='/login' element={<Login showAlert={showAlert} mode={mode} toggleMode={toggleMode} />} />
              <Route exact path='/signup' element={<SignUp showAlert={showAlert} mode={mode} toggleMode={toggleMode} />} />
            </Routes>
          </div>
        </Router>
      </NoteSate>
    </>
  );
}

export default App;
