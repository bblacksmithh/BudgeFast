using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BankAccountServices.Dtos
{
    public class UpdateAccountDto: EntityDto<Guid>
    {
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public decimal Balance { get; set; }
    }
}
