using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Interfaces
{
    public interface ILoan
    {
        Response GetAllLoans(LoanRequestAPI requestAPI);
        Response GetLoansByBorrower(LoanRequestAPI requestAPI);
        Response AddLoan(LoanRequestAPI requestAPI);
        Response GetLoansByStatus(LoanRequestAPI requestAPI);
        Response GetLoanById(LoanRequestAPI requestAPI);
        Response UpdateLoanStatus(LoanRequestAPI requestAPI);
    }
}
