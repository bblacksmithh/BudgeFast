using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using BudgeFast.Configuration;
using BudgeFast.Web;

namespace BudgeFast.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class BudgeFastDbContextFactory : IDesignTimeDbContextFactory<BudgeFastDbContext>
    {
        public BudgeFastDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<BudgeFastDbContext>();
            
            /*
             You can provide an environmentName parameter to the AppConfigurations.Get method. 
             In this case, AppConfigurations will try to read appsettings.{environmentName}.json.
             Use Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") method or from string[] args to get environment if necessary.
             https://docs.microsoft.com/en-us/ef/core/cli/dbcontext-creation?tabs=dotnet-core-cli#args
             */
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            BudgeFastDbContextConfigurer.Configure(builder, configuration.GetConnectionString(BudgeFastConsts.ConnectionStringName));

            return new BudgeFastDbContext(builder.Options);
        }
    }
}
