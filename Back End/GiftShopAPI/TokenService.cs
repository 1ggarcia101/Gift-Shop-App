//using Microsoft.AspNetCore.Identity;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace GiftShopAPI
//{
//    public class TokenService
//    {
//        private readonly JwtHandler _jwtHandler;

//        public TokenService(JwtHandler jwtHandler)
//        {
//            _jwtHandler = jwtHandler;
//        }

//        public string GenerateJwtToken(string secretKey, string issuer, string audience, int expiryMinutes, ClaimsIdentity claimsIdentity)
//        {
//            var token = _jwtHandler.GenerateToken(secretKey, issuer, audience, expiryMinutes, claimsIdentity);
//            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

//            return tokenString;
//        }
//    }
//}

