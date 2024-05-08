using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using BudgeFast.Authorization;


namespace BudgeFast
{
    [DependsOn(
        typeof(BudgeFastCoreModule), 
        typeof(AbpAutoMapperModule))]
    //[DependsOn(typeof(AbpEmailingModule))]
    //[DependsOn(typeof(AbpMailKitModule))]
    public class BudgeFastApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<BudgeFastAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(BudgeFastApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
