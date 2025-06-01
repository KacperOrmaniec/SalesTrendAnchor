namespace SalesTrendAnchor.Api.Mapping;

using AutoMapper;
using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Api.DTO;

public class SaleProfile : Profile
{
    public SaleProfile()
    {
        CreateMap<Sale, SaleDto>().ReverseMap();
        CreateMap<SaleTrend, SaleTrendDto>().ReverseMap();
    }
}
