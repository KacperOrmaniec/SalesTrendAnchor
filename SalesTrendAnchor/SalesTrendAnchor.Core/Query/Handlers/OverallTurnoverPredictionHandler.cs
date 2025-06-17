using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class OverallTurnoverPredictionHandler : IQueryHandler<OverallTurnoverPredictionQuery, OverallTurnoverPredictionResult>
{
    public Task<OverallTurnoverPredictionResult> Handle(OverallTurnoverPredictionQuery query)
    {
        // TODO: Implement logic
        throw new NotImplementedException();
    }
}
