using System.Threading.Tasks;
using BudgeFast.Configuration.Dto;

namespace BudgeFast.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
