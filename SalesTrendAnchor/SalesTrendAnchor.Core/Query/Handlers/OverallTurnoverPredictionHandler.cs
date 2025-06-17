using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using SalesTrendAnchor.Core.Services;
using SalesTrendAnchor.Core.Services.Abstractions;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class OverallTurnoverPredictionHandler(ISalesAnalysisService salesAnalysisService) : IQueryHandler<OverallTurnoverPredictionQuery, OverallTurnoverPredictionResult>
{
    private readonly ISalesAnalysisService _salesAnalysisService = salesAnalysisService;

    public Task<OverallTurnoverPredictionResult> Handle(OverallTurnoverPredictionQuery query)
    {
        var result = _salesAnalysisService.PredictOverallTurnover(query.SalesData.ToList());
        return Task.FromResult(result);
    }
}
