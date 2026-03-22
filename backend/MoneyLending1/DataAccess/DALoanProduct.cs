using System;
using System.Collections.Generic;
using System.Data;
using LoanManagement.DatabaseConnectivity;
using LoanManagement.Interfaces;
using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.DataAccess
{
    public class DALoanProduct : ILoanProduct
    {
        private readonly string ProcedureName = "LoanManagement_LoanProducts";

        // ActionType 1
        public Response GetAllLoanProducts(LoanProductRequestAPI requestAPI)
        {
            requestAPI.ActionType = 1;
            return ExecuteList(requestAPI);
        }

        // ActionType 2
        public Response GetLoanProductById(LoanProductRequestAPI requestAPI)
        {
            requestAPI.ActionType = 2;
            return ExecuteSingle(requestAPI);
        }

        // ActionType 3
        public Response AddLoanProduct(LoanProductRequestAPI requestAPI)
        {
            requestAPI.ActionType = 3;
            return ExecuteNonQuery(requestAPI, "Loan product added successfully");
        }

        // ActionType 4
        public Response UpdateLoanProduct(LoanProductRequestAPI requestAPI)
        {
            requestAPI.ActionType = 4;
            return ExecuteNonQuery(requestAPI, "Loan product updated successfully");
        }

        // ActionType 5
        public Response ChangeLoanProductStatus(LoanProductRequestAPI requestAPI)
        {
            requestAPI.ActionType = 5;
            return ExecuteNonQuery(requestAPI, "Loan product status updated successfully");
        }

        // ActionType 6
        public Response GetActiveLoanProducts(LoanProductRequestAPI requestAPI)
        {
            requestAPI.ActionType = 6;
            return ExecuteList(requestAPI);
        }

        // ================= HELPERS =================

        private Response ExecuteList(LoanProductRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    List<LoanProduct> list = new List<LoanProduct>();

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

        private Response ExecuteSingle(LoanProductRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1 && res.ResultDataTable.Rows.Count > 0)
                {
                    result.StatusCode = 200;
                    result.ResultSet = new List<LoanProduct>
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

        private Response ExecuteNonQuery(LoanProductRequestAPI requestAPI, string successMsg)
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

        private LoanProduct Map(DataRow row)
        {
            return new LoanProduct
            {
                loanProductId = row.Table.Columns.Contains("LoanProductId")
                    ? Convert.ToInt32(row["LoanProductId"])
                    : 0,

                loanProductName = row.Table.Columns.Contains("LoanProductName")
                    ? row["LoanProductName"].ToString()
                    : null,

                interestRate = row.Table.Columns.Contains("InterestRate")
                    ? Convert.ToDecimal(row["InterestRate"])
                    : 0,

                defaultTermMonths = row.Table.Columns.Contains("DefaultTermMonths")
                    ? Convert.ToInt32(row["DefaultTermMonths"])
                    : 0,

                lateFeeFixedAmount = row.Table.Columns.Contains("LateFeeFixedAmount")
                    ? Convert.ToDecimal(row["LateFeeFixedAmount"])
                    : 0,

                isActive = row.Table.Columns.Contains("IsActive")
                    ? Convert.ToBoolean(row["IsActive"])
                    : false
            };
        }
    }
}
