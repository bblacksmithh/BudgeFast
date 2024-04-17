using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Domains
{
    public class Note
    {
        public User User { get; set; }
        public string Content { get; set; }
        public DateTime Timeframe { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
