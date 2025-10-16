import { createContext, useContext, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaHome } from "react-icons/fa";
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
