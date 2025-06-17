using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class InactiveBuyersHandler : IQueryHandler<InactiveBuyersQuery, IEnumerable<InactiveBuyerResult>>
{
    public Task<IEnumerable<InactiveBuyerResult>> Handle(InactiveBuyersQuery query)
    {
        // TODO: Implement logic
        throw new NotImplementedException();
    }
}
