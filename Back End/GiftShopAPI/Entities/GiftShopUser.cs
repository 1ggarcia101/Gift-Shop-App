using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GiftShopAPI.models;

namespace GiftShopAPI.Entities
{
    public class GiftShopUser
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public UserType UserType { get; set; }

        public Cart Cart { get; set; }

        public ICollection <Order> Orders { get; set; }

    }
}
