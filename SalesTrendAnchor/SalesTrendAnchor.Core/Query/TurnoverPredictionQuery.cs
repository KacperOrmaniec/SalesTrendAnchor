using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Collections.Generic;

namespace SalesTrendAnchor.Core.Query;

public class TurnoverPredictionQuery : IQuery<IEnumerable<TurnoverPredictionResult>>
{
    public IEnumerable<ClientSalesData> SalesData { get; }

    public TurnoverPredictionQuery(IEnumerable<ClientSalesData> salesData)
    {
        SalesData = salesData;
    }
}
