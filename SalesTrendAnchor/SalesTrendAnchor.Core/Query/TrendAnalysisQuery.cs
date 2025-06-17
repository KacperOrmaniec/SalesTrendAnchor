using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Collections.Generic;

namespace SalesTrendAnchor.Core.Query;

public class TrendAnalysisQuery : IQuery<IEnumerable<ClientTrendAnalysis>>
{
    public IEnumerable<ClientSalesData> SalesData { get; }

    public TrendAnalysisQuery(IEnumerable<ClientSalesData> salesData)
    {
        SalesData = salesData;
    }
}
