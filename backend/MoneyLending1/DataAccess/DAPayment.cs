using System;
using System.Collections.Generic;
using System.Data;
using LoanManagement.DatabaseConnectivity;
using LoanManagement.Interfaces;
using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.DataAccess
{
    public class DAPayment : IPayment
    {
        private readonly string ProcedureName = "LoanManagement_Payments";

        public Response MakePayment(PaymentRequestAPI requestAPI)
        {
            requestAPI.ActionType = 1;
            return ExecuteNonQuery(requestAPI, "Payment made successfully");
        }

        public Response GetPaymentsByLoan(PaymentRequestAPI requestAPI)
        {
            requestAPI.ActionType = 2;
            return ExecuteList(requestAPI);
        }

        public Response GetPaymentsByBorrower(PaymentRequestAPI requestAPI)
        {
            requestAPI.ActionType = 3;
            return ExecuteList(requestAPI);
        }

        public Response GetAllPayments(PaymentRequestAPI requestAPI)
        {
            requestAPI.ActionType = 4;
            return ExecuteList(requestAPI);
        }

        public Response GetPaymentById(PaymentRequestAPI requestAPI)
        {
            requestAPI.ActionType = 5;
            return ExecuteSingle(requestAPI);
        }

        private Response ExecuteList(PaymentRequestAPI requestAPI)
        {
            Response result = new Response();
            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    List<Payment> list = new List<Payment>();
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

        private Response ExecuteSingle(PaymentRequestAPI requestAPI)
        {
            Response result = new Response();
            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);
                if (res.ResultStatusCode == 1 && res.ResultDataTable.Rows.Count > 0)
                {
                    result.StatusCode = 200;
                    result.ResultSet = new List<Payment> { Map(res.ResultDataTable.Rows[0]) };
                }
                else
                {
                    result.StatusCode = 500;
                    result.Result = res.Result;
                }
            }
            return result;
        }

        private Response ExecuteNonQuery(PaymentRequestAPI requestAPI, string successMsg)
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

        private Payment Map(DataRow row)
        {
            return new Payment
            {
                paymentId = row.Table.Columns.Contains("PaymentId") ? Convert.ToInt32(row["PaymentId"]) : 0,
                loanId = row.Table.Columns.Contains("LoanId") ? Convert.ToInt32(row["LoanId"]) : 0,
                loanName = row.Table.Columns.Contains("LoanName") ? row["LoanName"].ToString() : null,
                borrowerName = row.Table.Columns.Contains("BorrowerName") ? row["BorrowerName"].ToString() : null,
                paidAmount = row.Table.Columns.Contains("PaidAmount") ? Convert.ToDecimal(row["PaidAmount"]) : 0,
                totalPaid = row.Table.Columns.Contains("TotalPaid") ? Convert.ToDecimal(row["TotalPaid"]) : 0,
                balanceAmount = row.Table.Columns.Contains("BalanceAmount") ? Convert.ToDecimal(row["BalanceAmount"]) : 0,
                totalOverdue = row.Table.Columns.Contains("TotalOverdue") ? Convert.ToDecimal(row["TotalOverdue"]) : 0,
                paidOverdue = row.Table.Columns.Contains("PaidOverdue") ? Convert.ToDecimal(row["PaidOverdue"]) : 0,
                createdDate = row.Table.Columns.Contains("CreatedDate") && row["CreatedDate"] != DBNull.Value
                                ? Convert.ToDateTime(row["CreatedDate"])
                                : (DateTime?)null,
                updatedDate = row.Table.Columns.Contains("UpdatedDate") && row["UpdatedDate"] != DBNull.Value
                                ? Convert.ToDateTime(row["UpdatedDate"])
                                : (DateTime?)null
            };
        }
    }
}
