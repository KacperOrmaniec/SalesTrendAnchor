namespace SalesTrendAnchor.Api.DTO;

public class ClientSalesDataDto
{
    public string Client { get; set; }
    public Dictionary<string, MonthlyDataDto> Months { get; set; }
}
