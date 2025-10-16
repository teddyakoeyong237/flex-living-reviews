import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

const ListReviews = ({ reviews, loading }) => {
	const navigate = useNavigate();

	const handleRowClick = (event) => {
		const id = event.data.id; // assuming each review has an id field
		navigate(`/views/${id}`); // redirect to detail page
	};

	// Date formatter
	const dateFormatter = (params) => {
		return new Date(params.value).toLocaleDateString("en-us", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	// Rating renderer with stars
	const ratingRenderer = (params) => {
		if (!params.value) return "-";
		return `${"★".repeat(Math.floor(params.value / 2))}${"☆".repeat(
			5 - Math.floor(params.value / 2)
		)} (${params.value}/10)`;
	};

	// Categories renderer
	const categoriesRenderer = (params) => {
		if (!params.value || Object.keys(params.value).length === 0) return "-";
		return Object.entries(params.value)
			.map(([key, val]) => `${key}: ${val}`)
			.join(", ");
	};

	const statusOptions = [
		"awaiting",
		"pending",
		"scheduled",
		"submitted",
		"published",
		"expired",
	];

	const [columnDefs] = useState([
		{
			field: "id",
			headerName: "ID",
			width: 100,
			cellRenderer: (params) => (
				<span
					onClick={(e) => {
						e.stopPropagation(); // prevent row selection/double-click
						navigate(`/views/${params.value}`, { state: { context: "all" } });
					}}
					style={{
						color: "blue",
						cursor: "pointer",
						textDecoration: "underline",
					}}
				>
					{params.value}
				</span>
			),
		},
		{
			field: "listingName",
			headerName: "Property",
			width: 250,
			filter: "agTextColumnFilter",
		},
		{
			field: "guestName",
			headerName: "Guest",
			width: 180,
			filter: "agTextColumnFilter",
		},
		{
			field: "rating",
			headerName: "Rating",
			width: 180,
			cellRenderer: ratingRenderer,
			filter: "agNumberColumnFilter",
		},
		{
			field: "type",
			headerName: "Type",
			width: 150,
			filter: "agTextColumnFilter",
		},
		{
			field: "status",
			headerName: "Status",
			width: 140,
			filter: "agTextColumnFilter",
			editable: true, // allow editing
			cellEditor: "agSelectCellEditor", // dropdown editor
			cellEditorParams: { values: statusOptions },
		},
		{
			field: "publicReview",
			headerName: "Review",
			width: 400,
			filter: "agTextColumnFilter",
			cellStyle: { whiteSpace: "normal", lineHeight: "1.5" },
			autoHeight: true,
		},
		{
			field: "reviewCategory",
			headerName: "Categories",
			width: 300,
			cellRenderer: categoriesRenderer,
		},
		{
			field: "submittedAt",
			headerName: "Date",
			width: 150,
			valueFormatter: dateFormatter,
			filter: "agDateColumnFilter",
		},
	]);

	const defaultColDef = useMemo(() => {
		return {
			filter: true,
			// floatingFilter: true,
			resizable: true,
			sortable: true,
			filterParams: {
				buttons: ["clear"],
			},
		};
	}, []);

	return (
		<div
			// className="ag-theme-quartz"
			style={{
				width: "100%",
				overflowX: "auto",
				overflowY: "auto",
			}}
		>
			<AgGridReact
				loading={loading}
				rowData={reviews}
				columnDefs={columnDefs}
				overlayNoRowsTemplate="<span class='ag-overlay-no-rows-center'>No Reviews Found</span>"
				defaultColDef={defaultColDef}
				rowSelection={{ type: "multiple" }}
				pagination={true}
				paginationPageSize={10}
				paginationPageSizeSelector={[10, 25, 50, 100]}
				domLayout="autoHeight"
				// onRowDoubleClicked={handleRowClick}
			/>
		</div>
	);
};

export default ListReviews;
