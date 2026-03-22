using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Interfaces
{
    public interface IUser
    {
        Response GetAllUsers();
        Response SendOtp(UserRequestAPI requestAPI);
        Response VerifyOtp(UserRequestAPI requestAPI);
        Response RegisterBorrower(UserRequestAPI requestAPI);
        Response GetByPhone(string phone);
        Response GetByStatus(string status);
        Response SendMessage(UserRequestAPI requestAPI);
        Response UpdateUser(UserRequestAPI requestAPI);
    }
}
