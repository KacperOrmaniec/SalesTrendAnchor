using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using SalesTrendAnchor.Core.Services;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class GetSaleTrendsJsonHandler : IQueryHandler<GetSaleTrendsJsonQuery, IEnumerable<SaleTrend>>
{
    public Task<IEnumerable<SaleTrend>> Handle(GetSaleTrendsJsonQuery query)
    {
        var trendService = new TrendSearchService(query.Sales);
        return trendService.FilterSaleTrends();
    }
}
