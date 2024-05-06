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

        public BudgetAppService(IRepository<Budget, Guid> budgetRepository, IRepository<Budget, Guid> budgetCategoryRepository, UserManager userManager, IRepository<TransactionCategory, Guid> transactionCategoryRepository)
        {
            _budgetRepository = budgetRepository;
            _userManager = userManager;
            _transactionCategoryRepository = transactionCategoryRepository;
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

        public async Task DeleteBudgetForUser(Guid budgetId)
        {
            var budget = await _budgetRepository.GetAsync(budgetId);
            await _budgetRepository.DeleteAsync(budget);
        }
    }
}
