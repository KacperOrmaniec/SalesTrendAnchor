using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using SalesTrendAnchor.Core.Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class TurnoverPredictionHandler(ISalesAnalysisService salesAnalysisService) : IQueryHandler<TurnoverPredictionQuery, IEnumerable<TurnoverPredictionResult>>
{
    private readonly ISalesAnalysisService _salesAnalysisService = salesAnalysisService;

    public Task<IEnumerable<TurnoverPredictionResult>> Handle(TurnoverPredictionQuery query)
    {
        var results = _salesAnalysisService.PredictTurnover(query.SalesData.ToList());
        return Task.FromResult(results.AsEnumerable());
    }
}