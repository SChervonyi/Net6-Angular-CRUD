using PolicyManager.Data;
using Microsoft.AspNetCore.Mvc;

namespace PolicyManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolicyHolderController : ControllerBase
    {
        private readonly IPolicyHolderRepository _policyHolderRepository;

        public PolicyHolderController(IPolicyHolderRepository policyHolderRepository)
        {
            _policyHolderRepository = policyHolderRepository;
        }

        /// <summary>
        /// Get all policy holders
        /// </summary>
        /// <response code="200">Success.</response>
        /// <returns>Policy holders collection.</returns>
        [HttpGet]
        public IReadOnlyCollection<PolicyHolder> Get()
        {
            return _policyHolderRepository.Get();
        }
    }
}
