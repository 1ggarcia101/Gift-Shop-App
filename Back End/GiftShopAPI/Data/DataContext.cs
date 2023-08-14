using GiftShopAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace GiftShopAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<GiftShopUser> GiftShopUsers { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasOne<GiftShopUser>() 
                .WithMany()
                .HasForeignKey(o => o.CustomerId);
        }
    }
}
