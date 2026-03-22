using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoneyLending1.Models
{
    public class PaymentAllocation
    {
        public int AllocationId { get; set; }
        public int PaymentId { get; set; }
        public int ScheduleId { get; set; }

        //public int loanId { get; set; }

        public int InstallmentNo { get; set; }
        public string DueDate { get; set; }
        public decimal TotalDue { get; set; }
        public decimal FeesDue { get; set; }
        public string ScheduleStatus { get; set; }

        public decimal PaidAmount { get; set; }
        public decimal ToOverdue { get; set; }
        public decimal PaidThisAllocation { get; set; }

        public string PaymentMethod { get; set; }
        public string ReferenceNo { get; set; }
        public string Remarks { get; set; }
        public string AllocatedAt { get; set; }
    }
}