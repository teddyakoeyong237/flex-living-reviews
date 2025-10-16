import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ReviewDetail from "./pages/ReviewDetail/ReviewDetail";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";

import { ReviewProvider } from "./context/ReviewContext";

import "./App.css";
import ViewReviews from "./pages/ViewReviews/ViewReviews";
import { FetchAllReviewProvider } from "./context/FetchAllReviewContext";

function App() {
	return (
		<FetchAllReviewProvider>
			<ReviewProvider>
				<Router>
					<Routes>
						<Route path="/views/:id" element={<ReviewDetail />} />
						<Route path="/views" element={<ViewReviews />} />
						<Route
							path="/manage"
							element={
								<DashboardLayout>
									<Dashboard />
								</DashboardLayout>
							}
						/>
					</Routes>
				</Router>
			</ReviewProvider>
		</FetchAllReviewProvider>
	);
}

export default App;
