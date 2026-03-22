using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.Models.RequestAPI;

namespace LoanManagement.Controllers
{
    public class UserController : Controller
    {
        private readonly IUser _user;

        public UserController(IUser user)
        {
            _user = user;
        }

        [HttpGet]
        public ActionResult GetAllUsers()
        {
            var response = _user.GetAllUsers();
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SendOtp(UserRequestAPI requestAPI)
        {
            var response = _user.SendOtp(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult VerifyOtp(UserRequestAPI requestAPI)
        {
            var response = _user.VerifyOtp(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }


       
        [HttpPost]
        
        public ActionResult RegisterBorrower(UserRequestAPI requestAPI)
        {
            var response = _user.RegisterBorrower(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByPhone(string phone)
        {
            var response = _user.GetByPhone(phone);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByStatus(string status)
        {
            var response = _user.GetByStatus(status);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SendMessage(UserRequestAPI requestAPI)
        {
            var response = _user.SendMessage(requestAPI); 
            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [HttpPut]
        public ActionResult UpdateUser(UserRequestAPI requestAPI)
        {
            var response = _user.UpdateUser(requestAPI);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
