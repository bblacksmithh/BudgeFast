using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using BudgeFast.Configuration;

namespace BudgeFast.Web.Host.Startup
{
    [DependsOn(
       typeof(BudgeFastWebCoreModule))]
    public class BudgeFastWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public BudgeFastWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(BudgeFastWebHostModule).GetAssembly());
        }
    }
}
