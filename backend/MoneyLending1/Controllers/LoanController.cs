using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Controllers
{
    public class LoanController : Controller
    {
        private readonly ILoan _loan;

        public LoanController(ILoan loan)
        {
            _loan = loan;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult GetAllLoans(LoanRequestAPI requestAPI)
        {
            var response = _loan.GetAllLoans(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetLoansByBorrower(LoanRequestAPI requestAPI)
        {
            var response = _loan.GetLoansByBorrower(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        public ActionResult AddLoan(LoanRequestAPI requestAPI)
        {
            var response = _loan.AddLoan(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetLoansByStatus(LoanRequestAPI requestAPI)
        {
            var response = _loan.GetLoansByStatus(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetLoanById(LoanRequestAPI requestAPI)
        {
            var response = _loan.GetLoanById(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }



        [HttpPut]
        [Authorize(Roles ="Admin")]
        public ActionResult UpdateLoanStatus(LoanRequestAPI requestAPI)
        {
            var response = _loan.UpdateLoanStatus(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
