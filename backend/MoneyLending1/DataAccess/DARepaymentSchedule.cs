using System;
using System.Collections.Generic;
using System.Data;
using LoanManagement.DatabaseConnectivity;
using LoanManagement.Interfaces;
using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.DataAccess
{
    public class DARepaymentSchedule : IRepaymentSchedule
    {
        private readonly string ProcedureName = "LoanManagement_RepaymentSchedule";

        public Response GenerateScheduleByLoanId(RepaymentScheduleRequestAPI requestAPI)
        {
            requestAPI.ActionType = 1;
            return ExecuteList(requestAPI);
        }

        public Response GetByStatus(RepaymentScheduleRequestAPI requestAPI)
        {
            requestAPI.ActionType = 2;
            return ExecuteList(requestAPI);
        }

        public Response GetByScheduleId(RepaymentScheduleRequestAPI requestAPI)
        {
            requestAPI.ActionType = 3;
            return ExecuteList(requestAPI);
        }

        private Response ExecuteList(RepaymentScheduleRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    List<RepaymentSchedule> list = new List<RepaymentSchedule>();

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

        private RepaymentSchedule Map(DataRow row)
        {
            return new RepaymentSchedule
            {
                scheduleId = row.Table.Columns.Contains("scheduleId")
                    ? Convert.ToInt32(row["scheduleId"])
                    : 0,

                loanId = row.Table.Columns.Contains("loanId")
                    ? Convert.ToInt32(row["loanId"])
                    : 0,

                installmentNo = row.Table.Columns.Contains("installmentNo")
                    ? Convert.ToInt32(row["installmentNo"])
                    : 0,

                dueDate = row.Table.Columns.Contains("dueDate") && row["dueDate"] != DBNull.Value
                    ? Convert.ToDateTime(row["dueDate"]).ToString("yyyy-MM-dd") : null,

                totalDue = row.Table.Columns.Contains("totalDue")
                    ? Convert.ToDecimal(row["totalDue"])
                    : 0,

                feesDue = row.Table.Columns.Contains("feesDue")
                    ? Convert.ToDecimal(row["feesDue"])
                    : 0,

                status = row.Table.Columns.Contains("status")
                    ? row["status"].ToString()
                    : null
            };
        }
    }
}
