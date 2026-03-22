using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Interfaces
{
    public interface ILoanApplication
    {
        Response GetAllLoanApplications(LoanApplicationRequestAPI requestAPI);
        Response GetLoanApplicationById(LoanApplicationRequestAPI requestAPI);
        Response AddLoanApplication(LoanApplicationRequestAPI requestAPI);
        Response UpdateLoanApplication(LoanApplicationRequestAPI requestAPI);
        Response DeleteLoanApplication(LoanApplicationRequestAPI requestAPI);
        Response ChangeLoanApplicationStatus(LoanApplicationRequestAPI requestAPI);
        Response GetApplicationsByBorrower(LoanApplicationRequestAPI requestAPI);
    }
}
