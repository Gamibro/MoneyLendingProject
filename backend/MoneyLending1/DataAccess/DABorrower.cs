using System;
using System.Collections.Generic;
using System.Data;
using LoanManagement.DatabaseConnectivity;
using LoanManagement.Interfaces;
using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.DataAccess
{
    public class DABorrower : IBorrower
    {
        private readonly string ProcedureName = "LoanManagement_Borrowers";

        // ActionType = 1
        public Response GetAllBorrowers(BorrowerRequestAPI requestAPI)
        {
            requestAPI.ActionType = 1;
            return ExecuteList(requestAPI);
        }

        // ActionType = 2
        public Response GetBorrowerById(BorrowerRequestAPI requestAPI)
        {
            requestAPI.ActionType = 2;
            return ExecuteSingle(requestAPI);
        }

        // ActionType = 3
        public Response UpdateBorrower(BorrowerRequestAPI requestAPI)
        {
            requestAPI.ActionType = 3;
            return ExecuteNonQuery(requestAPI, "Borrower updated successfully");
        }

        // ================= HELPERS =================

        private Response ExecuteList(BorrowerRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                ProcedureDBModel res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1) // ✅ compare int
                {
                    List<Borrower> list = new List<Borrower>();

                    foreach (DataRow row in res.ResultDataTable.Rows)
                        list.Add(MapBorrower(row));

                    result.StatusCode = 200;
                    result.ResultSet = list;
                }
                else
                {
                    result.StatusCode = 500;
                    result.Result = res.Result ?? res.ExceptionMessage;
                }
            }

            return result;
        }

        private Response ExecuteSingle(BorrowerRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                ProcedureDBModel res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1 && res.ResultDataTable.Rows.Count > 0)
                {
                    result.StatusCode = 200;
                    result.ResultSet = new List<Borrower>
                    {
                        MapBorrower(res.ResultDataTable.Rows[0])
                    };
                }
                else
                {
                    result.StatusCode = 500;
                    result.Result = res.Result ?? res.ExceptionMessage;
                }
            }

            return result;
        }

        private Response ExecuteNonQuery(BorrowerRequestAPI requestAPI, string successMsg)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                ProcedureDBModel res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    result.StatusCode = 200;
                    result.Result = successMsg;
                }
                else
                {
                    result.StatusCode = 500;
                    result.Result = res.Result ?? res.ExceptionMessage;
                }
            }

            return result;
        }

        // ================= MAPPER =================

        private Borrower MapBorrower(DataRow row)
        {
            return new Borrower
            {
                borrowerId = row.Table.Columns.Contains("borrowerId") && row["borrowerId"] != DBNull.Value
                             ? Convert.ToInt32(row["borrowerId"])
                             : 0,
                firstName = row.Table.Columns.Contains("firstName") ? row["firstName"].ToString() : null,
                lastName = row.Table.Columns.Contains("lastName") ? row["lastName"].ToString() : null,
                nic = row.Table.Columns.Contains("nic") ? row["nic"].ToString() : null,
                address = row.Table.Columns.Contains("address") ? row["address"].ToString() : null,
                dob = row.Table.Columns.Contains("dob") && row["dob"] != DBNull.Value
                      ? Convert.ToDateTime(row["dob"]).ToString("yyyy-MM-dd"):null,
                occupation = row.Table.Columns.Contains("occupation") ? row["occupation"].ToString() : null,

                // Joined user table
                userName = row.Table.Columns.Contains("userName") ? row["userName"].ToString() : null,
                phone = row.Table.Columns.Contains("phone") ? row["phone"].ToString() : null,
                email = row.Table.Columns.Contains("email") ? row["email"].ToString() : null,
                status = row.Table.Columns.Contains("status") ? row["status"].ToString() : null,
                roleId = row.Table.Columns.Contains("roleId") && row["roleId"] != DBNull.Value
                         ? Convert.ToInt32(row["roleId"])
                         : (int?)null,
                roleName = row.Table.Columns.Contains("roleName") ? row["roleName"].ToString():null
            };
        }
    }
}
