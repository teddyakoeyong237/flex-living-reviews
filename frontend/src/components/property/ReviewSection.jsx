import "./ReviewSection.css";

const ReviewSection = ({ review }) => {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getStatusColor = (status) => {
		const colors = {
			published: "#10b981",
			pending: "#f59e0b",
			submitted: "#3b82f6",
			awaiting: "#6b7280",
			scheduled: "#8b5cf6",
			expired: "#ef4444",
		};
		return colors[status] || "#6b7280";
	};

	const renderStars = (rating) => {
		const stars = [];
		const fullStars = Math.floor(rating / 2);

		for (let i = 0; i < 5; i++) {
			if (i < fullStars) {
				stars.push(
					<span key={i} className="star filled">
						★
					</span>
				);
			} else {
				stars.push(
					<span key={i} className="star">
						☆
					</span>
				);
			}
		}
		return stars;
	};

	return (
		<div className="review-section">
			<h2 className="section-title">Guest Review</h2>

			<div className="review-section-card">
				<div className="review-header-section">
					<div className="guest-section">
						<div className="guest-avatar-large">
							{review.guestName.charAt(0).toUpperCase()}
						</div>
						<div className="guest-info">
							<h3>{review.guestName}</h3>
							<p className="review-date">{formatDate(review.submittedAt)}</p>
						</div>
					</div>

					<div className="review-meta-badges">
						<span className="review-type-badge">{review.type}</span>
						<span
							className="status-badge"
							style={{ backgroundColor: getStatusColor(review.status) }}
						>
							{review.status}
						</span>
					</div>
				</div>

				{review.rating && (
					<div className="rating-display">
						<div className="rating-score-large">
							<span className="score">{review.rating}</span>
							<span className="max-score">/10</span>
						</div>
						<div className="rating-stars-large">
							{renderStars(review.rating)}
						</div>
					</div>
				)}

				<div className="review-text-content">
					<h3>Review</h3>
					<p>{review.publicReview || "No review text provided"}</p>
				</div>

				{Object.keys(review.reviewCategory).length > 0 && (
					<div className="categories-breakdown">
						<h3>Rating Breakdown</h3>
						<div className="categories-list">
							{Object.entries(review.reviewCategory).map(
								([category, rating]) => (
									<div key={category} className="category-item">
										<div className="category-info">
											<span className="category-label">
												{category.replace(/_/g, " ")}
											</span>
											<span className="category-score">{rating}/10</span>
										</div>
										<div className="category-bar">
											<div
												className="category-fill"
												style={{ width: `${(rating / 10) * 100}%` }}
											/>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				)}

				<div className="review-metadata-section">
					<h3>Review Details</h3>
					<div className="metadata-grid">
						<div className="metadata-item">
							<span className="metadata-label">Review ID</span>
							<span className="metadata-value">{review.id}</span>
						</div>
						<div className="metadata-item">
							<span className="metadata-label">Review Type</span>
							<span className="metadata-value">{review.type}</span>
						</div>
						<div className="metadata-item">
							<span className="metadata-label">Status</span>
							<span className="metadata-value">{review.status}</span>
						</div>
						<div className="metadata-item">
							<span className="metadata-label">Property</span>
							<span className="metadata-value">{review.listingName}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewSection;
