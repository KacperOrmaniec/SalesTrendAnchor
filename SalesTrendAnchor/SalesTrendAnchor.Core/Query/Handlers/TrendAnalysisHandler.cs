using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using SalesTrendAnchor.Core.Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class TrendAnalysisHandler(ISalesAnalysisService salesAnalysisService) : IQueryHandler<TrendAnalysisQuery, IEnumerable<ClientTrendAnalysis>>
{
    private readonly ISalesAnalysisService _salesAnalysisService = salesAnalysisService;

    public Task<IEnumerable<ClientTrendAnalysis>> Handle(TrendAnalysisQuery query)
    {
        var results = _salesAnalysisService.AnalyzeTrends(query.SalesData.ToList());
        return Task.FromResult(results.AsEnumerable());
    }
}