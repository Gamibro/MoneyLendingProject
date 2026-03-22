using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Interfaces
{
    public interface IRole
    {
        Response GetRoles(RoleRequestAPI requestAPI);
        Response AddRole(RoleRequestAPI requestAPI);
    }
}
