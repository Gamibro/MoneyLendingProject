using System;
using System.Collections.Generic;
using System.Data;
using LoanManagement.DatabaseConnectivity;
using LoanManagement.Interfaces;
using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.DataAccess
{
    public class DARole : IRole
    {
        private readonly string ProcedureName = "LoanManagement_Role";

        public Response GetRoles(RoleRequestAPI requestAPI)
        {
            requestAPI.ActionType = 1;
            return ExecuteList(requestAPI);
        }

        public Response AddRole(RoleRequestAPI requestAPI)
        {
            requestAPI.ActionType = 2;
            return ExecuteList(requestAPI);
        }

        private Response ExecuteList(RoleRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    List<Role> list = new List<Role>();

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

        private Role Map(DataRow row)
        {
            return new Role
            {
                roleId = row.Table.Columns.Contains("roleId")
                    ? Convert.ToInt32(row["roleId"])
                    : 0,

                roleName = row.Table.Columns.Contains("roleName")
                    ? row["roleName"].ToString()
                    : null
            };
        }
    }
}
