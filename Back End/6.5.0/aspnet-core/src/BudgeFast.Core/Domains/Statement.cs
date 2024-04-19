using Abp.Domain.Entities.Auditing;
using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Domains
{
    public class Statement: FullAuditedEntity<Guid>
    {
        public User User { get; set; }
        public BankAccount BankAccount { get; set; }
        public decimal StartingBalance { get; set; }
        public decimal NetChange { get; set; }
        public decimal EndingBalance { get; set; }
        public DateTime MonthOf { get; set; }

    }
}
