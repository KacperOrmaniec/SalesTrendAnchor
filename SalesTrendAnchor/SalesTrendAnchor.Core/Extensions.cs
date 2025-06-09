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
                //// Trend 1: ProductA, Buyer1 (co 5 dni)
                //new Sale("ProductA", "Buyer1", 2, DateTime.UtcNow.AddDays(-25)),
                //new Sale("ProductA", "Buyer1", 3, DateTime.UtcNow.AddDays(-20)),
                //new Sale("ProductA", "Buyer1", 1, DateTime.UtcNow.AddDays(-15)),
                //new Sale("ProductA", "Buyer1", 4, DateTime.UtcNow.AddDays(-10)),
                //new Sale("ProductA", "Buyer1", 2, DateTime.UtcNow.AddDays(-5)),

                //// Trend 2: ProductB, Buyer2 (co 7 dni)
                //new Sale("ProductB", "Buyer2", 1, DateTime.UtcNow.AddDays(-28)),
                //new Sale("ProductB", "Buyer2", 2, DateTime.UtcNow.AddDays(-21)),
                //new Sale("ProductB", "Buyer2", 3, DateTime.UtcNow.AddDays(-14)),
                //new Sale("ProductB", "Buyer2", 2, DateTime.UtcNow.AddDays(-7)),
                //new Sale("ProductB", "Buyer2", 1, DateTime.UtcNow),

                //// Trend 3: ProductC, Buyer3 (co 10 dni)
                //new Sale("ProductC", "Buyer3", 2, DateTime.UtcNow.AddDays(-40)),
                //new Sale("ProductC", "Buyer3", 2, DateTime.UtcNow.AddDays(-30)),
                //new Sale("ProductC", "Buyer3", 2, DateTime.UtcNow.AddDays(-20)),
                //new Sale("ProductC", "Buyer3", 2, DateTime.UtcNow.AddDays(-10)),
                //new Sale("ProductC", "Buyer3", 2, DateTime.UtcNow),

                //// Trend 4: ProductD, Buyer4 (co 3 dni)
                //new Sale("ProductD", "Buyer4", 1, DateTime.UtcNow.AddDays(-12)),
                //new Sale("ProductD", "Buyer4", 1, DateTime.UtcNow.AddDays(-9)),
                //new Sale("ProductD", "Buyer4", 1, DateTime.UtcNow.AddDays(-6)),
                //new Sale("ProductD", "Buyer4", 1, DateTime.UtcNow.AddDays(-3)),
                //new Sale("ProductD", "Buyer4", 1, DateTime.UtcNow),

                //// Trend 5: ProductE, Buyer5 (co 14 dni)
                //new Sale("ProductE", "Buyer5", 5, DateTime.UtcNow.AddDays(-56)),
                //new Sale("ProductE", "Buyer5", 5, DateTime.UtcNow.AddDays(-42)),
                //new Sale("ProductE", "Buyer5", 5, DateTime.UtcNow.AddDays(-28)),
                //new Sale("ProductE", "Buyer5", 5, DateTime.UtcNow.AddDays(-14)),
                //new Sale("ProductE", "Buyer5", 5, DateTime.UtcNow),

                //// Trend 6: ProductF, Buyer6 (co 2 dni)
                //new Sale("ProductF", "Buyer6", 1, DateTime.UtcNow.AddDays(-8)),
                //new Sale("ProductF", "Buyer6", 1, DateTime.UtcNow.AddDays(-6)),
                //new Sale("ProductF", "Buyer6", 1, DateTime.UtcNow.AddDays(-4)),
                //new Sale("ProductF", "Buyer6", 1, DateTime.UtcNow.AddDays(-2)),
                //new Sale("ProductF", "Buyer6", 1, DateTime.UtcNow),

                //// Trend 7: ProductG, Buyer7 (co 20 dni)
                //new Sale("ProductG", "Buyer7", 3, DateTime.UtcNow.AddDays(-80)),
                //new Sale("ProductG", "Buyer7", 3, DateTime.UtcNow.AddDays(-60)),
                //new Sale("ProductG", "Buyer7", 3, DateTime.UtcNow.AddDays(-40)),
                //new Sale("ProductG", "Buyer7", 3, DateTime.UtcNow.AddDays(-20)),
                //new Sale("ProductG", "Buyer7", 3, DateTime.UtcNow),

                //// Trend 8: ProductH, Buyer8 (co 4 dni)
                //new Sale("ProductH", "Buyer8", 2, DateTime.UtcNow.AddDays(-16)),
                //new Sale("ProductH", "Buyer8", 2, DateTime.UtcNow.AddDays(-12)),
                //new Sale("ProductH", "Buyer8", 2, DateTime.UtcNow.AddDays(-8)),
                //new Sale("ProductH", "Buyer8", 2, DateTime.UtcNow.AddDays(-4)),
                //new Sale("ProductH", "Buyer8", 2, DateTime.UtcNow),

                //// Trend 9: ProductI, Buyer9 (co 6 dni)
                //new Sale("ProductI", "Buyer9", 4, DateTime.UtcNow.AddDays(-24)),
                //new Sale("ProductI", "Buyer9", 4, DateTime.UtcNow.AddDays(-18)),
                //new Sale("ProductI", "Buyer9", 4, DateTime.UtcNow.AddDays(-12)),
                //new Sale("ProductI", "Buyer9", 4, DateTime.UtcNow.AddDays(-6)),
                //new Sale("ProductI", "Buyer9", 4, DateTime.UtcNow),

                //// Trend 10: ProductJ, Buyer10 (co 8 dni)
                //new Sale("ProductJ", "Buyer10", 2, DateTime.UtcNow.AddDays(-32)),
                //new Sale("ProductJ", "Buyer10", 2, DateTime.UtcNow.AddDays(-24)),
                //new Sale("ProductJ", "Buyer10", 2, DateTime.UtcNow.AddDays(-16)),
                //new Sale("ProductJ", "Buyer10", 2, DateTime.UtcNow.AddDays(-8)),
                //new Sale("ProductJ", "Buyer10", 2, DateTime.UtcNow),

                //// Dodatkowe losowe sprzedaże (nie tworzą trendów)
                //new Sale("ProductX", "BuyerX", 1, DateTime.UtcNow.AddDays(-1)),
                //new Sale("ProductY", "BuyerY", 1, DateTime.UtcNow.AddDays(-2)),
                //new Sale("ProductZ", "BuyerZ", 1, DateTime.UtcNow.AddDays(-3)),
            };

            return new TrendSearchService(sales);
        });

        services.AddScoped<GetSaleTrendsHandler>();

        return services;
    }
}
