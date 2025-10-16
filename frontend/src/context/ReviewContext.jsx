import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ReviewContext = createContext();

const baseURL = "http://localhost:8000";

export const ReviewProvider = ({ children }) => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [lastFetch, setLastFetch] = useState(null);

	const fetchReviews = async (force = false) => {
		// Only fetch if we haven't fetched yet or if force is true
		if (reviews.length > 0 && !force) {
			return;
		}

		try {
			setLoading(true);
			const response = await axios.get(`${baseURL}/api/reviews/hostaway`);
			const publishedReviews = response.data.filter(
				(review) => review.status === "published"
			);
			setReviews(publishedReviews);
			setLastFetch(Date.now());
		} catch (error) {
			console.error("Error fetching reviews:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<ReviewContext.Provider value={{ reviews, loading, fetchReviews }}>
			{children}
		</ReviewContext.Provider>
	);
};

export const useReviews = () => {
	const context = useContext(ReviewContext);
	if (!context) {
		throw new Error("useReviews must be used within ReviewProvider");
	}
	return context;
};
