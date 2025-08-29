import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './components/Landing/Navbar'
import Herosection from './components/Landing/Herosection'
import Background from './components/Landing/Background'



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
    </>
  )
}

export default App
