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
        services.AddSingleton<ITrendSearchService, TrendSearchService>(sp =>
        {
            var sales = new List<Sale>
            {
                new Sale("ProductA", "Buyer1", 2, DateTime.UtcNow.AddDays(-10), 30),
                new Sale("ProductA", "Buyer1", 3, DateTime.UtcNow.AddDays(-5), 30),
                new Sale("ProductA", "Buyer1", 1, DateTime.UtcNow.AddDays(-1), 30),
                new Sale("ProductB", "Buyer2", 5, DateTime.UtcNow.AddDays(-7), 30),
                new Sale("ProductB", "Buyer2", 2, DateTime.UtcNow.AddDays(-3), 30),
                new Sale("ProductC", "Buyer3", 5, DateTime.UtcNow.AddDays(-28), 30),
                new Sale("ProductC", "Buyer3", 2, DateTime.UtcNow.AddDays(-23), 30),
                new Sale("ProductC", "Buyer3", 5, DateTime.UtcNow.AddDays(-20), 30),
                new Sale("ProductC", "Buyer3", 2, DateTime.UtcNow.AddDays(-16), 30),
                new Sale("ProductD", "Buyer4", 5, DateTime.UtcNow.AddDays(-29), 30),
                new Sale("ProductD", "Buyer4", 2, DateTime.UtcNow.AddDays(-23), 30),
                new Sale("ProductD", "Buyer4", 5, DateTime.UtcNow.AddDays(-17), 30),
                new Sale("ProductD", "Buyer4", 2, DateTime.UtcNow.AddDays(-7), 30),
            };
            return new TrendSearchService(sales);
        });

        services.AddScoped<GetSaleTrendsHandler>();

        return services;
    }
}
