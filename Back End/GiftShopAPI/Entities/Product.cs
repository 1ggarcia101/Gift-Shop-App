using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GiftShopAPI.models;

namespace GiftShopAPI.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ProductDescription { get; set; } = string.Empty;
        public string ProductImage { get; set; } = string.Empty;
        public ProductType ProductCategory { get; set; } 
        public decimal ProductPrice { get; set; } = decimal.Zero;
        public decimal ProductQuantity { get; set; } = decimal.Zero;

        public ICollection<CartItem> CartItems { get; set; }

    }
}
