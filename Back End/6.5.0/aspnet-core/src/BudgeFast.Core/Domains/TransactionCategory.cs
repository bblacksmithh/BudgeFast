using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Domains
{
    public class TransactionCategory: FullAuditedEntity<Guid>
    {
        public string CategoryName { get; set; }
        public bool IsExpense { get; set; }
    }
}
