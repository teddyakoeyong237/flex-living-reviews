import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

const ListReviews = ({ reviews, loading }) => {
	const navigate = useNavigate();

	// Date filter parameters
	var filterParams = {
		comparator: (filterLocalDateAtMidnight, cellValue) => {
			const cellDate = new Date(cellValue);

			if (cellDate < filterLocalDateAtMidnight) {
				return -1;
			} else if (cellDate > filterLocalDateAtMidnight) {
				return 1;
			}
			return 0;
		},
		filterOptions: ["greaterThan", "lessThan"], // Limit date filter to greater and less than.
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

	// Status options for dropdown
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
						e.stopPropagation();
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
			filterParams: {
				defaultOption: "greaterThanOrEqual",
			},
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
			field: "reviewCategory.cleanliness",
			headerName: "Cleanliness",
			width: 130,
			filter: "agNumberColumnFilter",
			filterParams: {
				defaultOption: "greaterThanOrEqual",
			},
			valueGetter: (params) => {
				const value = params.data.reviewCategory?.cleanliness;
				return value ?? "-";
			},
		},
		{
			field: "reviewCategory.communication",
			headerName: "Communication",
			width: 150,
			filter: "agNumberColumnFilter",
			filterParams: {
				defaultOption: "greaterThanOrEqual",
			},
			valueGetter: (params) => {
				const value = params.data.reviewCategory?.communication;
				return value ?? "-";
			},
		},
		{
			field: "reviewCategory.check-in",
			headerName: "Check-in",
			width: 120,
			filter: "agNumberColumnFilter",
			filterParams: {
				defaultOption: "greaterThanOrEqual",
			},
			valueGetter: (params) => {
				const value = params.data.reviewCategory?.["check-in"];
				return value ?? "-";
			},
		},
		{
			field: "reviewCategory.accuracy",
			headerName: "Accuracy",
			width: 120,
			filter: "agNumberColumnFilter",
			filterParams: {
				defaultOption: "greaterThanOrEqual",
			},
			valueGetter: (params) => {
				const value = params.data.reviewCategory?.accuracy;
				return value ?? "-";
			},
		},
		{
			field: "reviewCategory.location",
			headerName: "Location",
			width: 120,
			filter: "agNumberColumnFilter",
			filterParams: {
				defaultOption: "greaterThanOrEqual",
			},
			valueGetter: (params) => {
				const value = params.data.reviewCategory?.location;
				return value ?? "-";
			},
		},
		{
			field: "submittedAt",
			headerName: "Date",
			width: 150,
			valueFormatter: dateFormatter,
			filter: "agDateColumnFilter",
			filterParams: filterParams,
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
			/>
		</div>
	);
};

export default ListReviews;
