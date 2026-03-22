using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoneyLending1.Models
{
    public class LoginProcess
    {
        public int userId { get; set; }
        public string userName { get; set; }
        public string phone { get; set; }

        public string email { get; set; }
        public string status { get; set; }
        public string roleName { get; set; }
    }
}