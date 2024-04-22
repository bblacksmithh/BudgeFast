using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using BudgeFast.Authorization.Roles;
using BudgeFast.Authorization.Users;
using BudgeFast.MultiTenancy;
using BudgeFast.Domains;

namespace BudgeFast.EntityFrameworkCore
{
    public class BudgeFastDbContext : AbpZeroDbContext<Tenant, Role, User, BudgeFastDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<BankAccount> BankAccounts { get; set; }
        public DbSet<Liability> Liabilities { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Statement> Statements { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionCategory> TransactionCategories { get; set; }
        public BudgeFastDbContext(DbContextOptions<BudgeFastDbContext> options)
            : base(options)
        {
        }
    }
}
