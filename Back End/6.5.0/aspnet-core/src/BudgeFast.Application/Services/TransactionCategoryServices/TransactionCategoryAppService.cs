using Abp.Application.Services;
using Abp.Domain.Repositories;
using BudgeFast.Domains;
using BudgeFast.Services.TransactionCategoryServices.Dtos;
using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.TransactionCategoryServices
{
    public class TransactionCategoryAppService: ApplicationService
    {
        private readonly IRepository<TransactionCategory, Guid> _transactionCategoryRepository;
        private readonly IRepository<Transaction, Guid> _transactionRepository;

        public TransactionCategoryAppService(IRepository<TransactionCategory, Guid> transactionCategoryRepository, IRepository<Transaction, Guid> transactionRepository)
        {
            _transactionCategoryRepository = transactionCategoryRepository;
            _transactionRepository = transactionRepository;
        }

        public async Task<TransactionCategory> CreateCategory(TransactionCategoryDto input)
        {
            var category = new TransactionCategory
            {
                Id = input.Id,
                CategoryName = input.CategoryName,
                IsExpense = input.IsExpense,
            };

            await _transactionCategoryRepository.InsertAsync(category);
            return category;
        }

        public async Task<List<TransactionCategory>> GetAllCategories()
        {
            var categories = _transactionCategoryRepository.GetAll().ToList();
            return categories;
        }

        public async Task<List<TransactionCategory>> GetAllExpenseCategories()
        {
            var categories = _transactionCategoryRepository.GetAll().Where(x => x.IsExpense == true).ToList();
            return categories;
        }

        public async Task<List<TransactionCategory>> GetAllIncomeCategories()
        {
            var categories = _transactionCategoryRepository.GetAll().Where(x => x.IsExpense == false).ToList();
            return categories;
        }

        //public async Task<List<CategoryTotalForMonthOutputDto>> GetTotalExpensesPerCategoryPerMonth(CategoryTotalForMonthInputDto input)
        //{
        //    var transactions = _transactionRepository.GetAllIncluding(x => x.TransactionCategory, x => x.User, x => x.BankAccount).Where(x => x.User.Id == input.UserID && x.TransactionDate.Year == input.MonthOf.Year && x.TransactionDate.Month == input.MonthOf.Month).ToList();
        //    var result = new List<CategoryTotalForMonthOutputDto>();
        //}

        public async Task DeleteCtegory(Guid id)
        {
            await _transactionCategoryRepository.DeleteAsync(id);
        }
    }
}
