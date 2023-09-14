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
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // one-to-one relationship between User and Cart
            modelBuilder.Entity<GiftShopUser>()
                .HasOne(u => u.Cart)
                .WithOne(c => c.User)
                .HasForeignKey<Cart>(c => c.UserId);

            // one-to-many relationship between User and Orders
            modelBuilder.Entity<GiftShopUser>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId);

            //  one-to-one relationship between Cart and Order
            modelBuilder.Entity<Cart>()
                .HasOne(c => c.Order)
                .WithOne(o => o.Cart)
                .HasForeignKey<Order>(o => o.CartId);

            //  the one-to-many relationship between Cart and CartItems
            modelBuilder.Entity<Cart>()
                .HasMany(c => c.CartItems)
                .WithOne(ci => ci.Cart)
                .HasForeignKey(ci => ci.CartId);



            base.OnModelCreating(modelBuilder);
        }
    }
}
