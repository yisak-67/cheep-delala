import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand mx-4" to="/">
          CheapDelala
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Waiting
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/posted/sale">
                Sale <sub>(posted)</sub>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/posted/rent">
                Rent <sub>(posted)</sub>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Registerd Users
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
