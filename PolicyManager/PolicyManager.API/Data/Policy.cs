namespace PolicyManager.Data
{
    public class Policy
    {
        public Guid Id { get; set; }
        public int PolicyNumber { get; set; }
        public PolicyHolder PolicyHolder { get; set; }
    }
}