using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftShopAPI.Migrations
{
    /// <inheritdoc />
    public partial class addQuantityColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
              name: "Quantity",
              table: "OrderItem",
              type: "int",
              nullable: false,
              defaultValue: 0);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
             name: "Quantity",
             table: "OrderItem");

        }
    }
}
