using Abp.Application.Services;
using Abp.Domain.Repositories;
using BudgeFast.Authorization.Users;
using BudgeFast.Domains;
using BudgeFast.Services.StatementServices.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.StatementServices
{
    public class StatementAppService: ApplicationService
    {
        private readonly IRepository<Statement, Guid> _statementRepository;
        private readonly IRepository<Transaction, Guid> _transactionRepository;
        private readonly UserManager _userManager;

        public StatementAppService(IRepository<Statement, Guid> statementRepository, IRepository<Transaction, Guid> transactionRepository, UserManager userManager)
        {
            _statementRepository = statementRepository;
            _transactionRepository = transactionRepository;
            _userManager = userManager;
        }

        public async Task<List<StatementOutputDto>> GetAllStatementsForUser(long userId)
        {
            var statements = await _statementRepository
                .GetAllIncluding(x => x.User)
                .Where(x => x.User.Id == userId).OrderByDescending(x => x.MonthOf)
                .ToListAsync();

            var statementDtos = new List<StatementOutputDto>();

            foreach (var statement in statements)
            {
                var transactionDtos = await _transactionRepository
                    .GetAllIncluding(t => t.User, t => t.BankAccount, t => t.TransactionCategory)
                    .Where(t => t.User.Id == userId && t.StatementId == statement.Id)
                    .Select(transaction => new TransactionOutputDto
                    {
                        Id = transaction.Id,
                        Description = transaction.Description,
                        Amount = transaction.Amount,
                        Category = transaction.TransactionCategory.CategoryName,
                        AccountName = transaction.BankAccount.AccountName
                    }).ToListAsync();

                var statementDto = new StatementOutputDto
                {
                    Id = statement.Id,
                    ForUser = userId.ToString(),
                    MonthOf = statement.MonthOf,
                    OpeningBalance = statement.StartingBalance,
                    NetChange = statement.NetChange,
                    ClosingBalance = statement.EndingBalance,
                    Transactions = transactionDtos,
                };

                statementDtos.Add(statementDto);
            }

            return statementDtos;
        }
    }
}
