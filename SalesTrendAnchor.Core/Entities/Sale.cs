namespace SalesTrendAnchor.Core.Entities;

public class Sale(string product, string buyer, int quantity, DateTime saleDate, int trendDays)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Product { get; private set; } = product;
    public string Buyer { get; private set; } = buyer;
    public int Quantity { get; set; } = quantity;
    public DateTime SaleDate { get; set; } = saleDate;
}
