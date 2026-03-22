using System;

namespace LoanManagement.Models.RequestAPI
{
    public class LoanRequestAPI : RequestAPI
    {
        public int? loanId { get; set; }
        public int? borrowerId { get; set; }
        public int? loanProductId { get; set; }
        public decimal? principalAmount { get; set; }
        public decimal? interestRate { get; set; }
        public int? termMonths { get; set; }
        public DateTime? startDate { get; set; }
        public string status { get; set; }
        public decimal? totalPayable { get; set; }
    }
}
