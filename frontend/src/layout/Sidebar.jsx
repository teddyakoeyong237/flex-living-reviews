// import { Link } from "react-router-dom";
// import { FaBars, FaChevronLeft, FaHome, FaUserAlt } from "react-icons/fa";
import { createContext, useContext, useState } from "react";
import {
	FaAngleDoubleLeft,
	FaAngleDoubleRight,
	FaEllipsisV,
	FaFilter,
	FaHome,
} from "react-icons/fa";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
	const [activeItem, setActiveItem] = useState("/");
	return (
		<aside className="sidebar-height">
			<nav className="sidebar-navbar">
				<div className="sidebar-logo">
					<button
						onClick={() => toggleSidebar(isCollapsed)}
						className="sidebar-button"
					>
						{isCollapsed ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
					</button>
				</div>

				<SidebarContext.Provider value={{ isCollapsed }}>
					<ul className="sidebar-nav-ul">
						<SidebarItem
							icon={<FaHome size={20} />}
							text={"Home"}
							link={"/manage"}
							active={activeItem === "/manage"}
							onClick={() => setActiveItem("/manage")}
						/>
						{/* <SidebarItem
							icon={<FaFilter size={20} />}
							text={"Filter"}
							link={"/view"}
							active={activeItem === "/view"}
							onClick={() => setActiveItem("/view")}
						/> */}
					</ul>
				</SidebarContext.Provider>

				{/* <div className="sidebar-bottom">
					<img
						src="logo192.png"
						alt="Diool_user_profile"
						className="sidebar-profile-logo"
					/>
					<div
						className={`sidebar-profile-container close-open-animation ${
							isCollapsed ? "w-52 ml-3" : "wid-0"
						}`}
					>
						<div className="sidebar-profile-info">
							<h4 className="profile-name">Sorelle DIOOL</h4>
							<span className="profile-email">sorelle@gmail.com</span>
						</div>
					</div>
					<FaEllipsisV size={20} />
				</div> */}
			</nav>
		</aside>

		// <>
		// <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
		// 	<div className="toggle-btn" onClick={toggleSidebar}>
		// 		<FaBars />
		// 	</div>
		// 	<nav className="sidebar-items">
		// 		<Link to={"/"}>
		// 			<FaHome />
		// 			<span className="item-text">Home</span>
		// 		</Link>
		// 		<Link to={"/process"}>
		// 			<FaHome />
		// 			<span className="item-text">Process</span>
		// 		</Link>
		// 	</nav>
		// 	<ul className="sidebar-items">
		// 		<li>
		// 			<FaHome /> <span className="item-text">Home</span>
		// 		</li>
		// 		<li>
		// 			<FaUserAlt /> <span className="item-text">Process Transactions</span>
		// 		</li>
		// 	</ul>
		// </div>
		// </>
	);
};

export default Sidebar;

export function SidebarItem({ icon, text, link, active, onClick }) {
	const { isCollapsed } = useContext(SidebarContext);

	return (
		<li
			className={`sidebar-list ${
				active ? "sidebar-active" : "sidebar-not-active"
			}`}
			onClick={onClick} // Trigger
		>
			<Link
				to={link}
				className={active ? "" : "black-color"}
				style={{
					display: "flex",
					alignItems: "center",
					width: "100%",
					textDecoration: "none",
				}}
			>
				{icon}
				<span
					className={` close-open-animation ${
						isCollapsed ? "w-52 ml-3" : "wid-0"
					}`}
				>
					{text}
				</span>
			</Link>
			{!isCollapsed && <div className="sidebar-list-reduced">{text}</div>}
		</li>
	);
}
