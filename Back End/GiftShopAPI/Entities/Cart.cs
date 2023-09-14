using GiftShopAPI.models;

namespace GiftShopAPI.Entities
{
    public class Cart
    {
        public int CartId { get; set; }
        public GiftShopUser User { get; set; }
        public int UserId { get; set; }
        public Order Order { get; set; }
        public int OrderId { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
    }

    public class CartItem
    {
        public string CartItemName { get; set; }       
        public string CartItemImage { get; set; }         
        public string CartItemDescription { get; set; }
        public ProductType CartItemtype { get; set; }

        public int CartId { get; set; }

        public Cart Cart { get; set; }
    }
}
