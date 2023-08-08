using Microsoft.EntityFrameworkCore;

namespace GiftShopAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<GiftShopUser> GiftShopUsers { get; set; }
    }
}
