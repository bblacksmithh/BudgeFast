using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using BudgeFast.Authorization.Roles;
using BudgeFast.Authorization.Users;
using BudgeFast.MultiTenancy;

namespace BudgeFast.EntityFrameworkCore
{
    public class BudgeFastDbContext : AbpZeroDbContext<Tenant, Role, User, BudgeFastDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public BudgeFastDbContext(DbContextOptions<BudgeFastDbContext> options)
            : base(options)
        {
        }
    }
}
