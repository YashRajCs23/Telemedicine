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
function App() {
  const [count, setCount] = useState(0)


  return (
    <>
     <div className=''>
      {/* <Navbar/> */}
      <Navbar/>
      <Background/>
      <Herosection/>
     </div>
      <h1 className=' bg-amber-300 text-blue-500 '>hii</h1>
      <UserLogin />
      <UserSignup />

      <DoctorLogin />
      <DoctorSignup />
      
    </>
  )
}

export default App
