import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup' // Ensure this import exists
import Home from './pages/home/Home'
import Projects from './components/Projects/Projects'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />} {/* Conditionally render LoginPopup */}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Home/>
        <Projects/>
      </div>
      <Footer />
    </>
  )
}

export default App