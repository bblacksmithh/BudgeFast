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
        private readonly IRepository<BudgetCategory, Guid> _budgetCategoryRepository;
        private readonly IRepository<TransactionCategory, Guid> _transactionCategoryRepository;
        private readonly UserManager _userManager;

        public BudgetAppService(IRepository<Budget, Guid> budgetRepository, IRepository<BudgetCategory, Guid> budgetCategoryRepository, UserManager userManager, IRepository<TransactionCategory, Guid> transactionCategoryRepository)
        {
            _budgetRepository = budgetRepository;
            _budgetCategoryRepository = budgetCategoryRepository;
            _userManager = userManager;
            _transactionCategoryRepository = transactionCategoryRepository;
        }

        public async Task CreateBudget(CreateBudgetDto input)
        {
            if (_budgetRepository.GetAll().Where(x => x.User.Id == input.UserId).Any())
            {
                throw new UserFriendlyException("User already have a budget set up...");
            }
            else
            {
                var budget = new Budget()
                {
                    User = _userManager.GetUserById(input.UserId),
                    BudgetName = input.BudgetName,
                };
                await _budgetRepository.InsertAsync(budget);
                await CurrentUnitOfWork.SaveChangesAsync();

                var categoriesInput = input.Categories;
                foreach ( var category in categoriesInput )
                {
                    var categories = new BudgetCategory()
                    {
                        Budget = budget,
                        TransactionCategory = await _transactionCategoryRepository.GetAsync(category.CategoryId),
                        BudgetAmount = category.Amount,
                    };
                    await _budgetCategoryRepository.InsertAsync(categories);
                    await CurrentUnitOfWork.SaveChangesAsync();
                }
            }
        }

        public async Task<DisplayBudgetDto> GetBudgetForUser(long userId)
        {
            var budget = _budgetRepository.GetAllIncluding(x => x.User)
                                          .Where(x => x.User.Id == userId)
                                          .FirstOrDefault();
            var budgetCategories = _budgetCategoryRepository.GetAllIncluding(x => x.TransactionCategory, x => x.Budget)
                                                            .Where(x => x.Budget.Id == budget.Id)
                                                            .ToList();

            var result = new DisplayBudgetDto();
            result.BudgetName = budget.BudgetName;
            foreach ( var category in budgetCategories )
            {
                result.Categories.Add(new BudgetCategoryOutputDto()
                {
                    CategoryId = category.TransactionCategory.Id,
                    CategoryName = category.TransactionCategory.CategoryName,
                    Amount = category.BudgetAmount,
                });
            }
            return result;
        }

        public async Task DeleteBudgetForUser(long userId)
        {
            var budget = await _budgetRepository.GetAllIncluding(x => x.User)
                                                 .FirstOrDefaultAsync(x => x.User.Id == userId);

            if (budget != null)
            {
                var categories = await _budgetCategoryRepository.GetAllIncluding(x => x.Budget)
                                                                .Where(x => x.Budget.Id == budget.Id)
                                                                .ToListAsync();

                foreach (var category in categories)
                {
                    await _budgetCategoryRepository.DeleteAsync(category);
                }

                await _budgetRepository.DeleteAsync(budget);

                await CurrentUnitOfWork.SaveChangesAsync(); // Assuming CurrentUnitOfWork is a DbContext or similar
            }
        }
    }
}
