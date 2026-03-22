using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Interfaces
{
    public interface IRepaymentSchedule
    {
        Response GenerateScheduleByLoanId(RepaymentScheduleRequestAPI requestAPI);
        Response GetByStatus(RepaymentScheduleRequestAPI requestAPI);
        Response GetByScheduleId(RepaymentScheduleRequestAPI requestAPI);
    }
}
