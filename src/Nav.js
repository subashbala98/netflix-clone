import React, { useState, useEffect } from "react";
import "./nav.css";
import netflix from "./mainlogo.png";

function Nav() {
  const [handle, setHandle] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setHandle(true);
      } else {
        setHandle(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${handle && "nav_scrol"}`}>
      <img className="logo" src={netflix} alt="logo" />
      <img
        className="avatar"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="avatar"
      />
    </div>
  );
}

export default Nav;
