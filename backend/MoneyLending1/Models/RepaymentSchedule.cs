using System;

namespace LoanManagement.Models
{
    public class RepaymentSchedule
    {
        public int scheduleId { get; set; }
        public int loanId { get; set; }
        public int installmentNo { get; set; }
        public string dueDate { get; set; }
        public decimal totalDue { get; set; }
        public decimal feesDue { get; set; }
        public string status { get; set; }
    }
}
