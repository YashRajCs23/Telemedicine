import React from 'react'
import BookButton from './BookButton'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center px-[2vw] py-[1vw] fixed  '>
        <div className="logo flex-[1] font-bold text-[2vw]">
            LOgo
           
        </div>
        <div className="Links flex text-black font-light justify-center items-center flex-[2] gap-[2vw] text-[1.3vw]"> 
            <a href="">Home</a>
            <a href="">About</a>
            <a href="">Services</a>
            <a href="">Community</a> 
        </div>
        <div className="flex-[1] flex justify-end text-[1.3vw]">
          <BookButton/>
        </div>
    </div>
  )
}

export default Navbar
