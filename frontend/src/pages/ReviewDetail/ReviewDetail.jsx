import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../layout/Navbar";
import ReviewSection from "../../components/property/ReviewSection";
import "./ReviewDetail.css";

const ReviewDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [review, setReview] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReview = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/api/reviews/hostaway"
				);
				const foundReview = response.data.find((r) => r.id === parseInt(id));

				if (foundReview) {
					setReview(foundReview);
				}
				setLoading(false);
			} catch (error) {
				console.error("Error fetching review:", error);
				setLoading(false);
			}
		};

		fetchReview();
	}, [id]);

	if (loading) {
		return (
			<>
				<Navbar />
				<div className="review-detail-loading">Loading review...</div>
			</>
		);
	}

	if (!review) {
		return (
			<>
				<Navbar />
				<div className="review-detail-container">
					<div className="review-not-found">
						<h2>Review not found</h2>
						<button onClick={() => navigate("/")} className="back-button">
							Go Back
						</button>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<div className="review-detail-container">
				<button onClick={() => navigate(-1)} className="back-button">
					← Back to Reviews
				</button>

				<div className="property-header">
					<div className="property-image">
						<img
							src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop"
							alt={review.listingName}
						/>
					</div>
					<div className="property-info">
						<h1>{review.listingName}</h1>
						<p className="property-description">
							Discover comfort and style in this beautiful property. Perfect for
							your next stay.
						</p>
					</div>
				</div>

				<ReviewSection review={review} />
			</div>
		</>
	);
};

export default ReviewDetail;
