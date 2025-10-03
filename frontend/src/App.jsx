import React from 'react'
import SpamForm from './components/SpamForm'
import "./App.css"
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <SpamForm/>
      <Footer/>
    </div>
  )
}

export default App