using System;
using System.Collections.Generic;
using System.Data;
using LoanManagement.DatabaseConnectivity;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;
using LoanManagement.Models;
using MoneyLending1.Models;

namespace LoanManagement.DataAccess
{
    public class DAPaymentAllocation : IPaymentAllocation
    {
        private readonly string ProcedureName = "LoanManagement_PaymentAllocations";

        public Response GetScheduleSummaryByPaymentId(PaymentAllocationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 1;
            return ExecuteScheduleSummaryList(requestAPI);
        }

        public Response GetScheduleSummaryByLoanId(PaymentAllocationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 3;
            return ExecuteScheduleSummaryList(requestAPI);
        }

        public Response GetAllocationHistory(PaymentAllocationRequestAPI requestAPI)
        {
            requestAPI.ActionType = 2;
            return ExecuteAllocationHistoryList(requestAPI);
        }

        //private Response ExecuteList(PaymentAllocationRequestAPI requestAPI)
        //{
        //    Response result = new Response();
        //    using (var db = new DBConnect())
        //    {
        //        var res = db.ProcedureRead(requestAPI, ProcedureName);

        //        if (res.ResultStatusCode == 1)
        //        {
        //            List<object> list = new List<object>();

        //            foreach (DataRow row in res.ResultDataTable.Rows)
        //                list.Add(Map(row));

        //            result.StatusCode = 200;
        //            result.ResultSet = list;
        //        }
        //        else
        //        {
        //            result.StatusCode = 500;
        //            result.Result = res.Result;
        //        }
        //    }
        //    return result;
        //}

