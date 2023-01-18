using PolicyManager.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManager.Domain.PolicyHolder
{
    public class PolicyHolderId : TypedIdValueBase
    {
        public PolicyHolderId(Guid value)
            : base(value)
        {
        }
    }
}
