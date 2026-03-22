using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Controllers
{
    public class RoleController : Controller
    {
        private readonly IRole _role;

        public RoleController(IRole role)
        {
            _role = role;
        }

        [HttpGet]
        public ActionResult GetRoles(int? roleId)
        {
            var request = new RoleRequestAPI { roleId = roleId };
            var response = _role.GetRoles(request);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddRole(RoleRequestAPI requestAPI)
        {
            var response = _role.AddRole(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