        private Response ExecuteScheduleSummaryList(PaymentAllocationRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    List<PaymentAllocationSchedule> list = new List<PaymentAllocationSchedule>();

                    foreach (DataRow row in res.ResultDataTable.Rows)
                        list.Add(MapScheduleSummary(row));

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

        private Response ExecuteAllocationHistoryList(PaymentAllocationRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    List<PaymentAllocation> list = new List<PaymentAllocation>();

                    foreach (DataRow row in res.ResultDataTable.Rows)
                        list.Add(MapAllocationHistory(row));

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


        


        //private object Map(DataRow row)
        //{
        //    var obj = new Dictionary<string, object>();
        //    foreach (DataColumn col in row.Table.Columns)
        //    {
        //        obj[col.ColumnName] = row[col] != DBNull.Value ? row[col] : null;
        //    }
        //    return obj;
        //}


        private PaymentAllocationSchedule MapScheduleSummary(DataRow row)
        {
            return new PaymentAllocationSchedule
            {
                ScheduleId = row.Table.Columns.Contains("ScheduleId")
                    ? Convert.ToInt32(row["ScheduleId"])
                    : 0,

                LoanId = row.Table.Columns.Contains("LoanId")
                    ? Convert.ToInt32(row["LoanId"])
                    : 0,

                InstallmentNo = row.Table.Columns.Contains("InstallmentNo")
                    ? Convert.ToInt32(row["InstallmentNo"])
                    : 0,

                DueDate = Convert.ToDateTime(row["DueDate"]).ToString("yyyy-MM-dd")
,

                TotalDue = row.Table.Columns.Contains("TotalDue") && row["TotalDue"] != DBNull.Value
                    ? Convert.ToDecimal(row["TotalDue"])
                    : 0,

                FeesDue = row.Table.Columns.Contains("FeesDue") && row["FeesDue"] != DBNull.Value
                    ? Convert.ToDecimal(row["FeesDue"])
                    : 0,

                ScheduleStatus = row.Table.Columns.Contains("ScheduleStatus")
                    ? row["ScheduleStatus"].ToString()
                    : null,

                PaidSoFar = row.Table.Columns.Contains("PaidSoFar") && row["PaidSoFar"] != DBNull.Value
                    ? Convert.ToDecimal(row["PaidSoFar"])
                    : 0,

                OverduePaidSoFar = row.Table.Columns.Contains("OverduePaidSoFar") && row["OverduePaidSoFar"] != DBNull.Value
                    ? Convert.ToDecimal(row["OverduePaidSoFar"])
                    : 0,

                PaidTotalSoFar = row.Table.Columns.Contains("PaidTotalSoFar") && row["PaidTotalSoFar"] != DBNull.Value
                    ? Convert.ToDecimal(row["PaidTotalSoFar"])
                    : 0,

                NeedTotal = row.Table.Columns.Contains("NeedTotal") && row["NeedTotal"] != DBNull.Value
                    ? Convert.ToDecimal(row["NeedTotal"])
                    : 0,

                RemainingInstallment = row.Table.Columns.Contains("RemainingInstallment") && row["RemainingInstallment"] != DBNull.Value
                    ? Convert.ToDecimal(row["RemainingInstallment"])
                    : 0,

                RemainingOverdue = row.Table.Columns.Contains("RemainingOverdue") && row["RemainingOverdue"] != DBNull.Value
                    ? Convert.ToDecimal(row["RemainingOverdue"])
                    : 0,

                RemainingTotal = row.Table.Columns.Contains("RemainingTotal") && row["RemainingTotal"] != DBNull.Value
                    ? Convert.ToDecimal(row["RemainingTotal"])
                    : 0
            };
        }


        private PaymentAllocation MapAllocationHistory(DataRow row)
        {
            return new PaymentAllocation
            {
                AllocationId = row.Table.Columns.Contains("AllocationId")
                    ? Convert.ToInt32(row["AllocationId"])
                    : 0,

                PaymentId = row.Table.Columns.Contains("PaymentId")
                    ? Convert.ToInt32(row["PaymentId"])
                    : 0,

                ScheduleId = row.Table.Columns.Contains("ScheduleId")
                    ? Convert.ToInt32(row["ScheduleId"])
                    : 0,

                InstallmentNo = row.Table.Columns.Contains("InstallmentNo")
                    ? Convert.ToInt32(row["InstallmentNo"])
                    : 0,

                DueDate = Convert.ToDateTime(row["DueDate"]).ToString("yyyy-MM-dd"),


                TotalDue = row.Table.Columns.Contains("TotalDue") && row["TotalDue"] != DBNull.Value
                    ? Convert.ToDecimal(row["TotalDue"])
                    : 0,

                FeesDue = row.Table.Columns.Contains("FeesDue") && row["FeesDue"] != DBNull.Value
                    ? Convert.ToDecimal(row["FeesDue"])
                    : 0,

                ScheduleStatus = row.Table.Columns.Contains("ScheduleStatus")
                    ? row["ScheduleStatus"].ToString()
                    : null,

                PaidAmount = row.Table.Columns.Contains("PaidAmount") && row["PaidAmount"] != DBNull.Value
                    ? Convert.ToDecimal(row["PaidAmount"])
                    : 0,

                ToOverdue = row.Table.Columns.Contains("ToOverdue") && row["ToOverdue"] != DBNull.Value
                    ? Convert.ToDecimal(row["ToOverdue"])
                    : 0,

                PaidThisAllocation = row.Table.Columns.Contains("PaidThisAllocation") && row["PaidThisAllocation"] != DBNull.Value
                    ? Convert.ToDecimal(row["PaidThisAllocation"])
                    : 0,

                PaymentMethod = row.Table.Columns.Contains("PaymentMethod")
                    ? row["PaymentMethod"].ToString()
                    : null,

                ReferenceNo = row.Table.Columns.Contains("ReferenceNo")
                    ? row["ReferenceNo"].ToString()
                    : null,

                Remarks = row.Table.Columns.Contains("Remarks")
                    ? row["Remarks"].ToString()
                    : null,

                AllocatedAt = Convert.ToDateTime(row["AllocatedAt"]).ToString("yyyy-MM-dd")

            };
        }
    }
}
