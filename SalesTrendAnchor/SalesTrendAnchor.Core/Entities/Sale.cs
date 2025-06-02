namespace SalesTrendAnchor.Core.Entities;

public class Sale(string product, string buyer, int quantity, DateTime saleDate)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Product { get; set; } = product;
    public string Buyer { get; set; } = buyer;
    public int Quantity { get; set; } = quantity;
    public DateTime SaleDate { get; set; } = saleDate;
}
