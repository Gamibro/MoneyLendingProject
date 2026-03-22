namespace LoanManagement.Models
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string Result { get; set; }
       
        public object ResultSet { get; set; }  // Can hold DataTable, list, etc.
    }
}
