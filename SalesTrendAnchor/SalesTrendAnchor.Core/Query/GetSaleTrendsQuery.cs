using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query.Abstractions;

namespace SalesTrendAnchor.Core.Query;

public record GetSaleTrendsQuery : IQuery<IEnumerable<SaleTrend>>;
