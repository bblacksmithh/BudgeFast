using System.Threading.Tasks;
using Abp.Application.Services;
using BudgeFast.Sessions.Dto;

namespace BudgeFast.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
