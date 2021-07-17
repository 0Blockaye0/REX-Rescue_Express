import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import dogIcon from "../../assets/dog2.png"

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              View Applications
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row signup-login">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 custom-header">
      <div class="header__bg">
      <div className="site-logo">
      <h1>
        <Link to="/">
          <img src={dogIcon} alt="dog" id="dogIcon"></img>
          <h1 id="our-title" >REX</h1>
          <h4>Welcome to Rescue Express (REX) our goal is to make it fast and easy to find the right furry friend for you.</h4>
          <h4> Simply select the size of pup you are looking for and start picking your new best buddy.</h4>
          <h4> All our dogs are rescues from our shelters.</h4>
        </Link>
      </h1>
      </div>
      <nav>
        {showNavigation()}
      </nav>
      </div>
    </header>
  );
}

export default Nav;
