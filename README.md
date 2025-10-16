# Flex Living Reviews Dashboard

## Overview

The project is a review management dashboard for Flex Living Properties. It enables property managers to view, filter, and approve guest reviews. They choose what can be published by granting a review item a **status** of **published**.

## Tech Stack Used

- **Frontend:** React(Vite), with AG Grid, Axios, React Router
- **Backend:** Node.js/Express, with Cors, Axios,
- **API/Data Source:** Hostaway Reviews API

- Postman was used to build a mock server which fetches reviews created using the sample JSON provided.

## Key Design and Logic Decisions

1. The project is split into two modules:

- **/frontend** for the React user interaction app
- **/backend** for the Express API for fetching and normalizing reviews.

2. AG Grid Integration

- Clickable ID column for navigating to review detail pages.
- Fully responsive, sortable, and filterable table for reviews.
- Column update by double-clicking on Status, and selecting among the dropdown.

3. React Context API

- Stores review data globally to prevent redundant API calls.

## API Endpoints

- _GET /api/reviews/hostaway_ - Fetches and normalizes review data from a Mock Hostaway API created with Postman.

## Google Reviews Findings

## Running the Project Locally

**Clone the repository**
git clone <repo_url>
cd <repo_folder>

**Backend**
cd backend
npm install
npm run dev

**Frontend**
cd frontend
npm install
npm run dev
