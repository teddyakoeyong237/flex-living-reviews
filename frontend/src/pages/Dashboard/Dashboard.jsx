import { useEffect } from "react";
import ListReviews from "../../components/dashboard/ListReviews";
import { Link } from "react-router-dom";
import { useAllReview } from "../../context/FetchAllReviewContext";

function Dashboard() {
	// State to store the JSON data for rows, which will be used to display and process table data.

	const { reviews, loading } = useAllReview();

	useEffect(() => {
		document.title = "Dashboard - The Flex Living Reviews";
	}, []);

	return (
		<>
			<Link
				to="/views"
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: "8px",
					textDecoration: "none",
					color: "#666",
					fontSize: "14px",
					marginBottom: "16px",
					transition: "color 0.2s",
				}}
				onMouseOver={(e) => (e.currentTarget.style.color = "#000")}
				onMouseOut={(e) => (e.currentTarget.style.color = "#666")}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M19 12H5M12 19l-7-7 7-7" />
				</svg>
				Go back to homepage
			</Link>
			<h1 style={{ color: "#164f4c" }}>
				Welcome to the dashboard!
				<p
					style={{
						display: "block",
						fontSize: "14px",
						fontWeight: "normal",
						marginBlock: "4px",
					}}
				>
					Click ID To View The Review Details -{" "}
					<span style={{ fontWeight: "bold" }}>
						The Flex Living Reviews.&#128521;
					</span>
				</p>
			</h1>
			<ListReviews reviews={reviews} loading={loading} />
		</>
	);
}

export default Dashboard;
