using System;

namespace LoanManagement.Models
{
    public class Payment
    {
        public int paymentId { get; set; }
        public int loanId { get; set; }
        public string loanName { get; set; }
        public string borrowerName { get; set; }
        public decimal paidAmount { get; set; }
        public decimal totalPaid { get; set; }
        public decimal balanceAmount { get; set; }
        public decimal totalOverdue { get; set; }
        public decimal paidOverdue { get; set; }
        public DateTime? createdDate { get; set; }
        public DateTime? updatedDate { get; set; }
    }
}
