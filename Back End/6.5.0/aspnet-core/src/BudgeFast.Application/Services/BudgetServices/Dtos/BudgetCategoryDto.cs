using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BudgetServices.Dtos
{
    public class BudgetCategoryDto
    {
        public Guid CategoryId { get; set; }
        public decimal Amount { get; set; }
    }
}
