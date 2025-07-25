# SalesTrendAnchor

SalesTrendAnchor is a web application supporting sales trend analysis, customer churn prediction, inactive buyer analysis, and turnover forecasting. It consists of a .NET 8 backend (REST API) and a React frontend (MUI, TailwindCSS).

## Features

- Import sales data (CSV, Excel)
- Analyze sales trends for clients and products
- Predict customer churn
- Detect inactive buyers
- Forecast turnover (per client and overall)
- Clear interface with tables, charts, and notifications
- Light and dark mode support

## Technology Stack

### Backend

- .NET 8 (ASP.NET Core Web API)
- AutoMapper
- Swashbuckle (Swagger)
- Microsoft.Extensions.DependencyInjection

### Frontend

- React 19
- MUI (Material-UI)
- TailwindCSS
- React Router
- dayjs, papaparse, xlsx

## Getting Started

### Backend (.NET API)

1. Go to the `SalesTrendAnchor/SalesTrendAnchor.Api` directory
2. Run:
   ```bash
   dotnet run
   ```
   By default, the API will be available at `https://localhost:7183` or `http://localhost:5062`.
3. Swagger documentation is available at `/swagger`.

### Frontend (React)

1. Go to the `SalesTrendAnchor/salestrendanchor.web` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
   By default, the app will be available at `http://localhost:3000`

### Connecting Frontend and Backend

- The default API address is set in `src/config.js` and `src/services/api.js`.
- Make sure both servers (frontend and backend) are running.

## Repository Structure

- `SalesTrendAnchor.Api` – backend (API, business logic, DTOs, configuration)
- `SalesTrendAnchor.Core` – domain logic and services layer
- `salestrendanchor.web` – frontend (React, MUI, TailwindCSS)

## Sample Input Data

- CSV/Excel files should contain the columns: `product`, `quantity`, `buyer`, `saleDate`

## Deployment

- The frontend can be built with `npm run build` (for deployment e.g. on Netlify)
- The backend can be hosted on any server supporting .NET 8

## Authors

- Kacper Ormaniec

## License

Project licensed under the MIT License.
