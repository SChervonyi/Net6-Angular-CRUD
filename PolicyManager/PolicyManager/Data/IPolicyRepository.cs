using System.Collections.Generic;

namespace PolicyManager.Data
{
    public interface IPolicyRepository
    {
        IReadOnlyCollection<Policy> Get();

        Policy Add(Policy policy);

        Policy Update(Guid policyId, Policy policy);

        void Remove(Guid policyId);
    }
}