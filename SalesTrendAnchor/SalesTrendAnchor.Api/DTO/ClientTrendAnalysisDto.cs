namespace SalesTrendAnchor.Api.DTO;

public class ClientTrendAnalysisDto
{
    public string Client { get; set; }
    public List<MonthlyTrendDto> MonthlyTrends { get; set; }
}
