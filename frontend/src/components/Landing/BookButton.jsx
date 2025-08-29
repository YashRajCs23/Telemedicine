import React from 'react'

const BookButton = ({color,textColor}) => {
  return (
    <a
      href="#"
      className={`px-6 py-2 ${color} ${textColor}  font-semibold rounded-lg hover:opacity-80 transition`}
    >
      Book Now
    </a>
  )
}


export default BookButton
