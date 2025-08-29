import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './components/Landing/Navbar'
import Herosection from './components/Landing/Herosection'
import Background from './components/Landing/Background'



import './App.css'
import UserLogin from './components/Landing/UserLogin.jsx'
import UserSignup from './components/Landing/UserSignup.jsx'
import DoctorLogin from './components/Landing/DoctorLogin'
import DoctorSignup from './components/Landing/UserLogin.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router'
import AboutSection from './components/Landing/About/AboutSection.jsx'
function App() {
  const [count, setCount] = useState(0)
 
  
  
  const routeer=createBrowserRouter([
    {
      path:'/BookButton',
      element:<Background/>
    }
  ])

  


  return (
    <>

     <div className=''>
      <Navbar/> 
      <Background/>
      <Herosection/> 
      <AboutSection/>
     </div>
      
      <UserLogin />
      <UserSignup />

      <DoctorLogin />
      <DoctorSignup />
      
    </>
  )
}

export default App
