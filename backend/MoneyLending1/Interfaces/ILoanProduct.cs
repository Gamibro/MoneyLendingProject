using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Interfaces
{
    public interface ILoanProduct
    {
        Response GetAllLoanProducts(LoanProductRequestAPI requestAPI);
        Response GetLoanProductById(LoanProductRequestAPI requestAPI);
        Response AddLoanProduct(LoanProductRequestAPI requestAPI);
        Response UpdateLoanProduct(LoanProductRequestAPI requestAPI);
        Response ChangeLoanProductStatus(LoanProductRequestAPI requestAPI);
        Response GetActiveLoanProducts(LoanProductRequestAPI requestAPI);
    }
}
