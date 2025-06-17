using SalesTrendAnchor.Core.Entities;

namespace SalesTrendAnchor.Core.Services.Abstractions;

public interface ITrendSearchService
{
    Task<IEnumerable<SaleTrend>> FilterSaleTrends();
}