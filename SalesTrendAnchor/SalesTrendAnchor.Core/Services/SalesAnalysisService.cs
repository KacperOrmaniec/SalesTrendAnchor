using SalesTrendAnchor.Core.Entities;
using SalesTrendAnchor.Core.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SalesTrendAnchor.Core.Services
{
    public class SalesAnalysisService : ISalesAnalysisService
    {
        public List<ChurnPredictionResult> PredictChurn(List<ClientSalesData> salesData)
        {
            var churnResults = new List<ChurnPredictionResult>();
            var monthOrder = GetMonthOrder();

            foreach (var clientData in salesData)
            {
                var sortedMonthlyData = clientData.Months
                    .OrderByDescending(m => monthOrder.GetValueOrDefault(m.Key.ToUpper(), 0))
                    .Select(m => m.Value.Turnover)
                    .ToList();

                bool isLosingBuyer = false;
                bool hasZeroTurnoverForConsecutiveMonths = false;
                double churnRiskScore = 0;
                string trendDescription = "Stable";

                if (sortedMonthlyData.Count >= 3)
                {
                    if (sortedMonthlyData[0] < sortedMonthlyData[1] && sortedMonthlyData[1] < sortedMonthlyData[2])
                    {
                        isLosingBuyer = true;
                        trendDescription = "Declining";
                        churnRiskScore += 40;
                    }
                    else if (sortedMonthlyData[0] < sortedMonthlyData[1])
                    {
                        isLosingBuyer = true;
                        trendDescription = "Recent Drop";
                        churnRiskScore += 20;
                    }
                }

                if (sortedMonthlyData.Count >= 2 && sortedMonthlyData[0] == 0 && sortedMonthlyData[1] == 0)
                {
                    hasZeroTurnoverForConsecutiveMonths = true;
                    churnRiskScore += 50;
                    trendDescription = "Inactive (Consecutive Zero Turnover)";
                }
                else if (sortedMonthlyData.Count >= 1 && sortedMonthlyData[0] == 0)
                {
                    churnRiskScore += 30; 
                    trendDescription = "Inactive (Most Recent Month Zero Turnover)";
                }

                churnResults.Add(new ChurnPredictionResult
                {
                    Client = clientData.Client,
                    IsLosingBuyer = isLosingBuyer,
                    HasZeroTurnoverForConsecutiveMonths = hasZeroTurnoverForConsecutiveMonths,
                    ChurnRiskScore = churnRiskScore,
                    TrendDescription = trendDescription
                });
            }

            return churnResults;
        }

        public List<TurnoverPredictionResult> PredictTurnover(List<ClientSalesData> salesData)
        {
            var predictionResults = new List<TurnoverPredictionResult>();
            var monthOrder = GetMonthOrder();

            foreach (var clientData in salesData)
            {
                var turnoverData = clientData.Months
                    .OrderBy(m => monthOrder.GetValueOrDefault(m.Key.ToUpper(), 0))
                    .Select(m => (double)m.Value.Turnover)
                    .ToList();

                if (turnoverData.Count < 2)
                {
                    predictionResults.Add(new TurnoverPredictionResult
                    {
                        Client = clientData.Client,
                        PredictedNextMonthTurnover = 0 
                    });
                    continue;
                }

                var xValues = Enumerable.Range(1, turnoverData.Count).Select(i => (double)i).ToArray();
                var yValues = turnoverData.ToArray();

                double sumX = xValues.Sum();
                double sumY = yValues.Sum();
                double sumXY = xValues.Zip(yValues, (x, y) => x * y).Sum();
                double sumX2 = xValues.Select(x => x * x).Sum();
                int n = turnoverData.Count;

                double denominator = (n * sumX2) - (sumX * sumX);

                if (denominator == 0)
                {
                    predictionResults.Add(new TurnoverPredictionResult
                    {
                        Client = clientData.Client,
                        PredictedNextMonthTurnover = (decimal)yValues.Average() 
                    });
                    continue;
                }

                double m = (n * sumXY - sumX * sumY) / denominator; 
                double b = (sumY - m * sumX) / n; 

                decimal predictedTurnover = (decimal)Math.Max(0, m * (n + 1) + b); 

                predictionResults.Add(new TurnoverPredictionResult
                {
                    Client = clientData.Client,
                    PredictedNextMonthTurnover = predictedTurnover
                });
            }

            return predictionResults;
        }

        public OverallTurnoverPredictionResult PredictOverallTurnover(List<ClientSalesData> salesData)
        {
            var overallPredictedTurnover = 0M;
            var monthOrder = GetMonthOrder();

            var allMonthlyTurnoverData = new Dictionary<string, decimal>();

            foreach (var clientData in salesData)
            {
                foreach (var monthEntry in clientData.Months)
                {
                    var monthKey = monthEntry.Key.ToUpper();
                    if (allMonthlyTurnoverData.ContainsKey(monthKey))
                    {
                        allMonthlyTurnoverData[monthKey] += monthEntry.Value.Turnover;
                    }
                    else
                    {
                        allMonthlyTurnoverData.Add(monthKey, monthEntry.Value.Turnover);
                    }
                }
            }

            var sortedOverallTurnoverData = allMonthlyTurnoverData
                .OrderBy(m => monthOrder.GetValueOrDefault(m.Key, 0))
                .Select(m => (double)m.Value)
                .ToList();

            if (sortedOverallTurnoverData.Count < 2)
            {
                return new OverallTurnoverPredictionResult { PredictedOverallNextMonthTurnover = 0 };
            }

            var xValues = Enumerable.Range(1, sortedOverallTurnoverData.Count).Select(i => (double)i).ToArray();
            var yValues = sortedOverallTurnoverData.ToArray();

            double sumX = xValues.Sum();
            double sumY = yValues.Sum();
            double sumXY = xValues.Zip(yValues, (x, y) => x * y).Sum();
            double sumX2 = xValues.Select(x => x * x).Sum();
            int n = sortedOverallTurnoverData.Count;

            double denominator = (n * sumX2) - (sumX * sumX);

            if (denominator == 0)
            {
                return new OverallTurnoverPredictionResult { PredictedOverallNextMonthTurnover = (decimal)yValues.Average() };
            }

            double m = (n * sumXY - sumX * sumY) / denominator;
            double b = (sumY - m * sumX) / n;

            overallPredictedTurnover = (decimal)Math.Max(0, m * (n + 1) + b);

            return new OverallTurnoverPredictionResult { PredictedOverallNextMonthTurnover = overallPredictedTurnover };
        }

        public List<ClientTrendAnalysis> AnalyzeTrends(List<ClientSalesData> salesData)
        {
            var trendAnalyses = new List<ClientTrendAnalysis>();
            var monthOrder = GetMonthOrder();

            foreach (var clientData in salesData)
            {
                var clientMonthlyTrends = new List<MonthlyTrend>();

                var sortedMonths = clientData.Months
                    .OrderBy(m => monthOrder.GetValueOrDefault(m.Key.ToUpper(), 0))
                    .ToList();

                for (int i = 1; i < sortedMonths.Count; i++)
                {
                    var currentMonthData = sortedMonths[i];
                    var previousMonthData = sortedMonths[i - 1];

                    var turnoverChange = currentMonthData.Value.Turnover - previousMonthData.Value.Turnover;
                    var turnoverChangePercentage = previousMonthData.Value.Turnover != 0 ? (turnoverChange / previousMonthData.Value.Turnover) * 100 : 0;
                    var turnoverTrend = GetTrendDescription(turnoverChange);

                    var marginChange = currentMonthData.Value.Margin - previousMonthData.Value.Margin;
                    var marginChangePercentage = previousMonthData.Value.Margin != 0 ? (marginChange / previousMonthData.Value.Margin) * 100 : 0;
                    var marginTrend = GetTrendDescription(marginChange);

                    clientMonthlyTrends.Add(new MonthlyTrend
                    {
                        Month = currentMonthData.Key,
                        TurnoverTrend = turnoverTrend,
                        TurnoverChangePercentage = turnoverChangePercentage,
                        MarginTrend = marginTrend,
                        MarginChangePercentage = marginChangePercentage
                    });
                }

                trendAnalyses.Add(new ClientTrendAnalysis
                {
                    Client = clientData.Client,
                    MonthlyTrends = clientMonthlyTrends
                });
            }

            return trendAnalyses;
        }

        public List<InactiveBuyerResult> IdentifyInactiveBuyers(List<ClientSalesData> salesData, int numberOfRecentMonths = 1)
        {
            var inactiveBuyers = new List<InactiveBuyerResult>();
            var monthOrder = GetMonthOrder();

            foreach (var clientData in salesData)
            {
                var sortedMonths = clientData.Months.OrderByDescending(m => monthOrder.GetValueOrDefault(m.Key.ToUpper(), 0)).ToList();

                var inactiveMonthsForClient = new List<string>();
                string lastActiveMonth = null;
                decimal lastActiveTurnover = 0;

                for (int i = 0; i < numberOfRecentMonths && i < sortedMonths.Count; i++)
                {
                    if (sortedMonths[i].Value.Turnover == 0)
                    {
                        inactiveMonthsForClient.Add(sortedMonths[i].Key);
                    }
                    else
                    {
                        lastActiveMonth = sortedMonths[i].Key;
                        lastActiveTurnover = sortedMonths[i].Value.Turnover;
                        break;
                    }
                }

                if (inactiveMonthsForClient.Count > 0)
                {
                     inactiveBuyers.Add(new InactiveBuyerResult
                    {
                        Client = clientData.Client,
                        InactiveMonths = inactiveMonthsForClient,
                        LastActiveMonth = lastActiveMonth,
                        LastActiveTurnover = lastActiveTurnover
                    });
                }
            }

            return inactiveBuyers;
        }

        private string GetTrendDescription(decimal change)
        {
            if (change > 0) return "Increasing";
            if (change < 0) return "Decreasing";
            return "Stable";
        }

        private Dictionary<string, int> GetMonthOrder()
        {
            return new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase)
            {
                { "STYCZEŃ", 1 },
                { "LUTY", 2 },
                { "MARZEC", 3 },
                { "KWIECIEŃ", 4 },
                { "MAJ", 5 },
                { "CZERWIEC", 6 },
                { "LIPIEC", 7 },
                { "SIERPIEŃ", 8 },
                { "WRZESIEŃ", 9 },
                { "PAŹDZIERNIK", 10 },
                { "LISTOPAD", 11 },
                { "GRUDZIEŃ", 12 }
            };
        }
    }
} 