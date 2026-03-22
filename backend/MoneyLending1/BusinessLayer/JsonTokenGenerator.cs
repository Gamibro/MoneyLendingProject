using Microsoft.IdentityModel.Tokens;
using MoneyLending1.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Web;

namespace MoneyLending1.BusinessLayer
{
    public class JsonTokenGenerator:IJwtTokenService
    {
        public string secretKey = "YourSecretKeyForEncryption&Descryption";
        public const string Issuer = "MoneyLendingIssuer";
        public const string Audience = "MoneyLendingAudience";

        public string GenerateToken(string userId, string username, string phone, string email, string role, int expireMinutes = 1440)
        {
            // Implementation for generating JWT token
           
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new System.Security.Claims.Claim("userId",userId),
                new System.Security.Claims.Claim("username", username),
                new System.Security.Claims.Claim("phone", phone),
                new System.Security.Claims.Claim("email", email),
                new System.Security.Claims.Claim("role", role)
            };

            var token = new JwtSecurityToken(
                issuer:Issuer,
                audience: Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expireMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}