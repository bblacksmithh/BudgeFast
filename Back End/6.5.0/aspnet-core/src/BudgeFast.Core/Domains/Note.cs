﻿using Abp.Domain.Entities.Auditing;
using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Domains
{
    public class Note : FullAuditedEntity<Guid>
    {
        public User User { get; set; }
        public string Content { get; set; }

    }
}
