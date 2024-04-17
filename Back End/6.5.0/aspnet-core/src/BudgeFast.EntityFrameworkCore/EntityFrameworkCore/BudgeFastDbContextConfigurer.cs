using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace BudgeFast.EntityFrameworkCore
{
    public static class BudgeFastDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<BudgeFastDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<BudgeFastDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
