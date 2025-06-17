namespace SalesTrendAnchor.Api.DTO;

public class InactiveBuyerResultDto
{
    public string Client { get; set; }
    public List<string> InactiveMonths { get; set; }
    public string LastActiveMonth { get; set; }
    public decimal LastActiveTurnover { get; set; }
}
