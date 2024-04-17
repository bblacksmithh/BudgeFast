using Abp.Authorization;
using BudgeFast.Authorization.Roles;
using BudgeFast.Authorization.Users;

namespace BudgeFast.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
