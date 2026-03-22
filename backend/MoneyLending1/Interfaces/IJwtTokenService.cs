using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneyLending1.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(string userId,string username, string phone, string email, string role, int expireMinutes = 1440);


    }
}
