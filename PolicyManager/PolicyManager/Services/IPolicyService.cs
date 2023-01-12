using PolicyManager.Data;

namespace PolicyManager.Services
{
    public interface IPolicyService
    {
        IReadOnlyCollection<Policy> Get();

        Policy Add(Policy policy);

        Policy Update(Guid policyId, Policy policy);

        void Remove(Guid policyId);
    }
}
