import { Link } from "react-router";

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home </Link>
            <Link to="/menu" className="nav-link">Menu </Link>
            <Link to="/profile" className="nav-link">Profile </Link>
            <Link to="/cart" className="nav-link">Cart </Link>
        </div>
    </nav>
}

export default NavBar