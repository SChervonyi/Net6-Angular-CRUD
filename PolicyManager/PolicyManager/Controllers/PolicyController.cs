using PolicyManager.Data;
using PolicyManager.Services;
using Microsoft.AspNetCore.Mvc;

namespace PolicyManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolicyController : ControllerBase
    {
        private readonly IPolicyService _policyService;

        public PolicyController(IPolicyService policyService)
        {
            _policyService = policyService;
        }

        /// <summary>
        /// Get all policies.
        /// </summary>
        /// <response code="200">Success.</response>
        /// <returns>Policies collection.</returns>
        [HttpGet]
        public IReadOnlyCollection<Policy> Get()
        {
            return _policyService.Get();
        }

        /// <summary>
        /// Delete the policy.
        /// </summary>
        /// <param name="policyId"></param>
        /// <response code="200">Success.</response>
        /// <response code="404">Not found.</response>
        [HttpDelete("{policyId}")]
        public void Delete([FromRoute] Guid policyId)
        {
            _policyService.Remove(policyId);
        }

        /// <summary>
        /// Add a policy.
        /// </summary>
        /// <param name="Policy"></param>
        /// <response code="200">Success.</response>
        /// <returns>Added policy.</returns>
        [HttpPost]
        public Policy Add([FromBody] Policy policy)
        {
            return _policyService.Add(policy);
        }

        /// <summary>
        /// Delete the policy.
        /// </summary>
        /// <param name="policyId"></param>
        /// <param name="policy"></param>
        /// <response code="200">Success.</response>
        /// <response code="404">Not found.</response>
        /// <returns>Updated policy.</returns>
        [HttpPut("{policyId}")]
        public Policy Update([FromRoute] Guid policyId, [FromBody] Policy policy)
        {
            return _policyService.Update(policyId, policy);
        }
    }
}
