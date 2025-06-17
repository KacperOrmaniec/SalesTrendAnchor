using AutoMapper;
using SalesTrendAnchor.Api.DTO;
using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Query;
using SalesTrendAnchor.Core.Query.Handlers;
using SalesTrendAnchor.Core.Services.Abstractions;

namespace SalesTrendAnchor.Api.Endpoints;

public static class SalesTrendEndpoints
{
    public static void MapSalesTrendEndpoints(this WebApplication app)
    {
        app.MapGet("analyze-in-memory-sale-trends", async (GetSaleTrendsHandler handler, IMapper mapper) =>
        {
            var result = await handler.Handle(new GetSaleTrendsQuery());
            var resultDto = mapper.Map<IEnumerable<SaleTrendDto>>(result);
            
            return Results.Ok(result);
        });

        app.MapPost("analyze-json-sales-trends", async (List<SaleDto> salesDto, GetSaleTrendsJsonHandler handler, IMapper mapper) =>
        {
            var sales = mapper.Map<List<Sale>>(salesDto);
            var result = await handler.Handle(new GetSaleTrendsJsonQuery(sales));

            var resultDto = mapper.Map<List<SaleTrendDto>>(result);
            
            return Results.Ok(resultDto);
        });
    }
}
 

