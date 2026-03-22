using System;

namespace LoanManagement.Models.RequestAPI
{
    public class PaymentAllocationRequestAPI : RequestAPI
    {
        public int? paymentId { get; set; }
        public int? scheduleId { get; set; }

        public int? loanId { get; set; }
    }
}
