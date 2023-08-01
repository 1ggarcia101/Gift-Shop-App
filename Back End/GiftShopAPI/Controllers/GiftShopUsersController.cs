using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GiftShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftShopUsersController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<GiftShopUser>>> GetGiftShopUsers()
        {
            return new List<GiftShopUser>
            {
                new GiftShopUser
                {
                    FirstName = "George",
                    LastName = "Smith",
                    Email = "dsfg@gift.com",
                    Password = "sdfhdfgh",
                    UserType = "Customer"
                }
            };
        }
    }
}
