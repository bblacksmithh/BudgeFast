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
        private readonly IRepository<Statement, Guid> _statementRepository;
        private readonly UserManager _userManager;

        public TransactionAppService(IRepository<Transaction, Guid> transactionRepository, UserManager userManager, IRepository<BankAccount, Guid> bankAccountRepository, IRepository<TransactionCategory, Guid> transactionCategoryRepository, IRepository<Statement, Guid> statementRepository)
        {
            _transactionRepository = transactionRepository;
            _bankAccountRepository = bankAccountRepository;
            _transactionCategoryRepository = transactionCategoryRepository;
            _statementRepository = statementRepository;
            _userManager = userManager;
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

            if (_statementRepository.GetAllIncluding(x => x.User)
                .Where(x => x.User.Id == input.UserId && x.MonthOf.Year == transaction.TransactionDate.Year && x.MonthOf.Month == transaction.TransactionDate.Year)
                .Any())
            {
                var statement = _statementRepository.GetAllIncluding(x => x.User)
                    .Where(x => x.User.Id == input.UserId && x.MonthOf.Month == transaction.TransactionDate.Month && x.MonthOf.Year == transaction.TransactionDate.Year).FirstOrDefault();
                if (transaction.IsExpense == true)
                {
                    statement.NetChange -= transaction.Amount;
                }
                else { statement.NetChange += transaction.Amount; }
                statement.EndingBalance += statement.NetChange;
                transaction.StatementId = statement.Id;

                await _statementRepository.UpdateAsync(statement);
                await CurrentUnitOfWork.SaveChangesAsync();
            }
            else
            {
                var statement = new Statement();
                statement.StartingBalance = 0;
                statement.NetChange = 0;
                var bankAccountBalances = _bankAccountRepository.GetAllIncluding(x => x.User)
                    .Where(x => x.User.Id == input.UserId).Select(x => x.Balance)
                    .ToList();
                foreach (var balance in bankAccountBalances)
                {
                    statement.StartingBalance += balance;
                }
                statement.EndingBalance = statement.StartingBalance;
                if (transaction.IsExpense == true)
                {
                    statement.NetChange -= transaction.Amount;
                }
                else { statement.NetChange += transaction.Amount;}
                statement.EndingBalance += statement.NetChange;
                transaction.StatementId = statement.Id;

                await _statementRepository.InsertAsync(statement);
                await CurrentUnitOfWork.SaveChangesAsync();
            }

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

        public async Task DeleteTransaction(Guid id)
        {
            var transaction = _transactionRepository.GetAllIncluding(x => x.BankAccount).Where(x => x.Id == id).FirstOrDefault();

            if (transaction.IsExpense ==  true)
            {
                transaction.BankAccount.Balance += transaction.Amount;
                await _bankAccountRepository.UpdateAsync(transaction.BankAccount);
            }
            else
            {
                if (transaction.BankAccount.Balance < transaction.Amount)
                {
                    transaction.BankAccount.Balance -= transaction.Amount;
                    await _bankAccountRepository.UpdateAsync(transaction.BankAccount);
                }
                else
                {
                    throw new UserFriendlyException("Bank Account cannot have a negative balance");
                }
            }
            _transactionRepository.Delete(transaction);
        }
    }
}
