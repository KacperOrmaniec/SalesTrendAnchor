namespace SalesTrendAnchor.Core.Models
{
    public class ClientSalesData
    {
        public string Client { get; set; }
        public Dictionary<string, MonthlyData> Months { get; set; }
    }
} 