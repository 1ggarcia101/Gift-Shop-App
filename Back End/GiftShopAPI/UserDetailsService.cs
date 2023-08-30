using GiftShopAPI.Data;
using GiftShopAPI.models;

namespace GiftShopAPI
{
    public class UserDetailsService
    {
        private readonly DataContext _context;

        public UserDetailsService(DataContext context)
        {
            _context = context;
        }

        public UserDetailsDto GetUserDetailsById(int userId)
        {
            // Fetch user details by user ID
            var user = _context.GiftShopUsers.FirstOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return null;
            }

            return new UserDetailsDto
            {
                FirstName = user.FirstName,
                // Add other properties you want to return
            };
        }
    }

}
