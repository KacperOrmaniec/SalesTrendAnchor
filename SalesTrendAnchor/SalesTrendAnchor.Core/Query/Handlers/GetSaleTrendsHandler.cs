using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using SalesTrendAnchor.Core.Services.Abstractions;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class GetSaleTrendsHandler(ITrendSearchService trendSearchService) : IQueryHandler<GetSaleTrendsQuery, IEnumerable<SaleTrend>>
{
    private readonly ITrendSearchService _trendSearchService = trendSearchService;

    public async Task<IEnumerable<SaleTrend>> Handle(GetSaleTrendsQuery query)
        => await _trendSearchService.FilterSaleTrends();
    
}
