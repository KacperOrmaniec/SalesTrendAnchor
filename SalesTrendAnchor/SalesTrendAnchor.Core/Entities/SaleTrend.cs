namespace SalesTrendAnchor.Core.Entities;

public class SaleTrend(string product, string buyer, DateTime nextBuyDate, DateTime lastSaleDate, double predictedQuantity, double confidenceScore)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Product { get; private set; } = product;
    public string Buyer { get; private set; } = buyer;
    public DateTime LastSaleDate { get; set; } = lastSaleDate;
    public DateTime NextBuyDate { get; set; } = nextBuyDate;
    public double PredictedQuantity { get; set; } = predictedQuantity;
    public double ConfidenceScore { get; set; } = confidenceScore;
}
