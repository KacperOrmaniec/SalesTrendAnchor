namespace SalesTrendAnchor.Core.Entities;

public class ClientSalesData
{
    public string Client { get; set; }
    public Dictionary<string, MonthlyData> Months { get; set; }
}