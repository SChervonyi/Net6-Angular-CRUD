using System.Collections.Generic;

namespace PolicyManager.Data
{
    public interface IPolicyHolderRepository
    {
        IReadOnlyCollection<PolicyHolder> Get();
    }
}