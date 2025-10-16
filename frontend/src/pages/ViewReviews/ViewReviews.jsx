import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReviews } from "../../context/ReviewContext";
import ReviewCard from "../../components/property/ReviewCard";
import Navbar from "../../layout/Navbar";
import "./ViewReviews.css";

const ViewReviews = () => {
	const { reviews, loading } = useReviews();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Published Reviews - The Flex Living Reviews";
	}, []);

	const handleReviewClick = (review) => {
		navigate(`/views/${review.id}`, { state: { context: "filtered" } });
	};

	if (loading) {
		return <div className="no-reviews">Loading reviews...</div>;
	}

	if (reviews.length === 0) {
		return (
			<div className="no-reviews">
				<p>No published reviews available</p>
			</div>
		);
	}

	return (
		<>
			<Navbar />
			<div className="review-cards-container">
				{reviews.map((review) => (
					<ReviewCard
						key={review.id}
						review={review}
						onClick={handleReviewClick}
					/>
				))}
			</div>
		</>
	);
};

export default ViewReviews;
