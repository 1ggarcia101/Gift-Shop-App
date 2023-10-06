using System.Collections.Generic;
using GiftShopAPI.Models;

namespace GiftShopAPI.models
{
    public class OrderDetails
    {
        public int OrderId { get; set; }
        public decimal TotalAmount { get; set; }
        public int UserId { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
    }
}
