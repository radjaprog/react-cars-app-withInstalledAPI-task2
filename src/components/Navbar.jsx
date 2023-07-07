import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul className="d-flex p-3">
        <li className="m-3">
          <Link to="/cars">Cars</Link>
        </li>
        <li className="m-3">
          <Link to="/add">Add</Link>
        </li>
      </ul>
    </nav>
  );
};
