using GiftShopAPI.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
