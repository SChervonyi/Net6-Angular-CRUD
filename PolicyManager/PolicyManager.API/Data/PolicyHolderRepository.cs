using PolicyManager.DB;

namespace PolicyManager.Data
{
    public class PolicyHolderRepository : IPolicyHolderRepository
    {
        private readonly IList<PolicyHolder> _policyHolders;

        public PolicyHolderRepository()
        {
            _policyHolders = DataBase.Instance.PolicieHolders;
        }

        public IReadOnlyCollection<PolicyHolder> Get()
        {
            return _policyHolders.ToList();
        }
    }
}