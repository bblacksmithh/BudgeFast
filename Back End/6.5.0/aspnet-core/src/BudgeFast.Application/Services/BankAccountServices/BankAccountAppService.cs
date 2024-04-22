using Abp.Application.Services;
using Abp.Domain.Repositories;
using BudgeFast.Authorization.Users;
using BudgeFast.Domains;
using BudgeFast.Services.BankAccountServices.Dtos;
using BudgeFast.Users;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.BankAccountServices
{
    public class BankAccountAppService:ApplicationService
    {
        private readonly IRepository<BankAccount, Guid> _bankAccountRepository;
        private readonly UserManager _userManager;

        public BankAccountAppService(IRepository<BankAccount, Guid> bankAccountRepository, UserManager userManager)
        {
            _bankAccountRepository = bankAccountRepository;
            _userManager = userManager;
        }

        public async Task<BankAccount> CreateBankAccountAsync(CreateAccountDto input)
        {
            var account = new BankAccount
            {
                User = await _userManager.GetUserByIdAsync(input.UserId),
                AccountName = input.AccountName,
                AccountType = input.AccountType,
                Balance = input.Balance
            };
            await _bankAccountRepository.InsertAsync(account);
            CurrentUnitOfWork.SaveChanges();
            return account;
        }

        public async Task<List<OutputAccountDto>> GetAllBankAccountsAsync()
        {
            var accounts = _bankAccountRepository.GetAllIncluding(x => x.User).ToList();
            var output = new List<OutputAccountDto>(); 
            foreach (var account in accounts)
            {
                output.Add(new OutputAccountDto
                {
                    UserId = account.User.Id,
                    AccountName = account.AccountName,
                    AccountType = account.AccountType,
                    Balance = account.Balance,
                    Id = account.Id,
                });
            }
            return output;
        }

        public async Task<List<OutputAccountDto>> GetAllBankAccountsByUserId(long input)
        {
            var accounts = _bankAccountRepository.GetAllIncluding(x => x.User).Where(x => x.User.Id == input);

            var output = new List<OutputAccountDto>();
            foreach (var account in accounts)
            {
                output.Add(new OutputAccountDto
                {
                    UserId = account.User.Id,
                    AccountName = account.AccountName,
                    AccountType = account.AccountType,
                    Balance = account.Balance,
                    Id = account.Id,
                });
            }
            return output;
        }

        public async Task<BankAccount> UpdateBankAccount(UpdateAccountDto input)
        {
            var account = await _bankAccountRepository.GetAsync(input.Id);
            account.AccountName = input.AccountName;
            account.AccountType = input.AccountType;
            account.Balance = input.Balance;
            _bankAccountRepository.Update(account);
            CurrentUnitOfWork.SaveChanges();

            return account;
        }

        public async Task DeleteBankAccountAsync(Guid bankAccountId)
        {
            await _bankAccountRepository.DeleteAsync(bankAccountId);

        }

    }

}
