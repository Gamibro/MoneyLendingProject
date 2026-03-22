using System;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using LoanManagement.API.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.DatabaseConnectivity
{
    public class DBConnect : IDisposable
    {
        private readonly string _connectionString;

        public DBConnect()
        {
            //_connectionString = @"Data Source=DESKTOP-CF3597U\SQLEXPRESS;
            //                      Initial Catalog=LoanManagementDB;
            //                      Integrated Security=True;
            //                      MultipleActiveResultSets=true;
            //                      Max Pool Size=600;";



            _connectionString = "Data Source=ALL-SER-LAP01\\DTSSQLSERVER; Initial Catalog=MoneyLendingDB; User id=sa; Password=DSadmin@123; MultipleActiveResultSets=true;";
        }

        public SqlConnection GetOpenConnection()
        {
            var connection = new SqlConnection(_connectionString);
            connection.Open();
            return connection;
        }

        public ProcedureDBModel ProcedureRead(RequestAPI requestAPI, string procedureName)
        {
            var result = new ProcedureDBModel();

            using (var connection = GetOpenConnection())
            using (var cmd = new SqlCommand(procedureName, connection))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                // OUTPUT parameters
                cmd.Parameters.Add("@ResultStatusCode", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("@Result", SqlDbType.VarChar, -1).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("@ExceptionMessage", SqlDbType.VarChar, -1).Direction = ParameterDirection.Output;

                // INPUT parameters (only non-null)
                foreach (PropertyInfo prop in requestAPI.GetType().GetProperties())
                {
                    var value = prop.GetValue(requestAPI);
                    if (value != null)
                    {
                        cmd.Parameters.AddWithValue("@" + prop.Name, value);
                    }
                }

                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        var dt = new DataTable();
                        dt.Load(reader);
                        result.ResultDataTable = dt;
                    }

                    result.ResultStatusCode =
                        cmd.Parameters["@ResultStatusCode"].Value == DBNull.Value
                        ? -1
                        : Convert.ToInt32(cmd.Parameters["@ResultStatusCode"].Value);

                    result.Result = cmd.Parameters["@Result"].Value?.ToString();
                    result.ExceptionMessage = cmd.Parameters["@ExceptionMessage"].Value?.ToString();
                }
                catch (Exception ex)
                {
                    result.ResultStatusCode = -1;
                    result.Result = "Error occurred";
                    result.ExceptionMessage = ex.Message;
                }
            }

            return result;
        }

        public void Dispose()
        {
        }
    }
}
