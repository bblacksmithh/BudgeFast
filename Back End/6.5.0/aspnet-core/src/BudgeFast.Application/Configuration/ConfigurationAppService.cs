using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using BudgeFast.Configuration.Dto;

namespace BudgeFast.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : BudgeFastAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
