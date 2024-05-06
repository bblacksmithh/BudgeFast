using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.TransactionServices.Dtos
{
    public class IncomeVsExpensesDto
    {
        public string Month { get; set; }
        public string Year { get; set; }
        public decimal Income { get; set; }
        public decimal Expenses { get; set; }

    }
}
