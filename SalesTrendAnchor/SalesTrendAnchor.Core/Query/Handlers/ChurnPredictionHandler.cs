using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using SalesTrendAnchor.Core.Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class ChurnPredictionHandler(ISalesAnalysisService salesAnalysisService) : IQueryHandler<ChurnPredictionQuery, IEnumerable<ChurnPredictionResult>>
{
    private readonly ISalesAnalysisService _salesAnalysisService = salesAnalysisService;
    public Task<IEnumerable<ChurnPredictionResult>> Handle(ChurnPredictionQuery query)
    {
        var results = _salesAnalysisService.PredictChurn(query.SalesData.ToList());
        return Task.FromResult(results.AsEnumerable());
    }
}
