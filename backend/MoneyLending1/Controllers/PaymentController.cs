using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Controllers
{
    public class PaymentController : Controller
    {
        private readonly IPayment _payment;

        public PaymentController(IPayment payment)
        {
            _payment = payment;
        }

        [HttpPost]
        public ActionResult MakePayment(PaymentRequestAPI requestAPI)
        {
            var response = _payment.MakePayment(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPaymentsByLoan(PaymentRequestAPI requestAPI)
        {
            var response = _payment.GetPaymentsByLoan(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPaymentsByBorrower(PaymentRequestAPI requestAPI)
        {
            var response = _payment.GetPaymentsByBorrower(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllPayments(PaymentRequestAPI requestAPI)
        {
            var response = _payment.GetAllPayments(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPaymentById(PaymentRequestAPI requestAPI)
        {
            var response = _payment.GetPaymentById(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
