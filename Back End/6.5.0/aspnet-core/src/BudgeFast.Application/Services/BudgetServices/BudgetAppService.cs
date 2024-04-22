using Abp.Application.Services;
using Abp.Domain.Repositories;
using BudgeFast.Authorization.Users;
using BudgeFast.Domains;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager _userManager;

        public BudgetAppService(IRepository<Budget, Guid> budgetRepository, IRepository<BudgetCategory, Guid> budgetCategoryRepository, UserManager userManager)
        {
            _budgetRepository = budgetRepository;
            _budgetCategoryRepository = budgetCategoryRepository;
            _userManager = userManager;
        }

        public async Task CreateBudget()
        {
            if (_budgetRepository.Get)
        }
    }
}
