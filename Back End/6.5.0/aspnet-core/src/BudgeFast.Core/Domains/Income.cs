using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Domains
{
    public class Income
    {
        public User User { get; set; }
        public BankAccount BankAccount { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime DateTime { get; set; }
    }
}
