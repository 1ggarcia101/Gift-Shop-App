using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GiftShopAPI.Entities;
using GiftShopAPI.models;

public class GiftShopUser
{
    [Key]
    public int UserId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public UserType UserType { get; set; }

    [NotMapped]
    public Cart Cart { get; set; } // GiftShopUser can have one Cart

    [NotMapped]
    public ICollection<Order> Orders { get; set; } // GiftShopUser can have many Orders
}
