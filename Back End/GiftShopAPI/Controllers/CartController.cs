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
                    existingCartItem.ProductQuantity += cartItemDto.ProductQuantity;
                }
                else
                {
                    // If the product does not exist, add it to the cart
                    cart.CartItems.Add(new CartItem
                    {
                        ProductId = cartItemDto.ProductId,
                        ProductQuantity = cartItemDto.ProductQuantity
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

        [HttpPost("convert-cart/{userId}")]
        public async Task<IActionResult> ConvertLocalCartToDbCart(int userId, [FromBody] CartDto cartDto)
        {
            if (cartDto == null || cartDto.CartItems == null || cartDto.CartItems.Count == 0)
            {
                return BadRequest("Invalid cart data.");
            }

            // create a new cart for the user
            var cart = new Cart
            {
                UserId = userId,
                CartItems = new List<CartItem>()
            };

            foreach (var cartItemDto in cartDto.CartItems)
            {
                // Add each item to the cart
                cart.CartItems.Add(new CartItem
                {
                    ProductId = cartItemDto.ProductId,
                    ProductQuantity = cartItemDto.ProductQuantity
                });
            }

            // Save the new cart to the database
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return Ok(new { Success = true, Message = "Cart created and updated successfully." });
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
                    ProductQuantity = ci.ProductQuantity
                })
                .ToListAsync();

            return Ok(cartItemsWithProductInfo);
        }

        [HttpDelete("delete-cart/{userId}")]
        public async Task<IActionResult> DeleteCart(int userId)
        {
            // Find the user's cart
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            // Remove the cart and its associated cart items
            _context.Carts.Remove(cart);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(new { Success = true, Message = "Cart deleted successfully." });
        }


        [HttpDelete("delete-cart-item/{userId}/{productId}")]
        public async Task<IActionResult> DeleteCartItem(int userId, int productId)
        {
            // Find the user's cart
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            // Find the cart item with the specified product ID
            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);

            if (cartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            // Remove the cart item from the cart
            cart.CartItems.Remove(cartItem);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(new { Success = true, Message = "Cart item deleted successfully." });
        }

        [HttpPost("increment-cart-item/{userId}/{productId}")]
        public async Task<IActionResult> IncrementCartItem(int userId, int productId)
        {
            // Find the user's cart
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            // Find the cart item with the specified product ID
            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);

            if (cartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            // Increment the quantity of the cart item
            cartItem.ProductQuantity++;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(new { Success = true, Message = "Cart item quantity incremented successfully." });
        }

        [HttpPost("decrement-cart-item/{userId}/{productId}")]
        public async Task<IActionResult> DecrementCartItem(int userId, int productId)
        {
            // Find the user's cart
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            // Find the cart item with the specified product ID
            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);

            if (cartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            // Decrement the quantity of the cart item, but ensure it doesn't go below 1
            if (cartItem.ProductQuantity > 1)
            {
                cartItem.ProductQuantity--;
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(new { Success = true, Message = "Cart item quantity decremented successfully." });
        }


    }
}


