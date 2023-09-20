namespace GiftShopAPI.Models
{
    public class OrderDto
    {
        public int UserId { get; set; }

        public List<OrderItemDto> OrderItems { get; set; }
        // Add more properties as needed to represent the data you want to transfer.
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
