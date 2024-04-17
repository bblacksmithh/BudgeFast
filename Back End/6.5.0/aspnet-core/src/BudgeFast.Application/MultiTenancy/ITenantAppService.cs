using Abp.Application.Services;
using BudgeFast.MultiTenancy.Dto;

namespace BudgeFast.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

