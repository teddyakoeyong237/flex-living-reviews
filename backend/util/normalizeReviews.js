export const normalizeReviews = (reviews) => {
	if (!Array.isArray(reviews)) return [];

	return reviews.map((review) => {
		const categories = {};

		if (
			Array.isArray(review.reviewCategory) &&
			review.reviewCategory.length > 0
		) {
			review.reviewCategory.forEach((cat) => {
				if (cat.category && cat.rating !== undefined) {
					categories[cat.category] = cat.rating;
				}
			});
		}

		// Convert submittedAt to a Datetime Object
		const submittedAt = review.submittedAt
			? new Date(review.submittedAt.replace(" ", "T"))
			: null;

		return {
			...review,
			reviewCategory: categories,
			submittedAt: submittedAt,
		};
	});
};
