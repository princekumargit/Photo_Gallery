import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ islogin }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <div className="navBar">
        <div id="nav1">
          <div className="nav__logo">Photo Gallery App</div>
          {islogin && (
            <button className="button1" id="logout" onClick={handleLogout}>
              Log Out
            </button>
          )}
          {!islogin && (
            <div>
              <button
                className="button1"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In
              </button>
              <button
                className="button1"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
