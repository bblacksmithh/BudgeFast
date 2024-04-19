using Abp.Domain.Entities.Auditing;
using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Domains
{
    public class Transaction : FullAuditedEntity<Guid>
    {
        public User User { get; set; }
        public BankAccount BankAccount { get; set; }
        public TransactionCategory TransactionCategory { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime TransactionDate { get; set; }
        public bool IsExpense { get; set; }
        public Guid? StatementId { get; set; }
    }
}
