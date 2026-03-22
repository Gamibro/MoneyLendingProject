using System.Data;

namespace LoanManagement.API.Models
{
    public class ProcedureDBModel
    {
        // Changed to int to match DBConnect
        public int ResultStatusCode { get; set; }
        public string Result { get; set; }
        public string ExceptionMessage { get; set; }
        public DataTable ResultDataTable { get; set; }
    }
}
