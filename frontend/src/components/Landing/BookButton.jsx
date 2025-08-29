import React from "react";
import { Link } from "react-router-dom";

const BookButton = ({ color, textColor, to = "/check", text = "Book Now" }) => {
  return (
    <Link
      to={to}
      className={`px-6 py-2 ${color} ${textColor} font-semibold rounded-lg hover:opacity-80 transition`}
    >
      {text}
    </Link>
  );
};

export default BookButton;
