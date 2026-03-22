using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Controllers
{
    public class LoanProductController : Controller
    {
        private readonly ILoanProduct _loanProduct;

        public LoanProductController(ILoanProduct loanProduct)
        {
            _loanProduct = loanProduct;
        }

        [HttpGet]
        public ActionResult GetAllLoanProducts(LoanProductRequestAPI requestAPI)
        {
            var response = _loanProduct.GetAllLoanProducts(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetLoanProductById(LoanProductRequestAPI requestAPI)
        {
            var response = _loanProduct.GetLoanProductById(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        public ActionResult AddLoanProduct(LoanProductRequestAPI requestAPI)
        {
            var response = _loanProduct.AddLoanProduct(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public ActionResult UpdateLoanProduct(LoanProductRequestAPI requestAPI)
        {
            var response = _loanProduct.UpdateLoanProduct(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public ActionResult ChangeLoanProductStatus(LoanProductRequestAPI requestAPI)
        {
            var response = _loanProduct.ChangeLoanProductStatus(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetActiveLoanProducts(LoanProductRequestAPI requestAPI)
        {
            var response = _loanProduct.GetActiveLoanProducts(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
