using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.StatementServices.Dtos
{
    public class ForecastDto
    {
        public decimal ForecastedValue { get; set; }
        public string Label { get; set; }
        public DateTime Date { get; set; }

    }
}
