import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ShowNavbar({ children }) {
  const location = useLocation();

  const [showNavbar, setshowNavbar] = useState(false);
  useEffect(() => {
    console.log("location is", location);

    if (
      location.pathname === "/" ||
      location.pathname === "/emailverify" ||
      location.pathname === "/register"
    ) {
      setshowNavbar(false);
    } else {
      setshowNavbar(true);
    }
  }, [location]);

  return <div>{showNavbar && children}</div>;
}

export default ShowNavbar;
