using PolicyManager.Core.Domain;
using PolicyManager.Domain.PolicyHolder;

namespace PolicyManager.Domain.Policy
{
    public class Policy : Entity, IAggregateRoot
    {
        public PolicyId Id { get; private set; }

        public PolicyHolderId PolicyHolderId { get; private set; }

        public PolicyNumber PolicyNumber { get; private set; }

        #pragma warning disable CS8618
        private Policy()
        {
            // Only for EF.
        }
        #pragma warning restore CS8618

        public static Policy CreateNew(
            PolicyHolderId policyHolderId,
            PolicyNumber policyNumber)
        {
            return new Policy(policyHolderId, policyNumber);
        }

        private Policy(
            PolicyHolderId policyHolderId,
            PolicyNumber policyNumber)
        {
            Id = new PolicyId(Guid.NewGuid());
            PolicyHolderId = policyHolderId;
            PolicyNumber = policyNumber;
        }
    }
}
