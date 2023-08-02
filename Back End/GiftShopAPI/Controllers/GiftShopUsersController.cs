using GiftShopAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GiftShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftShopUsersController : ControllerBase
    {
        private readonly DataContext _context;

        public GiftShopUsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<GiftShopUser>>> GetGiftShopUsers()
        {
            return Ok(await _context.GiftShopUsers.ToListAsync());
        }
    }
}
