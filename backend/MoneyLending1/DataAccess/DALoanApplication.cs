using System;
using System.Collections.Generic;
using System.Data;
using LoanManagement.DatabaseConnectivity;
using LoanManagement.Interfaces;
using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.DataAccess
{
    public class DALoanApplication : ILoanApplication
    {
        private readonly string ProcedureName = "LoanManagement_LoanApplications";

        // ActionType 1
        public Response GetAllLoanApplications(LoanApplicationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 1;
            return ExecuteList(requestAPI);
        }

        // ActionType 2
        public Response GetLoanApplicationById(LoanApplicationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 2;
            return ExecuteSingle(requestAPI);
        }

        // ActionType 3
        public Response AddLoanApplication(LoanApplicationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 3;
            return ExecuteNonQuery(requestAPI, "Loan application added successfully");
        }

        // ActionType 4
        public Response UpdateLoanApplication(LoanApplicationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 4;
            return ExecuteNonQuery(requestAPI, "Loan application updated successfully");
        }

        // ActionType 5
        public Response DeleteLoanApplication(LoanApplicationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 5;
            return ExecuteNonQuery(requestAPI, "Loan application deleted successfully");
        }

        // ActionType 6
        public Response ChangeLoanApplicationStatus(LoanApplicationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 6;
            return ExecuteNonQuery(requestAPI, "Loan application status updated successfully");
        }

        // ActionType 7
        public Response GetApplicationsByBorrower(LoanApplicationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 7;
            return ExecuteList(requestAPI);
        }

        // ================= HELPERS =================

        private Response ExecuteList(LoanApplicationRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    List<LoanApplication> list = new List<LoanApplication>();

                    foreach (DataRow row in res.ResultDataTable.Rows)
                        list.Add(Map(row));

                    result.StatusCode = 200;
                    result.ResultSet = list;
                }
                else
                {
                    result.StatusCode = 500;
                    result.Result = res.Result;
                }
            }

            return result;
        }

        private Response ExecuteSingle(LoanApplicationRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1 && res.ResultDataTable.Rows.Count > 0)
                {
                    result.StatusCode = 200;
                    result.ResultSet = new List<LoanApplication>
                    {
                        Map(res.ResultDataTable.Rows[0])
                    };
                }
                else
                {
                    result.StatusCode = 500;
                    result.Result = res.Result;
                }
            }

            return result;
        }

        private Response ExecuteNonQuery(LoanApplicationRequestAPI requestAPI, string successMsg)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    result.StatusCode = 200;
                    result.Result = successMsg;
                }
                else
                {
                    result.StatusCode = 500;
                    result.Result = res.Result;
                }
            }

            return result;
        }

        private LoanApplication Map(DataRow row)
        {
            return new LoanApplication
            {
                applicationId = row.Table.Columns.Contains("applicationId")
                    ? Convert.ToInt32(row["applicationId"])
                    : 0,

                borrowerId = row.Table.Columns.Contains("borrowerId")
                    ? Convert.ToInt32(row["borrowerId"])
                    : 0,

                borrowerName = row.Table.Columns.Contains("BorrowerName")
                    ? row["BorrowerName"].ToString()
                    : null,

                phone = row.Table.Columns.Contains("phone")
                    ?row["phone"].ToString():null,

                loanProductId = row.Table.Columns.Contains("loanProductId")
                    ? Convert.ToInt32(row["loanProductId"])
                    : 0,

                loanProductName = row.Table.Columns.Contains("LoanProductName")
                    ? row["LoanProductName"].ToString()
                    : null,

                requestedAmount = row.Table.Columns.Contains("requestedAmount")
                    ? Convert.ToDecimal(row["requestedAmount"])
                    : 0,

                requestedTermMonths = row.Table.Columns.Contains("requestedTermMonths")
                    ? Convert.ToInt32(row["requestedTermMonths"])
                    : 0,

                interestRate = row.Table.Columns.Contains("interestRate")
                    ? Convert.ToDecimal(row["interestRate"])
                    : 0,

                status = row.Table.Columns.Contains("status")
                    ? row["status"].ToString()
                    : null,

                requestedAt = row.Table.Columns.Contains("requestedAt") && row["requestedAt"] != DBNull.Value
                    ? Convert.ToDateTime(row["requestedAt"]).ToString("yyyy-MM-dd HH:mm:ss.fff")
                    : null
            };
        }
    }
}
