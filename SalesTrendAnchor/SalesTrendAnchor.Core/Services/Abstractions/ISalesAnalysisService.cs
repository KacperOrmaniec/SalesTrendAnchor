using SalesTrendAnchor.Core.Entities;
using System.Collections.Generic;

namespace SalesTrendAnchor.Core.Services.Abstractions
{
    public interface ISalesAnalysisService
    {
        // 1. Churn Prediction (Losing Buyer)
        List<ChurnPredictionResult> PredictChurn(List<ClientSalesData> salesData);

        // 2. Turnover Prediction
        List<TurnoverPredictionResult> PredictTurnover(List<ClientSalesData> salesData);
        OverallTurnoverPredictionResult PredictOverallTurnover(List<ClientSalesData> salesData);

        // 3. Trend Analysis
        List<ClientTrendAnalysis> AnalyzeTrends(List<ClientSalesData> salesData);

        // 4. Inactive Buyers
        List<InactiveBuyerResult> IdentifyInactiveBuyers(List<ClientSalesData> salesData, int numberOfRecentMonths = 1);
    }
} 