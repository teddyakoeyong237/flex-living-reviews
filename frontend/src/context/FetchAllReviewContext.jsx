import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const FetchAllReviewContext = createContext();

const baseURL = import.meta.env.VITE_API_URL;

export const FetchAllReviewProvider = ({ children }) => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await axios.get(`${baseURL}/api/reviews/hostaway`);
				setReviews(response.data);
			} catch (error) {
				console.error("Error fetching reviews:", error);
			} finally {
				setLoading(false);
			}
		};

		// Fetch only if reviews are empty
		if (reviews.length === 0) fetchReviews();
	}, []);

	return (
		<FetchAllReviewContext.Provider
			value={{ reviews, setReviews, loading, setLoading }}
		>
			{children}
		</FetchAllReviewContext.Provider>
	);
};

export const useAllReview = () => {
	const context = useContext(FetchAllReviewContext);
	if (!context) {
		throw new Error("useAllReviews must be used within ReviewProvider");
	}
	return context;
};
