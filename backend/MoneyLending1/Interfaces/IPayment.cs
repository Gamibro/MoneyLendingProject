using LoanManagement.Models;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Interfaces
{
    public interface IPayment
    {
        Response MakePayment(PaymentRequestAPI requestAPI);
        Response GetPaymentsByLoan(PaymentRequestAPI requestAPI);
        Response GetPaymentsByBorrower(PaymentRequestAPI requestAPI);
        Response GetAllPayments(PaymentRequestAPI requestAPI);
        Response GetPaymentById(PaymentRequestAPI requestAPI);
    }
}
