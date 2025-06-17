using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Collections.Generic;

namespace SalesTrendAnchor.Core.Query;

public class ChurnPredictionQuery : IQuery<IEnumerable<ChurnPredictionResult>>
{
    public IEnumerable<ClientSalesData> SalesData { get; }

    public ChurnPredictionQuery(IEnumerable<ClientSalesData> salesData)
    {
        SalesData = salesData;
    }
}
