public class PaymentDto
{
    public string CardNumber { get; set; }
    public string NameOnCard { get; set; }
    public string ExpirationDate { get; set; }
    public string CVV { get; set; }
    public int OrderId { get; set; }
}
