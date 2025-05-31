using SalesTrendAnchor.Core.Entities;

namespace SalesTrendAnchor.Core.Services;

public interface ITrendSearchService
{
    Task<IEnumerable<SaleTrend>> FilterSaleTrends();
}