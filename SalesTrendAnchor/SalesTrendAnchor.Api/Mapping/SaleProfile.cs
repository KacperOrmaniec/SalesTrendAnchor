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

        CreateMap<ClientSalesData, ClientSalesDataDto>().ReverseMap();
        CreateMap<ChurnPredictionResult, ChurnPredictionResultDto>().ReverseMap();
        CreateMap<MonthlyTrend, MonthlyTrendDto>().ReverseMap();
        CreateMap<ClientTrendAnalysis, ClientTrendAnalysisDto>().ReverseMap();
        CreateMap<InactiveBuyerResult, InactiveBuyerResultDto>().ReverseMap();
        CreateMap<MonthlyData, MonthlyDataDto>().ReverseMap();
        CreateMap<OverallTurnoverPredictionResult, OverallTurnoverPredictionResultDto>().ReverseMap();
        CreateMap<TurnoverPredictionResult, TurnoverPredictionResultDto>().ReverseMap();
    }
}
