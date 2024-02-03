import React from 'react'
import Notes from './Notes'

function Home(props) {
  const { showAlert, mode, toggleMode } = props;
  
  return (
    <div>
      <Notes showAlert={showAlert} mode={mode} toggleMode={toggleMode} />
    </div>
  )
}

export default Home
