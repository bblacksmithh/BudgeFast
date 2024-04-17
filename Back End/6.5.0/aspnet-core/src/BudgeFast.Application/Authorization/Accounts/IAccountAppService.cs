using System.Threading.Tasks;
using Abp.Application.Services;
using BudgeFast.Authorization.Accounts.Dto;

namespace BudgeFast.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
