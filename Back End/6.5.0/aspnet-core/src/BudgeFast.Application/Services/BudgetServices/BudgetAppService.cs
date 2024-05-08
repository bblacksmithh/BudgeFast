using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using BudgeFast.Authorization.Users;
using BudgeFast.Domains;
using BudgeFast.Services.BudgetServices.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BudgetServices
{
    public class BudgetAppService: ApplicationService
    {
        private readonly IRepository<Budget, Guid> _budgetRepository;
        private readonly IRepository<TransactionCategory, Guid> _transactionCategoryRepository;
        private readonly UserManager _userManager;
        private readonly IRepository<Transaction, Guid> _transactionRepository; 
        public BudgetAppService(IRepository<Budget, Guid> budgetRepository, IRepository<Budget, Guid> budgetCategoryRepository, UserManager userManager, IRepository<TransactionCategory, Guid> transactionCategoryRepository, IRepository<Transaction, Guid> transactionRepository)
        {
            _budgetRepository = budgetRepository;
            _userManager = userManager;
            _transactionCategoryRepository = transactionCategoryRepository;
            _transactionRepository=transactionRepository;
        }

        public async Task AddBudget(AddBudget input)
        {
            if (_budgetRepository.GetAllIncluding(x => x.User, x => x.TransactionCategory)
                .Where(x => x.User.Id == input.UserId && x.TransactionCategory.Id == input.CategoryId).Any())
            {
                throw new UserFriendlyException("Budget Already Exists");
            }
            else
            {
                var budget = new Budget()
                {
                    TransactionCategory = await _transactionCategoryRepository.GetAsync(input.CategoryId),
                    BudgetAmount = input.Amount,
                    User = _userManager.GetUserById(input.UserId),
                };  
                await _budgetRepository.InsertAsync(budget);
                CurrentUnitOfWork.SaveChanges();
            }
        }

        public async Task<List<DisplayBudgetDto>> GetBudgetsForUser(long userId)
        {
            var budgets = await _budgetRepository.GetAllIncluding(x => x.User, x => x.TransactionCategory)
                                          .Where(x => x.User.Id == userId)
                                          .ToListAsync();

            var result = new List<DisplayBudgetDto>();
            foreach (var budget in budgets)
            {
                var budgetDto = new DisplayBudgetDto();
                budgetDto.Amount = budget.BudgetAmount;
                budgetDto.Category = budget.TransactionCategory.CategoryName;
                budgetDto.Id = budget.Id;
                result.Add(budgetDto);
            }
            return result;
        }

        public async Task<List<DisplayBudgetDto>> GetBudgetsAndSpendingForUser(long userId)
        {
            var budgets = await _budgetRepository.GetAllIncluding(x => x.User, x => x.TransactionCategory)
                                                .Where(x => x.User.Id == userId)
                                                .ToListAsync();

            var transactions = await _transactionRepository.GetAllIncluding(x => x.User, x => x.TransactionCategory)
                                                          .Where(x => x.User.Id == userId && x.IsExpense == true && x.TransactionDate.Month == DateTime.Now.Month && x.TransactionDate.Year == DateTime.Now.Year)
                                                          .ToListAsync();

            var categorySpending = transactions.GroupBy(t => t.TransactionCategory)
                                               .Select(group => new
                                               {
                                                   Category = group.Key.CategoryName,
                                                   TotalSpending = group.Sum(t => t.Amount)
                                               })
                                               .ToList();

            var result = new List<DisplayBudgetDto>();
            foreach (var budget in budgets)
            {
                var budgetDto = new DisplayBudgetDto();
                budgetDto.Amount = budget.BudgetAmount;
                budgetDto.Category = budget.TransactionCategory.CategoryName;
                budgetDto.Id = budget.Id;
                result.Add(budgetDto);
            }

            // Add non-budgeted categories (where spending occurred but no explicit budget)
            foreach (var category in categorySpending)
            {
                if (!result.Any(b => b.Category == category.Category))
                {
                    result.Add(new DisplayBudgetDto
                    {
                        Amount = 0, // No explicit budget
                        Category = category.Category,
                        /*Id = null*/ // Assign a unique ID (or use a different approach)
                    });
                }
            }

            return result;
        }

        public async Task DeleteBudgetForUser(Guid budgetId)
        {
            var budget = await _budgetRepository.GetAsync(budgetId);
            await _budgetRepository.DeleteAsync(budget);
        }
    }
}
