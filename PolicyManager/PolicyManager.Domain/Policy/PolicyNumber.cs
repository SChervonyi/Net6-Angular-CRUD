using PolicyManager.Core.Domain;
using PolicyManager.Domain.Policy.Rules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManager.Domain.Policy
{
    public class PolicyNumber : ValueObject
    {
        public int Value { get; }

        public static PolicyNumber Of(int policyNumber)
        {
            CheckRule(new PolicyNumberCannotBeNegativeRule(policyNumber));

            return new PolicyNumber(policyNumber);
        }

        private PolicyNumber(int policyNumber)
        {
            this.Value = policyNumber;
        }
    }
}
