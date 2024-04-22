using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using BudgeFast.Authorization.Users;
using BudgeFast.Domains;
using BudgeFast.Services.TransactionServices.Dtos;
using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.TransactionServices
{
    public class TransactionAppService : ApplicationService
    {
        private readonly IRepository<Transaction, Guid> _transactionRepository;
        private readonly IRepository<BankAccount, Guid> _bankAccountRepository;
        private readonly IRepository<TransactionCategory, Guid> _transactionCategoryRepository;
        private readonly UserManager _userManager;

        public TransactionAppService(IRepository<Transaction, Guid> transactionRepository, UserManager userManager, IRepository<BankAccount, Guid> bankAccountRepository, IRepository<TransactionCategory, Guid> transactionCategoryRepository)
        {
            this._transactionRepository = transactionRepository;
            this._bankAccountRepository = bankAccountRepository;
            this._transactionCategoryRepository = transactionCategoryRepository;
            this._userManager = userManager;
        }

        public async Task<Transaction> CreateTransaction(CreateTransactionDto input)
        {
            var transaction = new Transaction
            {
                User = await _userManager.GetUserByIdAsync(input.UserId),
                BankAccount = _bankAccountRepository.Get(input.BankAccountId),
                TransactionCategory = _transactionCategoryRepository.Get(input.TransactionCategoryId),
                Amount = input.Amount,
                Description = input.Description,
                TransactionDate = input.TransactionDate,
                IsExpense = input.IsExpense,
            };
            if (transaction.IsExpense)
            {
                if (transaction.BankAccount?.Balance > transaction.Amount)
                {
                    transaction.BankAccount.Balance -= transaction.Amount;
                }
                else
                {
                    throw new UserFriendlyException($"Not enough money in {transaction.BankAccount.AccountName}");
                }
            }
            else
            {
                transaction.BankAccount.Balance += transaction.Amount;
            }
            await _bankAccountRepository.UpdateAsync(transaction.BankAccount);
            await _transactionRepository.InsertAsync(transaction);
            CurrentUnitOfWork.SaveChanges();
            return transaction;
        }

        public async Task<List<OutputTransactionDto>> GetAllExpensesForUser(long UserId)
        {
            var expenses = _transactionRepository.GetAllIncluding(x => x.User, x => x.BankAccount, x => x.TransactionCategory).Where(x => x.User.Id == UserId && x.IsExpense == true).ToList();
            var result = new List<OutputTransactionDto>();
            foreach (var expense in expenses)
            {
                result.Add(new OutputTransactionDto
                {
                    Id = expense.Id,
                    BankAccountId = expense.BankAccount.Id,
                    TransactionCategory = expense.TransactionCategory.CategoryName,
                    Amount = expense.Amount,
                    Description = expense.Description,
                    TransactionDate = expense.TransactionDate,
                });
            }
            return result;
        }

        public async Task<List<OutputTransactionDto>> GetAllExpensesForBankAccount(Guid accountId)
        {
            var expenses = _transactionRepository.GetAllIncluding(x => x.BankAccount, x => x.TransactionCategory).Where(x => x.BankAccount.Id == accountId && x.IsExpense == true).ToList();
            var result = new List<OutputTransactionDto>();
            foreach (var expense in expenses)
            {
                result.Add(new OutputTransactionDto
                {
                    Id = expense.Id,
                    BankAccountId = expense.BankAccount.Id,
                    TransactionCategory = expense.TransactionCategory.CategoryName,
                    Amount = expense.Amount,
                    Description = expense.Description,
                    TransactionDate = expense.TransactionDate,
                });
            }
            return result;
        }

        public async Task<List<OutputTransactionDto>> GetAllIncomeForUser(long UserId)
        {
            var expenses = _transactionRepository.GetAllIncluding(x => x.User, x => x.BankAccount, x => x.TransactionCategory).Where(x => x.User.Id == UserId && x.IsExpense == false).ToList();
            var result = new List<OutputTransactionDto>();
            foreach (var expense in expenses)
            {
                result.Add(new OutputTransactionDto
                {
                    Id = expense.Id,
                    BankAccountId = expense.BankAccount.Id,
                    TransactionCategory = expense.TransactionCategory.CategoryName,
                    Amount = expense.Amount,
                    Description = expense.Description,
                    TransactionDate = expense.TransactionDate,
                });
            }
            return result;
        }

        public async Task<List<OutputTransactionDto>> GetAllIncomeForBankAccount(Guid accountId)
        {
            var expenses = _transactionRepository.GetAllIncluding(x => x.BankAccount, x => x.TransactionCategory).Where(x => x.BankAccount.Id == accountId && x.IsExpense == false).ToList();
            var result = new List<OutputTransactionDto>();
            foreach (var expense in expenses)
            {
                result.Add(new OutputTransactionDto
                {
                    Id = expense.Id,
                    BankAccountId = expense.BankAccount.Id,
                    TransactionCategory = expense.TransactionCategory.CategoryName,
                    Amount = expense.Amount,
                    Description = expense.Description,
                    TransactionDate = expense.TransactionDate,
                });
            }
            return result;
        }
    }
}
