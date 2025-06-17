using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class ChurnPredictionHandler : IQueryHandler<ChurnPredictionQuery, IEnumerable<ChurnPredictionResult>>
{
    public Task<IEnumerable<ChurnPredictionResult>> Handle(ChurnPredictionQuery query)
    {
        // TODO: Implement logic
        throw new NotImplementedException();
    }
}
