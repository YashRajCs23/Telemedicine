import React from "react";
import { Link } from "react-router-dom";

const BookButton = ({ color, textColor, to = "/check", text = "Book Now",paddingx,paddingy }) => {
  return (
    <Link
      to={to}
      className={`px-[2vw] py-[0.5vw] ${color} ${textColor} font-semibold rounded-lg hover:opacity-80 transition`}
    >
      {text}
    </Link>
  );
};

export default BookButton;
