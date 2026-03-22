using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Interfaces
{
    public interface IBorrower
    {
        Response GetAllBorrowers(BorrowerRequestAPI requestAPI);
        Response GetBorrowerById(BorrowerRequestAPI requestAPI);
        Response UpdateBorrower(BorrowerRequestAPI requestAPI);
    }
}
