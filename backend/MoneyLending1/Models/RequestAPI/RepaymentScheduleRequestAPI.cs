using System;

namespace LoanManagement.Models.RequestAPI
{
    public class RepaymentScheduleRequestAPI : RequestAPI
    {
        public int? scheduleId { get; set; }
        public int? loanId { get; set; }
        public string status { get; set; }
    }
}
