using SalesTrendAnchor.Core.Entities;

namespace SalesTrendAnchor.Core.Services;

public class TrendSearchService(IEnumerable<Sale> sales)
{
    private readonly IEnumerable<Sale> _sales = sales;
    public Task<IEnumerable<SaleTrend>> FilterSaleTrends()
    {

        var result = _sales
            .GroupBy(sale => new { sale.Product, sale.Buyer })
            .Where(s => s.Count() >= 3)
            .Select(s =>
            {
                var salesList = s.OrderByDescending(sale => sale.SaleDate).ToList();
                var lastSale = salesList.First();
                var nextBuyDate = DateTime.UtcNow;
                return new SaleTrend(lastSale.Product, lastSale.Buyer, lastSale.Quantity, nextBuyDate, lastSale.SaleDate);
            }); 
        return Task.FromResult(result.AsEnumerable());
    }
}
