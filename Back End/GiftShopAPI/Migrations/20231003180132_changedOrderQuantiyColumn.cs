using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftShopAPI.Migrations
{
    /// <inheritdoc />
    public partial class changedOrderQuantiyColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "OrderItem",
                newName: "ProductQuantity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductQuantity",
                table: "OrderItem",
                newName: "Quantity");
        }
    }
}
