import { Link } from "react-router-dom";
import "./Header.css";

import logo from "./Winc-logo-text-square.png";

function Header() {
  return (
    <header className="Header">
      <Link to={`/`}>
        <img src={logo} alt="Winc Academy logo" className="Header-brand" />
      </Link>
    </header>
  );
}

export default Header;
