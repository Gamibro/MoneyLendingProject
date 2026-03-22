using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Controllers
{
    public class BorrowerController : Controller
    {
        private readonly IBorrower _borrower;

        public BorrowerController(IBorrower borrower)
        {
            _borrower = borrower;
        }

        [HttpGet]
        public ActionResult GetAllBorrowers(BorrowerRequestAPI requestAPI)
        {
            var response = _borrower.GetAllBorrowers(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetBorrowerById(BorrowerRequestAPI requestAPI)
        {
            var response = _borrower.GetBorrowerById(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [HttpPut]
        public ActionResult UpdateBorrower(BorrowerRequestAPI requestAPI)
        {
            var response = _borrower.UpdateBorrower(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
