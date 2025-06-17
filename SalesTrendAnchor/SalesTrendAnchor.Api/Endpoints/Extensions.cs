namespace SalesTrendAnchor.Api.Endpoints;

public static class Extensions
{
    public static void MapEndpoints(this WebApplication app)
    {
        app.MapSalesTrendEndpoints();
        app.MapSaleAnalyticsEndpoints();
    }
}
