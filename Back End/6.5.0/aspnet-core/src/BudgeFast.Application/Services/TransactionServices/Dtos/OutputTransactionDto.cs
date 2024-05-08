using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.TransactionServices.Dtos
{
    public class OutputTransactionDto: EntityDto<Guid>
    {
        public string AccountName { get; set; }
        public string TransactionCategory { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
