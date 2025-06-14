using System.Collections.Generic;

namespace SalesTrendAnchor.Core.Models
{
    public class InactiveBuyerResult
    {
        public string Client { get; set; }
        public List<string> InactiveMonths { get; set; }
        public string LastActiveMonth { get; set; }
        public decimal LastActiveTurnover { get; set; }
    }
} 