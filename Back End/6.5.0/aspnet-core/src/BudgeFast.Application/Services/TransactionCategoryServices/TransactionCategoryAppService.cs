﻿using Abp.Application.Services;
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

        public TransactionCategoryAppService(IRepository<TransactionCategory, Guid> transactionCategoryRepository)
        {
            _transactionCategoryRepository = transactionCategoryRepository;
        }

        public async Task<TransactionCategory> CreateCategory(CreateTransactionCategoryDto input)
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

        public async Task DeleteCtegory(Guid id)
        {
            await _transactionCategoryRepository.DeleteAsync(id);
        }
    }
}