using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BankAccountServices.Dtos
{
    public class CreateAccountDto: EntityDto<Guid>
    {
        public long UserId { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public decimal Balance { get; set; }
    }
}
