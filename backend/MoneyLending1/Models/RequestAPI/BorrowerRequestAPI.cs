using System;

namespace LoanManagement.Models.RequestAPI
{
    public class BorrowerRequestAPI : RequestAPI
    {
        public int? borrowerId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string nic { get; set; }
        public string address { get; set; }
        public string dob { get; set; }
        public string occupation { get; set; }
    }
}
