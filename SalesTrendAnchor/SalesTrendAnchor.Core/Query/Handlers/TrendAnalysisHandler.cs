using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class TrendAnalysisHandler : IQueryHandler<TrendAnalysisQuery, IEnumerable<ClientTrendAnalysis>>
{
    public Task<IEnumerable<ClientTrendAnalysis>> Handle(TrendAnalysisQuery query)
    {
        // TODO: Implement logic
        throw new NotImplementedException();
    }
}
