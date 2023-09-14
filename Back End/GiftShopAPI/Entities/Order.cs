using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GiftShopAPI.models;

namespace GiftShopAPI.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public decimal TotalAmount { get; set; }
        public GiftShopUser User { get; set; }
        public int UserId { get; set; }

        // Add a reference to the Cart entity
        public Cart CartId { get; set; }

        public Cart Cart { get; set; }
    }
}

