using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace BudgeFast.Controllers
{
    public abstract class BudgeFastControllerBase: AbpController
    {
        protected BudgeFastControllerBase()
        {
            LocalizationSourceName = BudgeFastConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
