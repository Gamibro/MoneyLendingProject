using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using LoanManagement.DatabaseConnectivity;
using LoanManagement.Interfaces;
using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;
using MoneyLending1.Interfaces;
using MoneyLending1.Models;


namespace LoanManagement.DataAccess
{
    public class DAUser : IUser
    {
        private readonly string ProcedureName = "LoanManagement_Users";
        private readonly IJwtTokenService _jwt;
        private readonly DBConnect db = new DBConnect(); 


        public DAUser(IJwtTokenService jwt)
        {
            _jwt = jwt;
        }

        public Response GetAllUsers()
        {
            return Execute(new UserRequestAPI { ActionType = 1 });
        }

        //public Response SendOtp(UserRequestAPI requestAPI)
        //{
        //    requestAPI.ActionType = 2;
        //    return Execute(requestAPI);
        //}

        public Response SendOtp(UserRequestAPI requestAPI)
        {
            Response result = new Response();

            try
            {
                // 1) Check phone exists (you can keep this OR you can just use ActionType=4 and let SQL validate)
                requestAPI.ActionType = 2; // or "1 check phone" if you create it
                using (var dbConnect = new DBConnect())
                {
                    var check = dbConnect.ProcedureRead(requestAPI, ProcedureName);
                    if (check.ResultStatusCode != 1)
                    {
                        result.StatusCode = 404;
                        result.Result = "Phone not found.";
                        return result;
                    }
                }

                // 2) Generate OTP
                string otp = new Random().Next(100000, 999999).ToString();

                // 3) Save OTP in DB (ActionType = 4)
                requestAPI.ActionType = 8;
                requestAPI.otpCode = otp;   // must exist in LoginRequestAPI model (same name mapping DBconnect uses)

                using (var dbConnect = new DBConnect())
                {
                    var save = dbConnect.ProcedureRead(requestAPI, ProcedureName);
                    if (save.ResultStatusCode != 1)
                    {
                        result.StatusCode = 500;
                        result.Result = save.Result ?? "Failed to save OTP.";
                        return result;
                    }
                }

                // 4) Send OTP via SMS
                string message = System.Web.HttpUtility.UrlEncode($"Your OTP is {otp}");
                string url =
                    $"https://esystems.cdl.lk/Backend/SMSGateway/api/SMS/DTSSendMessage?mobileNo={requestAPI.phone}&message={message}";

                using (var client = new System.Net.Http.HttpClient())
                {
                    var response = client.GetAsync(url).Result;
                    if (!response.IsSuccessStatusCode)
                    {
                        result.StatusCode = 500;
                        result.Result = $"Failed to send SMS: {(int)response.StatusCode} {response.ReasonPhrase}";
                        return result;
                    }
                }

                result.StatusCode = 200;
                result.Result = otp; // returning OTP for testing environments only (consider removing in production)
            }
            catch (Exception ex)
            {
                result.StatusCode = 500;
                result.Result = ex.Message;
            }

            return result;
        }


        //public Response VerifyOtp(UserRequestAPI requestAPI)
        //{
        //    requestAPI.ActionType = 3;
        //    return Execute(requestAPI);
        //}

