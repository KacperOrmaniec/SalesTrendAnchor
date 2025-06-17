using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class TurnoverPredictionHandler : IQueryHandler<TurnoverPredictionQuery, IEnumerable<TurnoverPredictionResult>>
{
    public Task<IEnumerable<TurnoverPredictionResult>> Handle(TurnoverPredictionQuery query)
    {
        // TODO: Implement logic
        throw new NotImplementedException();
    }
}
