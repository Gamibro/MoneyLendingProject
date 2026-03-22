using System;
using System.Collections.Generic;
using System.Data;
using LoanManagement.DatabaseConnectivity;
using LoanManagement.Interfaces;
using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.DataAccess
{
    public class DALoan : ILoan
    {
        private readonly string ProcedureName = "LoanManagement_Loans";

        public Response GetAllLoans(LoanRequestAPI requestAPI)
        {
            requestAPI.ActionType = 1;
            return ExecuteList(requestAPI);
        }

        public Response GetLoansByBorrower(LoanRequestAPI requestAPI)
        {
            requestAPI.ActionType = 2;
            return ExecuteList(requestAPI);
        }

        public Response AddLoan(LoanRequestAPI requestAPI)
        {
            requestAPI.ActionType = 3;
            return ExecuteNonQueryWithResult(requestAPI, "Loan created successfully", "loanId");
        }

        public Response GetLoansByStatus(LoanRequestAPI requestAPI)
        {
            requestAPI.ActionType = 4;
            return ExecuteList(requestAPI);
        }

        public Response GetLoanById(LoanRequestAPI requestAPI)
        {
            requestAPI.ActionType = 5;
            return ExecuteSingle(requestAPI);
        }

        public Response UpdateLoanStatus(LoanRequestAPI requestAPI)
        {
            requestAPI.ActionType = 6;
            return ExecuteNonQuery(requestAPI, "Loan status updated successfully");
        }

        // ================= HELPERS =================

        private Response ExecuteList(LoanRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    List<Loan> list = new List<Loan>();

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

        private Response ExecuteSingle(LoanRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1 && res.ResultDataTable.Rows.Count > 0)
                {
                    result.StatusCode = 200;
                    result.ResultSet = new List<Loan> { Map(res.ResultDataTable.Rows[0]) };
                }
                else
                {
                    result.StatusCode = 500;
                    result.Result = res.Result;
                }
            }

            return result;
        }

        private Response ExecuteNonQuery(LoanRequestAPI requestAPI, string successMsg)
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

        private Response ExecuteNonQueryWithResult(LoanRequestAPI requestAPI, string successMsg, string resultColumn)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    result.StatusCode = 200;

                    if (res.ResultDataTable.Rows.Count > 0 && res.ResultDataTable.Columns.Contains(resultColumn))
                        result.Result = res.ResultDataTable.Rows[0][resultColumn].ToString();
                    else
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

        private Loan Map(DataRow row)
        {
            return new Loan
            {
                loanId = row.Table.Columns.Contains("loanId") ? Convert.ToInt32(row["loanId"]) : 0,
                borrowerId = row.Table.Columns.Contains("borrowerId") ? Convert.ToInt32(row["borrowerId"]) : 0,
                borrowerName = row.Table.Columns.Contains("borrowerName") ? row["borrowerName"].ToString() : null,
                phone = row.Table.Columns.Contains("phone") ? row["phone"].ToString() : null,
                loanProductId = row.Table.Columns.Contains("loanProductId") ? Convert.ToInt32(row["loanProductId"]) : 0,
                loanProductName = row.Table.Columns.Contains("loanProductName") ? row["loanProductName"].ToString() : null,
                principalAmount = row.Table.Columns.Contains("principalAmount") ? Convert.ToDecimal(row["principalAmount"]) : 0,
                interestRate = row.Table.Columns.Contains("interestRate") ? Convert.ToDecimal(row["interestRate"]) : 0,
                termMonths = row.Table.Columns.Contains("termMonths") ? Convert.ToInt32(row["termMonths"]) : 0,
               startDate = row.Table.Columns.Contains("startDate") && row["startDate"] != DBNull.Value
                    ? Convert.ToDateTime(row["startDate"]).ToString("yyyy-MM-dd"): null,

                //startDate = row.Table.Columns.Contains("startDate") && row["startDate"] != DBNull.Value
                //            ? Convert.ToDateTime(row["startDate"])
                //            : (DateTime?)null,
                totalPayable = row.Table.Columns.Contains("totalPayable") ? Convert.ToDecimal(row["totalPayable"]) : 0,
                status = row.Table.Columns.Contains("status") ? row["status"].ToString() : null
            };
        }
    }
}
