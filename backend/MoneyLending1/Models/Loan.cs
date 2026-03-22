using System;

namespace LoanManagement.Models
{
    public class Loan
    {
        public int loanId { get; set; }
        public int borrowerId { get; set; }
        public string phone { get; set; }
        public string borrowerName { get; set; }
        public int loanProductId { get; set; }
        public string loanProductName { get; set; }
        public decimal principalAmount { get; set; }
        public decimal interestRate { get; set; }
        public int termMonths { get; set; }
        public string startDate { get; set; }

        public decimal totalPayable { get; set; }
        public string status { get; set; }
    }
}
