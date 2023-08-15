using GiftShopAPI.Data;
using GiftShopAPI.Entities;
using GiftShopAPI.models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace GiftShopAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("GiftShopOrigins")]
    [ApiController]
    public class GiftShopUsersController : ControllerBase
    {
        private readonly DataContext _context;

        public GiftShopUsersController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("register")]
        public GiftShopUser AddUser(GiftShopUser obj)
        {
            _context.GiftShopUsers.Add(obj);
            _context.SaveChanges();
            return obj;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(UserLoginRequestDto request)
        {
            GiftShopUser user = _context.GiftShopUsers.SingleOrDefault(u => u.Email == request.Email);


            if (user == null)
            {
                return NotFound(new { Success = false, Message = "User not found" });
            }

            if (user.Password != request.Password)
            {
                return Unauthorized(new { Success = false, Message = "Invalid credentials" });
            }

            // User is authenticated, you can generate a token or perform other actions here
            string token = GenerateTokenForUser(user);

            return Ok(request);
        }

        private string GenerateTokenForUser(GiftShopUser user)
        {
            // Generate and return a token (you'll need to implement this)
            // Example using a JWT library: return JwtService.GenerateToken(user);
            return "your_generated_token_here";
        }
    }




    // [HttpPost]
    // [Route("login")]
    //public async Task<IActionResult> Login([FromBody]UserLoginRequestDto model)
    // {
    //     var status = LoginStatus.NotAllowed;
    //     var user = await _userManager.FindByEmailAsync(model.Email);
    //     if (user != null)
    //     {
    //         if (user.Email == null)
    //         {
    //             status = LoginStatus.NotConfirmed;
    //         }
    //         else
    //         {
    //             status = await DoLogin(user, model);
    //         }
    //     }

    //     return Ok(new LoginResult { Status = status });
    // }

    // private async Task<LoginStatus> DoLogin(GiftShopUser user, UserLoginRequestDto model)
    // {
    //     var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

    //     if (result.Succeeded)
    //     {
    //         await _signInManager.SignInAsync(user, false);
    //         return LoginStatus.Success;
    //     }


    //     if (result == SignInResult.Failed)
    //     {
    //         return LoginStatus.Failed;
    //     }

    //     throw new Exception("bad request");

    // }



    
}

