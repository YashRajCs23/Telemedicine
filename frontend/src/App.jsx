import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserLogin from './components/Landing/UserLogin.jsx'
import UserSignup from './components/Landing/UserSignup.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className=' bg-amber-300 text-blue-500 '>hii</h1>
      <UserLogin />
      <UserSignup />
    </>
  )
}

export default App
