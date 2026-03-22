using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Interfaces
{
    public interface IPaymentAllocation
    {
        Response GetScheduleSummaryByPaymentId(PaymentAllocationRequestAPI requestAPI);
        Response GetAllocationHistory(PaymentAllocationRequestAPI requestAPI);

        Response GetScheduleSummaryByLoanId(PaymentAllocationRequestAPI requestAPI);
    }
}
