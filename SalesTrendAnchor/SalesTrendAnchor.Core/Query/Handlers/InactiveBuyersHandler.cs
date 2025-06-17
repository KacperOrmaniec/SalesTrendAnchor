using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using SalesTrendAnchor.Core.Services;
using SalesTrendAnchor.Core.Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesTrendAnchor.Core.Query.Handlers;

public class InactiveBuyersHandler(ISalesAnalysisService salesAnalysisService) : IQueryHandler<InactiveBuyersQuery, IEnumerable<InactiveBuyerResult>>
{
    private readonly ISalesAnalysisService _salesAnalysisService = salesAnalysisService;

    public Task<IEnumerable<InactiveBuyerResult>> Handle(InactiveBuyersQuery query)
    {
        var results = _salesAnalysisService.IdentifyInactiveBuyers(
            query.SalesData.ToList(),
            query.NumberOfRecentMonths
        );
        return Task.FromResult(results.AsEnumerable());
    }
}