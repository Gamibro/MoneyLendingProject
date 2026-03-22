using System;

namespace LoanManagement.Models.RequestAPI
{
    public class LoanApplicationRequestAPI : RequestAPI
    {
        public int? applicationId { get; set; }
        public int? borrowerId { get; set; }
        public int? loanProductId { get; set; }
        public decimal? requestedAmount { get; set; }
        public int? requestedTermMonths { get; set; }

        public decimal? interestRate { get; set; }
        public string status { get; set; }
    }
}
