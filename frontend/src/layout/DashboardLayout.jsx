import { useState } from "react";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div className="app">
			<Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
			<div className="content">{children}</div>
		</div>
	);
}

export default DashboardLayout;
