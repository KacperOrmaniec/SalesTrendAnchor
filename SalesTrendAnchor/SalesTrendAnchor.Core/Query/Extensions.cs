using Microsoft.Extensions.DependencyInjection;
using SalesTrendAnchor.Core.Query.Handlers;

namespace SalesTrendAnchor.Core.Query;

public static class Extensions
{
    public static IServiceCollection AddQueries(this IServiceCollection services)
    {
        services.AddScoped<GetSaleTrendsHandler>();
        services.AddScoped<GetSaleTrendsJsonHandler>();
        services.AddScoped<ChurnPredictionHandler>();
        services.AddScoped<TurnoverPredictionHandler>();
        services.AddScoped<OverallTurnoverPredictionHandler>();
        services.AddScoped<TrendAnalysisHandler>();
        services.AddScoped<InactiveBuyersHandler>();

        return services;
    }
}