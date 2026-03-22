namespace LoanManagement.Models
{
    public class User
    {
        public int userId { get; set; }
        public string userName { get; set; }
        public string phone { get; set; }
        public int roleId { get; set; }

       
        public string roleName { get; set; }
        public string email { get; set; }
        public string status { get; set; }

        // Borrower info
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string nic { get; set; }
        public string address { get; set; }
        public string dob { get; set; }
        public string occupation { get; set; }
    }
}
