using PolicyManager.Data;

namespace PolicyManager.DB
{
    public class DataBase
    {
        private static readonly DataBase _dbInstace = new DataBase();

        public static DataBase Instance => _dbInstace;

        public IList<Policy> Policies { get; private set; }

        public IList<PolicyHolder> PolicieHolders { get; private set; }

        private DataBase()
        {
            Policies = new List<Policy>
            {
                new Policy
                {
                    Id = Guid.NewGuid(),
                    PolicyNumber = 739562,
                    PolicyHolder = _policyHolder1
                },
                new Policy
                {
                    Id = Guid.NewGuid(),
                    PolicyNumber = 383002,
                    PolicyHolder = _policyHolder1
                },
                new Policy
                {
                    Id = Guid.NewGuid(),
                    PolicyNumber = 462946,
                    PolicyHolder = _policyHolder2
                },
                new Policy
                {
                    Id = Guid.NewGuid(),
                    PolicyNumber = 355679,
                    PolicyHolder = _policyHolder3
                },
                new Policy
                {
                    Id = Guid.NewGuid(),
                    PolicyNumber = 589881,
                    PolicyHolder = _policyHolder3
                },
                new Policy
                {
                    Id = Guid.NewGuid(),
                    PolicyNumber = 998256,
                    PolicyHolder = _policyHolder3
                },
                new Policy
                {
                    Id = Guid.NewGuid(),
                    PolicyNumber = 100374,
                    PolicyHolder = _policyHolder3
                }
            };

            PolicieHolders = new List<PolicyHolder>
            {
                _policyHolder1,
                _policyHolder2,
                _policyHolder3
            };
        }

        private readonly PolicyHolder _policyHolder1 = new PolicyHolder
        {
            Name = "Dwayne Johnson",
            Age = 44,
            Gender = Gender.Male
        };

        private readonly PolicyHolder _policyHolder2 = new PolicyHolder
        {
            Name = "John Cena",
            Age = 38,
            Gender = Gender.Male
        };

        private readonly PolicyHolder _policyHolder3 = new PolicyHolder
        {
            Name = "Trish Stratus",
            Age = 42,
            Gender = Gender.Female
        };
    }
}
