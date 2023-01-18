using PolicyManager.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManager.Domain.Policy.Rules
{
    public class PolicyNumberCannotBeNegativeRule : IBusinessRule
    {
        private readonly int _policyNumber;

        public PolicyNumberCannotBeNegativeRule(int policyNumber)
        {
            _policyNumber = policyNumber;
        }

        public bool IsBroken() => _policyNumber < 0;

        public string Message => "Policy number cannot be negative";
    }
}
