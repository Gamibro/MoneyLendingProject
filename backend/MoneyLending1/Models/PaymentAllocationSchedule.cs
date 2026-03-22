using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoneyLending1.Models
{
    public class PaymentAllocationSchedule
    {
        public int ScheduleId { get; set; }
        public int LoanId { get; set; }
        public int InstallmentNo { get; set; }
        public string DueDate { get; set; }
        public decimal TotalDue { get; set; }
        public decimal FeesDue { get; set; }
        public string ScheduleStatus { get; set; }

        public decimal PaidSoFar { get; set; }
        public decimal OverduePaidSoFar { get; set; }
        public decimal PaidTotalSoFar { get; set; }
        public decimal NeedTotal { get; set; }

        public decimal RemainingInstallment { get; set; }
        public decimal RemainingOverdue { get; set; }
        public decimal RemainingTotal { get; set; }
    }
}