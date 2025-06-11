namespace SalesTrendAnchor.Api.DTO;

public class SaleTrendDto
{
    public Guid Id { get; set; }
    public string Product { get; set; }
    public string Buyer { get; set; }
    public DateTime LastSaleDate { get; set; }
    public DateTime NextBuyDate { get; set; }
    public double PredictedQuantity { get; set; }
    public double ConfidenceScore { get; set; }
} 