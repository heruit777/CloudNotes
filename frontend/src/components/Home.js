import React, { useEffect } from 'react'
import Notes from './Notes'
import { Link } from 'react-router-dom';

function Home(props) {
  const { showAlert, mode} = props;
  useEffect(() => {
    console.log('home renderd')
  },[]);
  return (
    <div>
      <Notes showAlert={showAlert} mode={mode}/>
    </div>
  )
}

export default Home
