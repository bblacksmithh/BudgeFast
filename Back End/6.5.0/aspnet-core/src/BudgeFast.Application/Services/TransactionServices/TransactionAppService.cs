using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Timing;
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
                .Where(x => x.User.Id == input.UserId && x.MonthOf.Year == transaction.TransactionDate.Year && x.MonthOf.Month == transaction.TransactionDate.Month)
                .Any())
            {
                var statement = _statementRepository.GetAllIncluding(x => x.User)
                    .Where(x => x.User.Id == input.UserId && x.MonthOf.Month == transaction.TransactionDate.Month && x.MonthOf.Year == transaction.TransactionDate.Year).FirstOrDefault();
                if (transaction.IsExpense == true)
                {
                    statement.NetChange -= transaction.Amount;
                }
                else { statement.NetChange += transaction.Amount; }
                statement.EndingBalance = statement.StartingBalance + statement.NetChange;
                transaction.StatementId = statement.Id;

                await _statementRepository.UpdateAsync(statement);
                await CurrentUnitOfWork.SaveChangesAsync();
            }
            else
            {
                var statement = new Statement();
                statement.User = _userManager.GetUserById(input.UserId);
                statement.MonthOf = transaction.TransactionDate;
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
                await _statementRepository.InsertAsync(statement);
                await CurrentUnitOfWork.SaveChangesAsync();
                statement = _statementRepository.GetAllIncluding(x => x.User).Where(x => x.MonthOf.Year == transaction.TransactionDate.Year && x.MonthOf.Month == transaction.TransactionDate.Month && x.User.Id == transaction.User.Id).FirstOrDefault();
                transaction.StatementId = statement.Id;

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
            var expenses = _transactionRepository.GetAllIncluding(x => x.User, x => x.BankAccount, x => x.TransactionCategory).Where(x => x.User.Id == UserId && x.IsExpense == true).OrderByDescending(x => x.TransactionDate).ToList();
            var result = new List<OutputTransactionDto>();
            foreach (var expense in expenses)
            {
                result.Add(new OutputTransactionDto
                {
                    Id = expense.Id,
                    AccountName = expense.BankAccount.AccountName,
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
                    AccountName = expense.BankAccount.AccountName,
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
            var expenses = _transactionRepository.GetAllIncluding(x => x.User, x => x.BankAccount, x => x.TransactionCategory).Where(x => x.User.Id == UserId && x.IsExpense == false).OrderByDescending(x => x.TransactionDate).ToList();
            var result = new List<OutputTransactionDto>();
            foreach (var expense in expenses)
            {
                result.Add(new OutputTransactionDto
                {
                    Id = expense.Id,
                    AccountName = expense.BankAccount.AccountName,
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
                    AccountName = expense.BankAccount.AccountName,
                    TransactionCategory = expense.TransactionCategory.CategoryName,
                    Amount = expense.Amount,
                    Description = expense.Description,
                    TransactionDate = expense.TransactionDate,
                });
            }
            return result;
        }

        public async Task<List<IncomeVsExpensesDto>> GetIncomeVsExpenses(long userId)
        {
            var result = new List<IncomeVsExpensesDto>();
            for (int i = 5; i >= 0; i--)
            {
                decimal totalIncome = 0;
                decimal totalExpenses = 0;
                var transactionsInMonth = _transactionRepository.GetAllIncluding(x => x.User)
                    .Where(x => x.TransactionDate.Month == DateTime.Now.AddMonths(-i).Month && x.TransactionDate.Year == DateTime.Now.AddMonths(-i).Year && x.User.Id == userId)
                    .ToList();
                foreach (var transaction in transactionsInMonth)
                {
                    if (transaction.IsExpense == true)
                    {
                        totalExpenses += transaction.Amount;
                    }
                    else
                    {
                        totalIncome += transaction.Amount;
                    }
                }
                var monthResults = new IncomeVsExpensesDto();
                monthResults.Income = totalIncome;
                monthResults.Expenses = totalExpenses;
                monthResults.Year = DateTime.Now.AddMonths(-i).Year.ToString();
                monthResults.Month = DateTime.Now.AddMonths(-i).Month.ToString();
                result.Add(monthResults);
            }
            return result;
        } 

        public async Task DeleteTransaction(Guid id)
        {
            var transaction = _transactionRepository.GetAllIncluding(x => x.BankAccount).Where(x => x.Id == id).FirstOrDefault();
            var statement = _statementRepository.GetAll().Where(x => x.Id == transaction.StatementId).FirstOrDefault();

            if (transaction.TransactionDate.Year >= DateTime.Now.Year && transaction.TransactionDate.Month >= DateTime.Now.Month)
            {
                if (transaction.IsExpense ==  true)
                {
                    //statement adjustments
                    statement.NetChange += transaction.Amount;
                    statement.EndingBalance = statement.StartingBalance + statement.NetChange;
                    await _statementRepository.UpdateAsync(statement);
                
                    //bank account adjustments
                    transaction.BankAccount.Balance += transaction.Amount;
                    await _bankAccountRepository.UpdateAsync(transaction.BankAccount);
                }
                else
                {
                    if (transaction.BankAccount.Balance > transaction.Amount)
                    {
                        //statement adjustments
                        statement.NetChange += transaction.Amount;
                        statement.EndingBalance = statement.StartingBalance + statement.NetChange;
                        await _statementRepository.UpdateAsync(statement);

                        //bank account adjustment
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
            else
            {
                throw new UserFriendlyException("Can not delete a transaction older than 1 month");
            }
        }
    }
}
