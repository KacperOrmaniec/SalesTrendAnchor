
using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Services;

class Program
{
    static async Task Main(string[] args)
    {
        var sales = new List<Sale>
        {
            new Sale("ProductA", "Buyer1", 2, DateTime.UtcNow.AddDays(-10), 30),
            new Sale("ProductA", "Buyer1", 3, DateTime.UtcNow.AddDays(-5), 30),
            new Sale("ProductA", "Buyer1", 1, DateTime.UtcNow.AddDays(-1), 30),
            new Sale("ProductB", "Buyer2", 5, DateTime.UtcNow.AddDays(-7), 30),
            new Sale("ProductB", "Buyer2", 2, DateTime.UtcNow.AddDays(-3), 30),
        };

        var trendService = new TrendSearchService(sales);
        var trends = await trendService.FilterSaleTrends();

        foreach (var trend in trends)
        {
            Console.WriteLine($"Product: {trend.Product}, Buyer: {trend.Buyer}, Quantity: {trend.Quantity}, LastSaleDate: {trend.LastSaleDate}, NextBuyDate: {trend.NextBuyDate}");
        }
    }
}
//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

//app.Run();
