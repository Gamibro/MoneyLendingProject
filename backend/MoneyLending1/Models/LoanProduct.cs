namespace LoanManagement.Models
{
    public class LoanProduct
    {
        public int loanProductId { get; set; }
        public string loanProductName { get; set; }
        public decimal interestRate { get; set; }
        public int defaultTermMonths { get; set; }
        public decimal lateFeeFixedAmount { get; set; }
        public bool isActive { get; set; }
    }
}
