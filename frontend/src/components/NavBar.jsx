import {Link} from "react-router";

function NavBar() {

    // TODO: transfer admin page (later) inside profile / registration AND history inside admin

    return <nav className="navbar">
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home </Link>
            <Link to="/menu" className="nav-link">Menu </Link>
            <Link to="/profile" className="nav-link">Profile </Link>
            <Link to="/admin" className="nav-link">Admin </Link>
            <Link to="/history" className="nav-link">History </Link>
            <Link to="/login" className="nav-link">LogIn</Link>
            <Link to="/cart" className="nav-link">Cart </Link>
        </div>
    </nav>
}

export default NavBar;
