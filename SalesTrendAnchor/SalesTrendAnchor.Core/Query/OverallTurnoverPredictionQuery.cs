using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Collections.Generic;

namespace SalesTrendAnchor.Core.Query;

public class OverallTurnoverPredictionQuery : IQuery<OverallTurnoverPredictionResult>
{
    public IEnumerable<ClientSalesData> SalesData { get; }

    public OverallTurnoverPredictionQuery(IEnumerable<ClientSalesData> salesData)
    {
        SalesData = salesData;
    }
}
