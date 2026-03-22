using System;

namespace LoanManagement.Models
{
    public class Borrower
    {
        public int borrowerId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string nic { get; set; }
        public string address { get; set; }
        public string dob { get; set; }
        public string occupation { get; set; }

        // User table fields
        public string userName { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string status { get; set; }
        public int? roleId { get; set; }

        public string roleName { get; set; }
    }
}
