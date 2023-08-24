namespace GiftShopAPI.Queries
{
    public class PaginatedResult<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public List<T> Items { get; set; }
    }
}
