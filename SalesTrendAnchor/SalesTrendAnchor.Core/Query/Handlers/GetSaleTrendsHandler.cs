using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using SalesTrendAnchor.Core.Services;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class GetSaleTrendsHandler : IQueryHandler<GetSaleTrendsQuery, IEnumerable<SaleTrend>>
{
    private readonly ITrendSearchService _trendSearchService;

    public GetSaleTrendsHandler(ITrendSearchService trendSearchService)
    {
        _trendSearchService = trendSearchService;
    }

    public async Task<IEnumerable<SaleTrend>> Handle(GetSaleTrendsQuery query)
    {
        return await _trendSearchService.FilterSaleTrends();
    }
}
