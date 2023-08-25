using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GiftShopAPI.Data;
using GiftShopAPI.Entities;

namespace GiftShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;

        public OrdersController(DataContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public IActionResult GetOrders()
        {
            var orders = _context.Orders;
            return Ok(orders);
        }

        
        [HttpGet("{orderId}")]
        public IActionResult GetOrder(int orderId)
        {
            var order = _context.Orders.Find(orderId);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        
        [HttpPost]
        public IActionResult CreateOrder(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetOrder), new { orderId = order.OrderId }, order);
        }

        
        [HttpPut("{orderId}")]
        public IActionResult UpdateOrder(int orderId, Order updatedOrder)
        {
            var existingOrder = _context.Orders.Find(orderId);
            if (existingOrder == null)
            {
                return NotFound();
            }

            // Update properties of the existing order based on the updatedOrder object
            existingOrder.TotalAmount = updatedOrder.TotalAmount;
            // Update other properties as needed

            _context.Orders.Update(existingOrder);
            _context.SaveChanges();
            return NoContent();
        }

        
        [HttpDelete("{orderId}")]
        public IActionResult DeleteOrder(int orderId)
        {
            var order = _context.Orders.Find(orderId);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            _context.SaveChanges();
            return NoContent();
        }
    }
}

