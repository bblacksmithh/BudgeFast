using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BudgetServices.Dtos
{
    public class BudgetCategoryOutputDto
    {
        public Guid CategoryId {  get; set; }
        public string CategoryName { get; set; }
        public decimal Amount { get; set; }

    }
}
