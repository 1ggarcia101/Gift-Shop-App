using GiftShopAPI.Entities;
using GiftShopAPI.models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Order
{
    [Key]
    public int OrderId { get; set; }
    public decimal TotalAmount { get; set; }

    public int UserId { get; set; } // Foreign key to GiftShopUser
    public GiftShopUser User { get; set; } // An Order belongs to one GiftShopUser
    public ICollection<OrderItem> OrderItems { get; set; }

}

public class OrderItem
{
    public int OrderItemId { get; set; }

    // Reference to Product
    public int ProductId { get; set; }
    public Product Product { get; set; }

    public int OrderId { get; set; }

    [JsonIgnore]
    public Order Order { get; set; }

    public int Quantity { get; set; }
}

