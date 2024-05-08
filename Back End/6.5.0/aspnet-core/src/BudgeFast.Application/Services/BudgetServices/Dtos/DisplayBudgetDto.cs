using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BudgetServices.Dtos
{
    public class DisplayBudgetDto: EntityDto<Guid>
    {
        public string Category { get; set; }
        public decimal Amount { get; set; }
    }
}
