using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;

namespace SalesTrendAnchor.Core.Query;

public record GetSaleTrendsJsonQuery(List<Sale> sales) : IQuery<IEnumerable<SaleTrend>>
{
    public List<Sale> Sales { get; } = sales;
}
