import "./ReviewCard.css";

const ReviewCard = ({ review, onClick }) => {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const truncateText = (text, maxLength = 150) => {
		if (!text) return "No review text";
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + "...";
	};

	const getTopCategories = (categories) => {
		if (!categories || Object.keys(categories).length === 0) return [];
		return Object.entries(categories)
			.sort(([, a], [, b]) => b - a)
			.slice(0, 2);
	};

	return (
		<div className="review-card" onClick={() => onClick && onClick(review)}>
			<div className="review-card-image">
				<img
					src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop"
					alt={review.listingName}
				/>
			</div>

			<div className="review-card-header">
				<div className="review-property">
					<h3>{review.listingName}</h3>
					<span className="review-type">{review.type}</span>
				</div>
			</div>

			<div className="review-card-body">
				<div className="review-guest-info">
					<div className="guest-avatar">
						{review.guestName.charAt(0).toUpperCase()}
					</div>
					<div className="guest-details">
						<span className="guest-name">{review.guestName}</span>
						<span className="review-date">
							{formatDate(review.submittedAt)}
						</span>
					</div>
				</div>

				{review.rating && (
					<div className="review-rating">
						<span className="rating-score">{review.rating}</span>
						<span className="rating-label">/10</span>
					</div>
				)}

				<p className="review-text">{truncateText(review.publicReview)}</p>

				{getTopCategories(review.reviewCategory).length > 0 && (
					<div className="review-categories">
						{getTopCategories(review.reviewCategory).map(
							([category, rating]) => (
								<div key={category} className="category-chip">
									<span className="category-name">
										{category.replace(/_/g, " ")}
									</span>
									<span className="category-rating">{rating}</span>
								</div>
							)
						)}
					</div>
				)}
			</div>

			<div className="review-card-footer">
				<button className="view-details-btn">View Details</button>
			</div>
		</div>
	);
};

export default ReviewCard;
