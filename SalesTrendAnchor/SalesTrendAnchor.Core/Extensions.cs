using Microsoft.Extensions.DependencyInjection;
using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Handlers;
using SalesTrendAnchor.Core.Services;

namespace SalesTrendAnchor.Core;

public static class Extensions
{
    public static IServiceCollection AddCore(this IServiceCollection services)
    {
        services.AddScoped<GetSaleTrendsHandler>();
        services.AddScoped<GetSaleTrendsJsonHandler>();
        services.AddSingleton<ITrendSearchService, TrendSearchService>(sp =>
        {
            var sales = new List<Sale>
            {
                new Sale("ProductA", "Buyer1", 2, DateTime.UtcNow.AddDays(-10)),
                new Sale("ProductA", "Buyer1", 3, DateTime.UtcNow.AddDays(-5)),
                new Sale("ProductA", "Buyer1", 1, DateTime.UtcNow.AddDays(-1)),
                new Sale("ProductB", "Buyer2", 5, DateTime.UtcNow.AddDays(-7)),
                new Sale("ProductB", "Buyer2", 2, DateTime.UtcNow.AddDays(-3)),
                new Sale("ProductC", "Buyer3", 5, DateTime.UtcNow.AddDays(-28)),
                new Sale("ProductC", "Buyer3", 2, DateTime.UtcNow.AddDays(-23)),
                new Sale("ProductC", "Buyer3", 5, DateTime.UtcNow.AddDays(-20)),
                new Sale("ProductC", "Buyer3", 2, DateTime.UtcNow.AddDays(-16)),
                new Sale("ProductD", "Buyer4", 5, DateTime.UtcNow.AddDays(-29)),
                new Sale("ProductD", "Buyer4", 2, DateTime.UtcNow.AddDays(-23)),
                new Sale("ProductD", "Buyer4", 5, DateTime.UtcNow.AddDays(-17)),
                new Sale("ProductD", "Buyer4", 2, DateTime.UtcNow.AddDays(-7)),
            };
            return new TrendSearchService(sales);
        });

        services.AddScoped<GetSaleTrendsHandler>();

        return services;
    }
}
