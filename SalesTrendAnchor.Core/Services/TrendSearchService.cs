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
            .Where(s =>
            {
                var orderedSales = s.OrderByDescending(sale => sale.SaleDate).ToList();
                var intervals = new List<TimeSpan>();

                for (int i = 1; i < orderedSales.Count; i++)
                {
                    var diff = orderedSales[i].SaleDate - orderedSales[i - 1].SaleDate;
                    intervals.Add(diff);
                }

                var referenceDays = intervals[0].TotalDays;
                var toleranceDays = 3; 

                return intervals.All(interval => Math.Abs(interval.TotalDays - referenceDays) <= toleranceDays);
            })
            .Select(s =>
            {
                var orderedSales = s.OrderByDescending(sale => sale.SaleDate).ToList();

                var lastSale = orderedSales.First();
                var nextBuyDate = DateTime.UtcNow;
                return new SaleTrend(lastSale.Product, lastSale.Buyer, lastSale.Quantity, nextBuyDate, lastSale.SaleDate);
            }); 
        return Task.FromResult(result.AsEnumerable());
    }
}
