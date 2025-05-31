namespace SalesTrendAnchor.Core.Entities;

public class SaleTrend(string product, string buyer, int quantity, DateTime nextBuyDate, DateTime lastSaleDate)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Product { get; private set; } = product;
    public string Buyer { get; private set; } = buyer;
    public int Quantity { get; set; } = quantity;
    public DateTime LastSaleDate { get; set; } = lastSaleDate;
    public DateTime NextBuyDate { get; set; } = nextBuyDate;
}
