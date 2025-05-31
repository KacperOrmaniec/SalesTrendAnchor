using SalesTrendAnchor.Core.Entities;

namespace SalesTrendAnchor.Core.Services;

public class TrendSearchService(IEnumerable<Sale> sales) : ITrendSearchService
{
    private readonly IEnumerable<Sale> _sales = sales;
    public Task<IEnumerable<SaleTrend>> FilterSaleTrends()
    {
        var result = _sales
            .GroupBy(sale => new { sale.Product, sale.Buyer })
            .Where(HasAtLeastThreeSales)
            .Where(HasConsistentIntervals)
            .Select(CreateSaleTrend);

        return Task.FromResult(result.AsEnumerable());
    }
    private static bool HasAtLeastThreeSales(IGrouping<object, Sale> group)
        => group.Count() >= 3;

    private static bool HasConsistentIntervals(IGrouping<object, Sale> group)
    {
        var lastFiveSales = group
            .OrderByDescending(sale => sale.SaleDate)
            .Take(5)
            .ToList();

        var intervals = GetIntervals(lastFiveSales);

        if (intervals.Count == 0)
            return false;

        var referenceDays = Math.Round(intervals[0].TotalDays);
        var toleranceDays = GetToleranceDays(referenceDays);
        return intervals.All(interval => Math.Abs(Math.Round(interval.TotalDays) - referenceDays) <= toleranceDays);
    }

    private static List<TimeSpan> GetIntervals(List<Sale> orderedSales)
    {
        var intervals = new List<TimeSpan>();
        for (int i = 1; i < orderedSales.Count; i++)
        {
            var diff = orderedSales[i].SaleDate - orderedSales[i - 1].SaleDate;
            intervals.Add(diff);
        }
        return intervals;
    }

    private static SaleTrend CreateSaleTrend(IGrouping<object, Sale> group)
    {
        var lastFiveSales = group
            .OrderByDescending(sale => sale.SaleDate)
            .Take(5)
            .ToList();

        var lastSale = lastFiveSales.First();
        var averageIntervalDays = CalculateAverageInterval(lastFiveSales);
        var nextBuyDate = lastSale.SaleDate.AddDays(averageIntervalDays);

        return new SaleTrend(
            lastSale.Product,
            lastSale.Buyer, 
            nextBuyDate, 
            lastSale.SaleDate);
    }

    private static double CalculateAverageInterval(List<Sale> lastFiveSales)
    {
        var totalDays = 0.0;
        for (int i = 1; i < lastFiveSales.Count; i++)
        {
            totalDays += (lastFiveSales[i - 1].SaleDate - lastFiveSales[i].SaleDate).TotalDays;
        }
        return totalDays / (lastFiveSales.Count - 1);
    }

    private static double GetToleranceDays(double referenceDays)
    {
        var tolerance = referenceDays switch
        {
            <= 7 => 1,
            <= 15 => 2,
            <= 30 => 3,
            <= 60 => 5,
            <= 90 => 7,
            _ => 10
        };

        return tolerance;
    }
}
