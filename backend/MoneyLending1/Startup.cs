using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin;
using Owin;

using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security.Jwt;
using System.Text;

[assembly: OwinStartup(typeof(MoneyLending1.Startup))]  // <-- change LoanManagement to your root namespace

namespace MoneyLending1
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var secret = "YourSecretKeyForEncryption&Descryption";
            var issuer = "MoneyLendingIssuer";
            var audience = "MoneyLendingAudience";

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode.Active,
                TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = issuer,

                    ValidateAudience = true,
                    ValidAudience = audience,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),

                    ValidateLifetime = true,
                    ClockSkew = System.TimeSpan.FromMinutes(2),

                    RoleClaimType = System.Security.Claims.ClaimTypes.Role,
                    NameClaimType = System.Security.Claims.ClaimTypes.NameIdentifier
                }
            });
        }
    }
}