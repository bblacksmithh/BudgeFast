using Abp.Application.Services.Dto;
using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.Statement.Dtos
{
    public class CreateStatementDto: FullAuditedEntityDto<Guid>
    {
        public long UserId { get; set; }
        public Guid BankAccountId { get; set; }
    }
}
