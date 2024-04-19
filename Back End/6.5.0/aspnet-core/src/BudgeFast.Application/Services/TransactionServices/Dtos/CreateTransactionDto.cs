using Abp.Application.Services.Dto;
using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.TransactionServices.Dtos
{
    public class CreateTransactionDto: FullAuditedEntityDto<Guid>
    {
        public long UserId { get; set; }
        public Guid BankAccountId { get; set; }
        public Guid TransactionCategoryId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime TransactionDate { get; set; }
        public bool IsExpense { get; set; }
    }
}
