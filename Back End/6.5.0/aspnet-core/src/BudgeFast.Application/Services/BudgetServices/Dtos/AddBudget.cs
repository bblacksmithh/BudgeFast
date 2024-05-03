using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BudgetServices.Dtos
{
    public class CreateBudgetDto : EntityDto<Guid>
    {
        public long UserId { get; set; }
        public string BudgetName { get; set; }
        public List<BudgetCategoryDto> Categories { get; set; }
    }
}
