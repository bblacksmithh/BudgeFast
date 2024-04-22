using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.TransactionCategoryServices.Dtos
{
    public class CategoryTotalForMonthOutputDto: EntityDto<Guid>
    {
        public string CategoryName { get; set; }
        public decimal AmountSpent { get; set; }

    }
}
