using PolicyManager.Data;

namespace PolicyManager.Services
{
    public class PolicyService: IPolicyService
    {
        private readonly IPolicyRepository _policyRepository;

        public PolicyService(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }

        public IReadOnlyCollection<Policy> Get()
        {
            return _policyRepository.Get();
        }

        public Policy Add(Policy policy)
        {
            var policies = _policyRepository.Get();
            if (!IsPolicyValid(policy, policies))
            {
                throw new ApplicationException("Policy is invalid");
            }

            policy.Id = Guid.NewGuid();
            return _policyRepository.Add(policy);
        }

        public Policy Update(Guid policyId, Policy policy)
        {
            var policies = _policyRepository.Get().Where(p => p.Id != policyId);

            if (!IsPolicyValid(policy, policies))
            {
                throw new ApplicationException("Policy is invalid");
            }

            policy.Id = policyId;
            return _policyRepository.Update(policyId, policy);
        }

        public void Remove(Guid policyId)
        {
            _policyRepository.Remove(policyId);
        }

        private bool IsPolicyValid(Policy policy, IEnumerable<Policy> policies)
        {
            if (policy == null)
            {
                return false;
            }

            if (policy.PolicyHolder == null)
            { 
                return false; 
            }

            var policyNumber = policy.PolicyNumber;

            return policies.All(p => p.PolicyNumber != policyNumber);
        }
    }
}
