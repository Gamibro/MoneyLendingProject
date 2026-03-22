using System.Data;

namespace LoanManagement.DatabaseConnectivity
{
    public class ProcedureDBModel
    {
        public int ResultStatusCode { get; set; }  // 1 = success, 0 = failure
        public string Result { get; set; }          // message returned from procedure
        public string ExceptionMessage { get; set; }
        public DataTable ResultDataTable { get; set; }
    }
}
