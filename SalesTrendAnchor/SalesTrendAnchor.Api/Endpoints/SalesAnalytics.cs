using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Services.Abstractions;

namespace SalesTrendAnchor.Api.Endpoints;

public static class SalesAnalytics
{
    public static void MapSaleAnalyticsEndpoints(this WebApplication app)
    {
        app.MapPost("/salesanalysis/churn-prediction", (List<ClientSalesData> salesData, ISalesAnalysisService salesAnalysisService) =>
        {
            var results = salesAnalysisService.PredictChurn(salesData);
            return Results.Ok(results);
        });

        app.MapPost("/salesanalysis/turnover-prediction", (List<ClientSalesData> salesData, ISalesAnalysisService salesAnalysisService) =>
        {
            var results = salesAnalysisService.PredictTurnover(salesData);
            return Results.Ok(results);
        });

        app.MapPost("/salesanalysis/overall-turnover-prediction", (List<ClientSalesData> salesData, ISalesAnalysisService salesAnalysisService) =>
        {
            var result = salesAnalysisService.PredictOverallTurnover(salesData);
            return Results.Ok(result);
        });

        app.MapPost("/salesanalysis/trend-analysis", (List<ClientSalesData> salesData, ISalesAnalysisService salesAnalysisService) =>
        {
            var results = salesAnalysisService.AnalyzeTrends(salesData);
            return Results.Ok(results);
        });

        app.MapPost("/salesanalysis/inactive-buyers", (List<ClientSalesData> salesData, ISalesAnalysisService salesAnalysisService, int? numberOfRecentMonths) =>
        {
            var results = salesAnalysisService.IdentifyInactiveBuyers(salesData, numberOfRecentMonths ?? 1);
            return Results.Ok(results);
        });
    }
}
