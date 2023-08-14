using GiftShopAPI.Data;
using GiftShopAPI.Entities;
using GiftShopAPI.models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace GiftShopAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("GiftShopOrigins")]
    [ApiController]
    public class GiftShopUsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<GiftShopUser> _userManager;
        private readonly SignInManager<GiftShopUser> _signInManager;

        public GiftShopUsersController(DataContext context, UserManager<GiftShopUser> userManager, SignInManager<GiftShopUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
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
       public async Task<IActionResult> Login([FromBody]UserLoginRequestDto model)
        {
            var status = LoginStatus.NotAllowed;
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                if (user.Email == null)
                {
                    status = LoginStatus.NotConfirmed;
                }
                else
                {
                    status = await DoLogin(user, model);
                }
            }

            return Ok(new LoginResult { Status = status });
        }

        private async Task<LoginStatus> DoLogin(GiftShopUser user, UserLoginRequestDto model)
        {
            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return LoginStatus.Success;
            }


            if (result == SignInResult.Failed)
            {
                return LoginStatus.Failed;
            }

            throw new Exception("bad request");

        }



        //[HttpGet]
        //public async Task<ActionResult<List<GiftShopUser>>> GetGiftShopUsers()
        //{
        //    return Ok(await _context.GiftShopUsers.ToListAsync());
        //}

        //[HttpPost]
        //public async Task<ActionResult<List<GiftShopUser>>> CreateGiftShopUser(GiftShopUser user)
        //{
        //    _context.GiftShopUsers.Add(user);
        //    await _context.SaveChangesAsync();

        //    return Ok(await _context.GiftShopUsers.ToListAsync());
        //}

        //[HttpPut]
        //public async Task<ActionResult<List<GiftShopUser>>> UpdateGiftShopUser(GiftShopUser user)
        //{
        //    var dbUser = await _context.GiftShopUsers.FindAsync(user.Id);
        //    if (dbUser == null)
        //    {
        //        return BadRequest("User not found.");
        //    }

        //    dbUser.Id = user.Id;
        //    dbUser.FirstName = user.FirstName;
        //    dbUser.LastName = user.LastName;
        //    dbUser.Email = user.Email;
        //    dbUser.UserType = user.UserType;
        //    dbUser.Password = user.Password;

        //    await _context.SaveChangesAsync();

        //    return Ok(await _context.GiftShopUsers.ToListAsync());
        //}

        //[HttpDelete("{id}")]
        //public async Task<ActionResult<List<GiftShopUser>>> DeleteGiftShopUser(int id)
        //{
        //    var dbuser = await _context.GiftShopUsers.FindAsync(id);
        //    if (dbuser == null)
        //    {
        //        return BadRequest("User not found.");
        //    }

        //    _context.GiftShopUsers.Remove(dbuser);
        //    await _context.SaveChangesAsync();

        //    return Ok(await _context.GiftShopUsers.ToListAsync());
        //}
    }
}
