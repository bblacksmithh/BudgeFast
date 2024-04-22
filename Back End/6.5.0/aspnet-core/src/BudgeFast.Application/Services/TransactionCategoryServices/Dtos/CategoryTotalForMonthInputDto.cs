using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.TransactionCategoryServices.Dtos
{
    public class CategoryTotalForMonthInputDto
    {
        public long UserID { get; set; }
        public DateTime MonthOf {  get; set; }

    }
}
