import { Link } from "react-router-dom";
import logo from "../assets/TheFlexLogo.webp";
import "./Navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-container">
				<Link to="/views" className="navbar-logo">
					<img src={logo} alt="The Flex Living Logo" className="logo-image" />
				</Link>

				<div className="navbar-menu">
					<Link to="/views" className="navbar-link">
						Home
					</Link>
					<Link to="/manage" className="navbar-link">
						Dashboard
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
