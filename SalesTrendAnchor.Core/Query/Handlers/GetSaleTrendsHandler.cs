using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class GetSaleTrendsHandler
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
