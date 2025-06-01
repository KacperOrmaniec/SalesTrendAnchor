using SalesTrendAnchor.Api.Mapping;
using SalesTrendAnchor.Api.Endpoints; 

namespace SalesTrendAnchor.Api;

public static class Extensions
{
    public static IServiceCollection AddApi(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(SaleProfile).Assembly);
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        return services;
    }   
}
