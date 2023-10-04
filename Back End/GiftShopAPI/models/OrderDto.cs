namespace GiftShopAPI.Models
{
    public class OrderDto
    {
        public int UserId { get; set; }

        public List<OrderItemDto> OrderItems { get; set; }

        public decimal TotalAmount { get; set; }
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
    }
}
