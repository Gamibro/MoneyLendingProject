using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Controllers
{
    public class PaymentAllocationController : Controller
    {
        private readonly IPaymentAllocation _paymentAllocation;

        public PaymentAllocationController(IPaymentAllocation paymentAllocation)
        {
            _paymentAllocation = paymentAllocation;
        }

        [HttpGet]
        public ActionResult GetScheduleSummaryByPaymentId(PaymentAllocationRequestAPI requestAPI)
        {
            var response = _paymentAllocation.GetScheduleSummaryByPaymentId(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllocationHistory(PaymentAllocationRequestAPI requestAPI)
        {
            var response = _paymentAllocation.GetAllocationHistory(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetScheduleSummaryByLoanId(PaymentAllocationRequestAPI requestAPI)
        {
            var response = _paymentAllocation.GetScheduleSummaryByLoanId(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
