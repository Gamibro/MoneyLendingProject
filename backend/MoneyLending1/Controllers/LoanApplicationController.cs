using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Controllers
{
    public class LoanApplicationController : Controller
    {
        private readonly ILoanApplication _loanApplication;

        public LoanApplicationController(ILoanApplication loanApplication)
        {
            _loanApplication = loanApplication;
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult GetAllLoanApplications(LoanApplicationRequestAPI requestAPI)
        {
            var response = _loanApplication.GetAllLoanApplications(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        
        [HttpGet]
        public ActionResult GetLoanApplicationById(LoanApplicationRequestAPI requestAPI)
        {
            var response = _loanApplication.GetLoanApplicationById(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        
        [HttpPost]
        public ActionResult AddLoanApplication(LoanApplicationRequestAPI requestAPI)
        {
            var response = _loanApplication.AddLoanApplication(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles ="Admin")]
        [HttpPut]
        public ActionResult UpdateLoanApplication(LoanApplicationRequestAPI requestAPI)
        {
            var response = _loanApplication.UpdateLoanApplication(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles ="Admin")]
        [HttpPost]
        public ActionResult DeleteLoanApplication(LoanApplicationRequestAPI requestAPI)
        {
            var response = _loanApplication.DeleteLoanApplication(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles ="Admin")]
        [HttpPut]
        public ActionResult ChangeLoanApplicationStatus(LoanApplicationRequestAPI requestAPI)
        {
            var response = _loanApplication.ChangeLoanApplicationStatus(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

     
        [HttpGet]
        public ActionResult GetApplicationsByBorrower(LoanApplicationRequestAPI requestAPI)
        {
            var response = _loanApplication.GetApplicationsByBorrower(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
