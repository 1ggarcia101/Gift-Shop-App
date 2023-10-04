using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftShopAPI.Migrations
{
    /// <inheritdoc />
    public partial class removeProductPriceColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductPrice",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "ProductPrice",
                table: "CartItems");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
