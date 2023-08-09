using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GiftShopAPI.models;

namespace GiftShopAPI
{
    public interface GiftShopUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; } 
        public string Email { get; set; } 
        public string assword { get; set; }
        public UserType UserType { get; set; }

    }
}
