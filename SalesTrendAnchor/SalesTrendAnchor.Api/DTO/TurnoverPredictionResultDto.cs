namespace SalesTrendAnchor.Api.DTO;

public class TurnoverPredictionResultDto
{
    public string Client { get; set; }
    public decimal PredictedNextMonthTurnover { get; set; }
}
