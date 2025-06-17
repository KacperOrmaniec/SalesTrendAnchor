namespace SalesTrendAnchor.Api.DTO;

public class MonthlyTrendDto
{
    public string Month { get; set; }
    public string TurnoverTrend { get; set; }
    public decimal TurnoverChangePercentage { get; set; }
    public string MarginTrend { get; set; }
    public decimal MarginChangePercentage { get; set; }
}
