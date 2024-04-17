using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Domains
{
    public class ExpenseCategory: FullAuditedEntity<Guid>
    {
        public string CategoryName { get; set; }
    }
}
