import axios from "axios";

let cachedToken = null;
let tokenExpiry = null;

export const getHostAwayToken = async () => {
	if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
		return cachedToken;
	}

	try {
		const response = await axios.post(
			`${process.env.API_BASE_URL}/v1/accessTokens`,
			new URLSearchParams({
				grant_type: "client_credentials",
				client_id: process.env.HOSTAWAY_ACCOUNT_ID,
				client_secret: process.env.HOSTAWAY_API_KEY,
				scope: "general",
			}),
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
		);

		cachedToken = response.data.access_token;
		const expiresIn = response.data.expires_in;
		tokenExpiry = Date.now() + (expiresIn - 3600) * 1000;

		return cachedToken;
	} catch (error) {
		console.error("Error fetching HostAway token:", error);
		throw new Error("Failed to authenticate HostAway API");
	}
};