        public Response VerifyOtp(UserRequestAPI requestAPI)
        {
            Response result = new Response();

            try
            {
                requestAPI.ActionType = 3;

                using (var dbConnect = new DBConnect())
                {
                    var res = dbConnect.ProcedureRead(requestAPI, ProcedureName);

                    if (res.ResultStatusCode != 1)
                    {
                        result.StatusCode = 400; 
                        result.Result = res.Result ?? "Invalid OTP or phone";
                        return result;
                    }

                    // Success
                    result.StatusCode = 200;
                    result.Result = res.Result ?? "User logged in successfully";

                    // Map returned user row(s)
                    if (res.ResultDataTable != null && res.ResultDataTable.Rows.Count > 0)
                    {
                        List<LoginProcess> userList = new List<LoginProcess>();

                        foreach (DataRow row in res.ResultDataTable.Rows)
                        {
                            var user = new LoginProcess
                            {
                                userId = row["userId"] != DBNull.Value ? Convert.ToInt32(row["userId"]) : 0,
                                userName = row["userName"]?.ToString(),
                                phone = row["phone"]?.ToString(),
                                email = row["email"]?.ToString(),
                                roleName = row["roleName"]?.ToString(),
                                status = row["status"]?.ToString()

                            };

                            userList.Add(user);
                        }

                        var token = _jwt.GenerateToken(
                            userId: userList[0].userId.ToString(),
                            username: userList[0].userName,
                            phone: userList[0].phone,
                            email: userList[0].email,
                            role: userList[0].roleName


                            );

                        result.ResultSet = new
                        {
                           token= token,
                           user = userList[0]
                        };
                    }
                    //else
                    //{
                    //    // Procedure said success but no rows returned — still handle gracefully
                    //    result.ResultSet = new List<UserRoleModel>();
                    //}

                    return result;
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = 500;
                result.Result = ex.Message;
                return result;
            }
        }

        public Response SendMessage(UserRequestAPI requestAPI)
        {
            Response result = new Response();

            try
            {
                // 1) validate phone exists
                requestAPI.ActionType = 9;

                using (var dbConnect = new DBConnect())
                {
                    var check = dbConnect.ProcedureRead(requestAPI, ProcedureName);

                    if (check.ResultStatusCode != 1)
                    {
                        result.StatusCode = 404;
                        result.Result = check.Result ?? "Phone not found";
                        return result;
                    }
                }

                // 2) send SMS (NO encoding)
                string encodedMsg = System.Web.HttpUtility.UrlEncode(requestAPI.message ?? "");
                string url =
                    $"https://esystems.cdl.lk/Backend/SMSGateway/api/SMS/DTSSendMessage?mobileNo={requestAPI.phone}&message={encodedMsg}";

                using (var client = new System.Net.Http.HttpClient())
                {
                    client.GetAsync(url).Wait();
                }

                result.StatusCode = 200;
                result.Result = "Message request sent";
                return result;
            }
            catch (Exception ex)
            {
                result.StatusCode = 500;
                result.Result = ex.Message; // if message has spaces, you'll often see UriFormatException here
                return result;
            }
        }



        public Response RegisterBorrower(UserRequestAPI requestAPI)
        {
            requestAPI.ActionType = 4;
            return Execute(requestAPI);
        }



        public Response GetByPhone(string phone)
        {
            return Execute(new UserRequestAPI
            {
                ActionType = 5,
                phone = phone
            });
        }

        public Response GetByStatus(string status)
        {
            return Execute(new UserRequestAPI
            {
                ActionType = 6,
                status = status
            });
        }

        public Response UpdateUser(UserRequestAPI requestAPI)
        {
            requestAPI.ActionType = 7;
            return ExecuteNonQuery(requestAPI,"User details updated successfully");
        }

        private Response Execute(UserRequestAPI requestAPI)
        {
            Response result = new Response();

            using (var db = new DBConnect())
            {
                var res = db.ProcedureRead(requestAPI, ProcedureName);

                if (res.ResultStatusCode == 1)
                {
                    List<User> list = new List<User>();

                    if (res.ResultDataTable != null && res.ResultDataTable.Rows.Count > 0)
                    {
                        foreach (DataRow row in res.ResultDataTable.Rows)
                            list.Add(Map(row));
                    }

                    result.StatusCode = 200;
                    result.ResultSet = list;
                }
                else
                {
                    result.StatusCode = 500;
                    result.Result = res.ExceptionMessage ?? res.Result;
                }
            }

            return result;
        }

        private Response ExecuteNonQuery(UserRequestAPI requestAPI, string successMsg)
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


        private User Map(DataRow row)
        {
            return new User
            {
                userId = row.Table.Columns.Contains("userId") ? Convert.ToInt32(row["userId"]) : 0,
                userName = row.Table.Columns.Contains("userName") ? row["userName"].ToString() : null,
                phone = row.Table.Columns.Contains("phone") ? row["phone"].ToString() : null,
                roleId = row.Table.Columns.Contains("roleId") ? Convert.ToInt32(row["roleId"]) : 0,
                roleName = row.Table.Columns.Contains("roleName") ? row["roleName"].ToString() : null,
                email = row.Table.Columns.Contains("email") ? row["email"].ToString() : null,
                status = row.Table.Columns.Contains("status") ? row["status"].ToString() : null,
                firstName = row.Table.Columns.Contains("firstName") ? row["firstName"].ToString() : null,
                lastName = row.Table.Columns.Contains("lastName") ? row["lastName"].ToString() : null,
                nic = row.Table.Columns.Contains("nic") ? row["nic"].ToString() : null,
                address = row.Table.Columns.Contains("address") ? row["address"].ToString() : null,
                dob = row.Table.Columns.Contains("dob") ? Convert.ToDateTime(row["dob"]).ToString("yyyy-MM-dd") : null,
                occupation = row.Table.Columns.Contains("occupation") ? row["occupation"].ToString() : null
            };
        }
    }
}
