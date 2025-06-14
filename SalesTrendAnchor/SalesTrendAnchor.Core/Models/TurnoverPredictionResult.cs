namespace SalesTrendAnchor.Core.Models
{
    public class TurnoverPredictionResult
    {
        public string Client { get; set; }
        public decimal PredictedNextMonthTurnover { get; set; }
    }
} 