using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query;
using SalesTrendAnchor.Core.Query.Handlers;

namespace SalesTrendAnchor.Api.Endpoints;

public static class SalesTrendEndpoints
{
    public static void MapEndpoints(this WebApplication app)
    {
        app.MapGet("/api/get-sale-trends", async (GetSaleTrendsHandler handler) =>
        {
            var result = await handler.Handle(new GetSaleTrendsQuery());
            return Results.Ok(result);
        });

        app.MapPost("/api/analyze-sales-trends", async (List<Sale> sales, GetSaleTrendsJsonHandler handler) =>
        {
            var result = await handler.Handle(new GetSaleTrendsJsonQuery(sales));
            return Results.Ok(result);
        });
    }
}
