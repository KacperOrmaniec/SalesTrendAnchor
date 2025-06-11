using SalesTrendAnchor.Core.Entities;

namespace SalesTrendAnchor.Core.Services;

public class TrendSearchService(IEnumerable<Sale> sales) : ITrendSearchService
{
    private readonly IEnumerable<Sale> _sales = sales;

    public Task<IEnumerable<SaleTrend>> FilterSaleTrends()
    {
        var result = _sales.AsParallel()
            .GroupBy(sale => new { sale.Product, sale.Buyer })
            .Where(HasAtLeastThreeSales)
            .Where(HasConsistentIntervals)
            .Select(CreateSaleTrend)
            .OrderByDescending(trend => trend.ConfidenceScore);

        return Task.FromResult(result.AsEnumerable());
    }

    private static bool HasAtLeastThreeSales(IGrouping<object, Sale> group)
        => group.Count() >= 3;

    private static bool HasConsistentIntervals(IGrouping<object, Sale> group)
    {
        var intervals = GetIntervals(group.OrderByDescending(s => s.SaleDate).Take(5));
        if (intervals.Count < 2) return false;

        var avg = intervals.Average(t => t.TotalDays);
        var stdDev = Math.Sqrt(intervals.Average(t => Math.Pow(t.TotalDays - avg, 2)));

        // Zmniejszamy tolerancję do 1.5 odchylenia standardowego dla lepszej dokładności
        return intervals.All(t => Math.Abs(t.TotalDays - avg) <= 1.5 * stdDev);
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
        
        // Obliczanie przewidywanej ilości
        var predictedQuantity = CalculatePredictedQuantity(lastFiveSales);
        
        // Obliczanie poziomu pewności
        var confidenceScore = CalculateConfidenceScore(lastFiveSales, averageIntervalDays);

        return new SaleTrend(
            lastSale.Product,
            lastSale.Buyer,
            nextBuyDate,
            lastSale.SaleDate,
            predictedQuantity,
            confidenceScore);
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

    private static double CalculatePredictedQuantity(List<Sale> lastFiveSales)
    {
        // Średnia ważona - nowsze zakupy mają większą wagę
        var weights = Enumerable.Range(1, lastFiveSales.Count)
            .Select(i => Math.Pow(0.8, lastFiveSales.Count - i))
            .ToList();
        
        var weightedSum = lastFiveSales.Zip(weights, (sale, weight) => sale.Quantity * weight).Sum();
        var totalWeight = weights.Sum();
        
        return Math.Round(weightedSum / totalWeight, 2);
    }

    private static double CalculateConfidenceScore(List<Sale> lastFiveSales, double averageIntervalDays)
    {
        var intervals = GetIntervals(lastFiveSales);
        var stdDev = Math.Sqrt(intervals.Average(t => Math.Pow(t.TotalDays - averageIntervalDays, 2)));
        
        // Im mniejsze odchylenie standardowe, tym wyższy score (50% wagi)
        var regularityScore = Math.Max(0, 1 - (stdDev / averageIntervalDays));
        
        // Im więcej zakupów, tym wyższy score (30% wagi)
        var quantityScore = Math.Min(1, lastFiveSales.Count / 5.0);
        
        // Im częstsze zakupy, tym wyższy score (20% wagi)
        var frequencyScore = Math.Min(1, 30 / averageIntervalDays);
        
        // Średnia ważona wszystkich składowych
        return Math.Round((regularityScore * 0.5 + quantityScore * 0.3 + frequencyScore * 0.2) * 100, 2);
    }
}
