using PolicyManager.Core.Domain;

namespace PolicyManager.Domain.Policy
{
    public class PolicyId : TypedIdValueBase
    {
        public PolicyId(Guid value)
            : base(value)
        {
        }
    }
}
