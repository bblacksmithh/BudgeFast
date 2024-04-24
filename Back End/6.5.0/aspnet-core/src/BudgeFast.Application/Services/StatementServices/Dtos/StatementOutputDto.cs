using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.StatementServices.Dtos
{
    public class StatementOutputDto: EntityDto<Guid>
    {
        public string ForUser {  get; set; }
        public DateTime MonthOf {  get; set; }
        public decimal OpeningBalance { get; set; }
        public decimal NetChange {  get; set; }
        public decimal ClosingBalance { get; set; }
        public List<TransactionOutputDto> Transactions { get; set; }
    }
}
