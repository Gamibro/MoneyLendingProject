using System;

namespace LoanManagement.Models.RequestAPI
{
    public class PaymentRequestAPI : RequestAPI
    {
        public int? loanId { get; set; }
        public int? scheduleId { get; set; }
        public decimal? paidAmount { get; set; }
        public string paymentMethod { get; set; }
        public string referenceNo { get; set; }
        public int? borrowerId { get; set; }
        public string remarks { get; set; }
        public int? paymentId { get; set; }
    }
}
