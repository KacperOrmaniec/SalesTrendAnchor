namespace SalesTrendAnchor.Core.Query.Abstractions;

public interface IQueryHandler<TQuery, TResult>
    where TQuery : IQuery<TResult>
{
    Task<TResult> Handle(TQuery query);
}
