using Abp.Application.Services.Dto;
using BudgeFast.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BudgetServices.Dtos
{
    public class AddBudget : EntityDto<Guid>
    {
        public long UserId { get; set; }
        public Guid CategoryId {  get; set; }
        public decimal Amount { get; set; }
    }
}
