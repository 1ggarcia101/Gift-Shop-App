using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GiftShopAPI.Data;
using GiftShopAPI.Entities;
using GiftShopAPI.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace GiftShopAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("GiftShopOrigins")]
    [ApiController]
    public class GiftShopUsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly UserDetailsService _userDetailsService;
        private readonly JwtHandler _jwtHandler;

        public GiftShopUsersController(DataContext context, IConfiguration configuration, UserDetailsService userDetailsService, JwtHandler jwtHandler)
        {
            _context = context;
            _configuration = configuration;
            _userDetailsService = userDetailsService;
            _jwtHandler = jwtHandler;
        }

        [HttpGet("user-details")]
        [Authorize] // Protect the endpoint
        public IActionResult GetUserDetails()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get the authenticated user's ID as a string

            if (!int.TryParse(userIdString, out int userId)) // Try to parse the string to an int
            {
                return BadRequest("Invalid user ID");
            }

            var userDetails = _userDetailsService.GetUserDetailsById(userId);

            if (userDetails == null)
            {
                return NotFound();
            }

            return Ok(userDetails);
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(UserSignupRequestDto registrationDto)
        {
            var user = new GiftShopUser
            {
                FirstName = registrationDto.FirstName,
                LastName = registrationDto.LastName,
                Email = registrationDto.Email,
                Password = registrationDto.Password,
            };

            _context.GiftShopUsers.Add(user);
            _context.SaveChanges();

            return Ok(new { Success = true, Message = "Registration successful" });
        }


        [HttpPost]
        [Route("login")]
        public IActionResult Login(UserLoginRequestDto request)
        {
            // Validate user credentials (replace with your logic)
            GiftShopUser user = _context.GiftShopUsers.SingleOrDefault(u => u.Email == request.Email);

            if (user == null || user.Password != request.Password)
            {
                return Unauthorized(new { Success = false, Message = "Invalid credentials" });
            }

            var token = _jwtHandler.GenerateToken(user);

            // Return token as part of the response
            return Ok(new { Success = true, Token = token });
        }



    }
}
