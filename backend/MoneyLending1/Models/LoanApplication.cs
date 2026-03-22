using System;

namespace LoanManagement.Models
{
    public class LoanApplication
    {
        public int applicationId { get; set; }
        public int borrowerId { get; set; }
        public string borrowerName { get; set; }

        public string phone { get; set; }
        public int loanProductId { get; set; }
        public string loanProductName { get; set; }

        public decimal interestRate { get; set; }

        
        public decimal requestedAmount { get; set; }
        public int requestedTermMonths { get; set; }
        public string status { get; set; }
        public string requestedAt { get; set; }
    }
}
