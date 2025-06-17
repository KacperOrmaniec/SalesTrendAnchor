namespace SalesTrendAnchor.Core.Entities;

public class ChurnPredictionResult
{
    public string Client { get; set; }
    public bool IsLosingBuyer { get; set; }
    public bool HasZeroTurnoverForConsecutiveMonths { get; set; }
    public double ChurnRiskScore { get; set; }
    public string TrendDescription { get; set; }
}
