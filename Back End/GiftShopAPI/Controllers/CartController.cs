using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GiftShopAPI.models;
using GiftShopAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using GiftShopAPI.Data;

namespace GiftShopAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("GiftShopOrigins")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;

        public CartController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("add-to-cart")]
        public async Task<IActionResult> AddToCart([FromBody] CartDto cartDto)
        {
            if (cartDto == null || cartDto.CartItems == null || cartDto.CartItems.Count == 0)
            {
                return BadRequest("Invalid cart data.");
            }

            // Retrieve the user's cart (if it exists) or create a new one
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == cartDto.UserId);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = cartDto.UserId,
                    CartItems = new List<CartItem>()
                };
            }

            // Update cart items or add new items
            foreach (var cartItemDto in cartDto.CartItems)
            {
                var existingCartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == cartItemDto.ProductId);

                if (existingCartItem != null)
                {
                    // If the product already exists in the cart, update the quantity
                    existingCartItem.Quantity += cartItemDto.Quantity;
                }
                else
                {
                    // If the product does not exist, add it to the cart
                    cart.CartItems.Add(new CartItem
                    {
                        ProductId = cartItemDto.ProductId,
                        Quantity = cartItemDto.Quantity
                    });
                }
            }

            // Save changes to the database
            if (cart.CartId == 0)
            {
                _context.Carts.Add(cart);
            }

            await _context.SaveChangesAsync();

            return Ok(new { Success = true, Message = "Cart updated successfully." });
        }

        [HttpGet("get-cart-items/{userId}")]
        public async Task<IActionResult> GetCartItems(int userId)
        {
            var cartItemsWithProductInfo = await _context.CartItems
                .Include(ci => ci.Product) // Include the related Product entity
                .Where(ci => ci.Cart.UserId == userId)
                .Select(ci => new
                {
                    ProductId = ci.Product.ProductId,
                    ProductName = ci.Product.ProductName,
                    ProductDescription = ci.Product.ProductDescription,
                    ProductImage = ci.Product.ProductImage,
                    ProductPrice = ci.Product.ProductPrice,
                    ProductQuantity = ci.Quantity
                })
                .ToListAsync();

            return Ok(cartItemsWithProductInfo);
        }

    }
}


