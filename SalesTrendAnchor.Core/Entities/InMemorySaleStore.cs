using SalesTrendAnchor.Core.Entities;

namespace SalesTrendAnchor.Infrastructure.Persistence;

public static class InMemorySaleStore
{
    public static List<Sale> Sales => new()
    {
        new Sale(
            product: "Laptop",
            buyer: "jan.kowalski@firma.pl",
            quantity: 1,
            saleDate: DateTime.Today.AddDays(-90),
            trendDays: 30
        ),
        new Sale(
            product: "Laptop",
            buyer: "jan.kowalski@firma.pl",
            quantity: 2,
            saleDate: DateTime.Today.AddDays(-60),
            trendDays: 30
        ),
        new Sale(
            product: "Laptop",
            buyer: "jan.kowalski@firma.pl",
            quantity: 1,
            saleDate: DateTime.Today.AddDays(-30),
            trendDays: 30
        ),
        new Sale(
            product: "Smartphone",
            buyer: "anna.nowak@firma.pl",
            quantity: 1,
            saleDate: DateTime.Today.AddDays(-15),
            trendDays: 30
        ),
        new Sale(
            product: "Tablet",
            buyer: "piotr.zielinski@firma.pl",
            quantity: 1,
            saleDate: DateTime.Today.AddDays(-5),
            trendDays: 30
        )
    };
}
