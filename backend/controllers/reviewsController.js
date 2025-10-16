import axios from "axios";
import { getHostAwayToken } from "../middleware/auth.js";
import { normalizeReviews } from "../util/normalizeReviews.js";

export const getHostAwayReviews = async (req, res) => {
	try {
		const token = await getHostAwayToken();

		const response = await axios.get(
			`${process.env.API_BASE_URL}/api/reviews/hostaway`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		const data = normalizeReviews(response.data.result);

		res.json(data);
	} catch (error) {
		console.error("Error fetching reviews:", error);
		res.status(500).json({
			success: false,
			error: "Failed to fetch reviews",
		});
	}
};
