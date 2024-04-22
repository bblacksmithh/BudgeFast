using Abp.Domain.Entities.Auditing;
using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Domains
{
    public class BudgetCategory: FullAuditedEntity<Guid>
    {
        public Budget Budget { get; set; }
        public TransactionCategory TransactionCategory { get; set; }
        public decimal BudgetAmount { get; set; }
    }
}
