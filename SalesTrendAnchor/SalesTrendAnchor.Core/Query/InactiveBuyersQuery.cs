using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;
using System.Collections.Generic;

namespace SalesTrendAnchor.Core.Query;

public class InactiveBuyersQuery : IQuery<IEnumerable<InactiveBuyerResult>>
{
    public IEnumerable<ClientSalesData> SalesData { get; }
    public int NumberOfRecentMonths { get; }

    public InactiveBuyersQuery(IEnumerable<ClientSalesData> salesData, int numberOfRecentMonths)
    {
        SalesData = salesData;
        NumberOfRecentMonths = numberOfRecentMonths;
    }
}
