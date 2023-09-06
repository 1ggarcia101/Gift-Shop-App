using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using GiftShopAPI.Data;
using GiftShopAPI.Entities;
using GiftShopAPI.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;
using GiftShopAPI.Queries;

namespace GiftShopAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("GiftShopOrigins")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context;

        public ProductsController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            List<Product> products = await _context.Products.ToListAsync();

            return Ok(products);
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<Product>> GetProductById(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


        [HttpPost]
        public async Task<ActionResult<List<Product>>> CreateProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(await _context.Products.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Product>>> UpdateProduct(Product product)
        {
            var dbProduct = await _context.Products.FindAsync(product.ProductId);
            if (dbProduct == null)
            {
                return BadRequest("Product not found.");
            }

            dbProduct.ProductId = product.ProductId;
            dbProduct.ProductName = product.ProductName;
            dbProduct.ProductDescription = product.ProductDescription;
            dbProduct.ProductImage = product.ProductImage;
            dbProduct.ProductCategory = product.ProductCategory;
            dbProduct.ProductPrice = product.ProductPrice;
            dbProduct.ProductQuantity = product.ProductQuantity;

            await _context.SaveChangesAsync();

            return Ok(await _context.Products.ToListAsync());
        }

        [HttpDelete("{ProductId}")]
        public async Task<ActionResult<List<Product>>> DeleteProducts(int ProductId)
        {
            var dbProduct = await _context.Products.FindAsync(ProductId);
            if (dbProduct == null)
            {
                return BadRequest("User not found.");
            }

            _context.Products.Remove(dbProduct);
            await _context.SaveChangesAsync();

            return Ok(await _context.Products.ToListAsync());
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<Product>>> GetFilteredProducts(string category)
        {
            if (string.IsNullOrEmpty(category) || category.Equals("All Categories", StringComparison.OrdinalIgnoreCase))
            {
                return await _context.Products.ToListAsync();
            }
            else
            {
                List<Product> filteredProducts = await _context.Products
                    .Where(product => product.ProductCategory.ToString().Equals(category, StringComparison.OrdinalIgnoreCase))
                    .ToListAsync();

                return Ok(filteredProducts);
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<Product>>> SearchProducts(string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                return BadRequest("Search term cannot be empty.");
            }

            List<Product> searchedProducts = await _context.Products
                .Where(product =>
                    product.ProductName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                    product.ProductDescription.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
                .ToListAsync();

            return Ok(searchedProducts);
        }
    }
}
