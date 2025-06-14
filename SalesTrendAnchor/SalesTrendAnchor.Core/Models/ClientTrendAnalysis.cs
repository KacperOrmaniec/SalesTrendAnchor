using System.Collections.Generic;

namespace SalesTrendAnchor.Core.Models
{
    public class MonthlyTrend
    {
        public string Month { get; set; }
        public string TurnoverTrend { get; set; }
        public decimal TurnoverChangePercentage { get; set; }
        public string MarginTrend { get; set; }
        public decimal MarginChangePercentage { get; set; }
    }

    public class ClientTrendAnalysis
    {
        public string Client { get; set; }
        public List<MonthlyTrend> MonthlyTrends { get; set; }
    }
} 