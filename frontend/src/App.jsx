import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Landing/UserLogin.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className=' bg-amber-300 text-blue-500 '>hii</h1>
      <Login />
    </>
  )
}

export default App
