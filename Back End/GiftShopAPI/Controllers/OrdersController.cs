using Microsoft.AspNetCore.Mvc;
using GiftShopAPI.Data;
using GiftShopAPI.Entities;
using Microsoft.AspNetCore.Cors;
using GiftShopAPI.Models;
using System.Linq;
using System.Threading.Tasks;

namespace GiftShopAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("GiftShopOrigins")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;

        public OrdersController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
        {
            if (orderDto == null || orderDto.OrderItems == null || orderDto.OrderItems.Count == 0)
            {
                return BadRequest("Invalid order data.");
            }

            // Create an Order entity based on the orderDto
            var order = new Order
            {
                UserId = orderDto.UserId,
                OrderItems = orderDto.OrderItems.Select(oi => new OrderItem
                {
                    ProductId = oi.ProductId,
                    ProductQuantity = oi.ProductQuantity
                }).ToList()
            };

            // Add the order to the database
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Return the newly created order as a response
            return CreatedAtAction(nameof(CreateOrder), new { orderId = order.OrderId }, order);
        }

    }
}
