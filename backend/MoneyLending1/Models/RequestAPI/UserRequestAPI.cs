using System;

namespace LoanManagement.Models.RequestAPI
{
    public class UserRequestAPI : RequestAPI
    {
        public int? userId { get; set; }
        public string userName { get; set; }
        public string phone { get; set; }
        public int? roleId { get; set; }
        public string email { get; set; }
        public string otpCode { get; set; }
        public string status { get; set; }

        public string message { get; set; } 

        // Borrower fields
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string nic { get; set; }
        public string address { get; set; }
        public string dob { get; set; }
        public string occupation { get; set; }
    }
}
