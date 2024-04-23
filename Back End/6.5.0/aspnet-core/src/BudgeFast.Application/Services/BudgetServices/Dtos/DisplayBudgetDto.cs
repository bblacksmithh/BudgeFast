using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BudgetServices.Dtos
{
    public class DisplayBudgetDto
    {
        public string BudgetName { get; set; }
        public List<BudgetCategoryOutputDto> Categories {  get; set; } 
    }
}
