using AutoMapper;
using SalesTrendAnchor.Api.DTO;
using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query;
using SalesTrendAnchor.Core.Query.Handlers;

namespace SalesTrendAnchor.Api.Endpoints;

public static class SalesAnalyticsEndpoints
{
    public static void MapSaleAnalyticsEndpoints(this WebApplication app)
    {
        app.MapPost("/salesanalysis/churn-prediction", async (
            List<ClientSalesDataDto> salesDataDto,
            ChurnPredictionHandler handler,
            IMapper mapper) =>
        {
            var salesData = mapper.Map<List<ClientSalesData>>(salesDataDto);
            var results = await handler.Handle(new ChurnPredictionQuery(salesData));
            var resultsDto = mapper.Map<List<ChurnPredictionResultDto>>(results);
            return Results.Ok(resultsDto);
        });

        app.MapPost("/salesanalysis/turnover-prediction", async (
            List<ClientSalesDataDto> salesDataDto,
            TurnoverPredictionHandler handler,
            IMapper mapper) =>
        {
            var salesData = mapper.Map<List<ClientSalesData>>(salesDataDto);
            var results = await handler.Handle(new TurnoverPredictionQuery(salesData));
            var resultsDto = mapper.Map<List<TurnoverPredictionResultDto>>(results);
            return Results.Ok(resultsDto);
        });

        app.MapPost("/salesanalysis/overall-turnover-prediction", async (
            List<ClientSalesDataDto> salesDataDto,
            OverallTurnoverPredictionHandler handler,
            IMapper mapper) =>
        {
            var salesData = mapper.Map<List<ClientSalesData>>(salesDataDto);
            var result = await handler.Handle(new OverallTurnoverPredictionQuery(salesData));
            var resultDto = mapper.Map<OverallTurnoverPredictionResultDto>(result);
            return Results.Ok(resultDto);
        });

        app.MapPost("/salesanalysis/trend-analysis", async (
            List<ClientSalesDataDto> salesDataDto,
            TrendAnalysisHandler handler,
            IMapper mapper) =>
        {
            var salesData = mapper.Map<List<ClientSalesData>>(salesDataDto);
            var results = await handler.Handle(new TrendAnalysisQuery(salesData));
            var resultsDto = mapper.Map<List<ClientTrendAnalysisDto>>(results);
            return Results.Ok(resultsDto);
        });

        app.MapPost("/salesanalysis/inactive-buyers", async (
            List<ClientSalesDataDto> salesDataDto,
            InactiveBuyersHandler handler,
            IMapper mapper,
            int? numberOfRecentMonths) =>
        {
            var salesData = mapper.Map<List<ClientSalesData>>(salesDataDto);
            var results = await handler.Handle(new InactiveBuyersQuery(salesData, numberOfRecentMonths ?? 1));
            var resultsDto = mapper.Map<List<InactiveBuyerResultDto>>(results);
            return Results.Ok(resultsDto);
        });
    }
}