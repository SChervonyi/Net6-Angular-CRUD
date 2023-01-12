using PolicyManager.DB;

namespace PolicyManager.Data
{
    public class PolicyRepository : IPolicyRepository
    {
        private readonly IList<Policy> _policies;

        public PolicyRepository()
        {
            _policies = DataBase.Instance.Policies;
        }

        public IReadOnlyCollection<Policy> Get()
        {
            return _policies.ToList();
        }

        public Policy Add(Policy policy)
        {
            _policies.Add(policy);
            return policy;
        }

        public Policy Update(Guid policyId, Policy policy)
        {
            Remove(policyId);
            _policies.Add(policy);
            return policy;
        }

        public void Remove(Guid policyId)
        {
            var policy = _policies.SingleOrDefault(p => p.Id == policyId);

            if (policy != null)
                _policies.Remove(policy);
        }
    }
}