import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import logo from "../img/logo-white.svg";
import userProfile from "../img/user-profile-example.svg";
import { Link } from "react-router-dom";

export default function Header() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div className="container max-w-none mx-auto header">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-2 header-grid">
          <div className="col-span-1 logo">
            <div>
              {currentUser ? (
                <Link to="/dashboard">
                  <img src={logo} alt="logo" />
                </Link>
              ) : (
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              )}
            </div>
          </div>
          <div className="col-span-5 logged-menu">
            <li className="nav-item">
              {/* <Link to={"/home"} className="nav-link">
                  Home
                </Link> */}
            </li>
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/wallet"} className="nav-link">
                  Wallet
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/swap"} className="nav-link">
                  Swap
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/stake"} className="nav-link">
                  Stake
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="col-span-6 user-profile">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  <img src={userProfile} />
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.firstname}
                </Link>
              </li>
              <li className="nav-item logout">
                <a href="/login" className="nav-link" onClick={logOut}>
                  <i className="fa-solid fa-power-off"></i>
                </a>
              </li>
            </div>
          ) : (
            <div className="col-span-6 no-logged-menu">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link login">
                  Acceder
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link register">
                  Registro
                </Link>
              </li>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
