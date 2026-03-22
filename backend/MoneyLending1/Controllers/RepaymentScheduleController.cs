using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Controllers
{
    public class RepaymentScheduleController : Controller
    {
        private readonly IRepaymentSchedule _schedule;

        public RepaymentScheduleController(IRepaymentSchedule schedule)
        {
            _schedule = schedule;
        }

        [HttpGet]
        public ActionResult GenerateScheduleByLoanId(RepaymentScheduleRequestAPI requestAPI)
        {
            var response = _schedule.GenerateScheduleByLoanId(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByStatus(RepaymentScheduleRequestAPI requestAPI)
        {
            var response = _schedule.GetByStatus(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByScheduleId(RepaymentScheduleRequestAPI requestAPI)
        {
            var response = _schedule.GetByScheduleId(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
