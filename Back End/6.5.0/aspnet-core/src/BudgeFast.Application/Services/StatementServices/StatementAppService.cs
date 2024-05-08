using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Net.Mail;
using BudgeFast.Authorization.Users;
using BudgeFast.Domains;
using BudgeFast.Services.StatementServices.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.StatementServices
{
    public class StatementAppService: ApplicationService
    {
        private readonly IRepository<Statement, Guid> _statementRepository;
        private readonly IRepository<Transaction, Guid> _transactionRepository;
        private readonly UserManager _userManager;
        //private readonly IEmailSender _emailSender;

        public StatementAppService(IRepository<Statement, Guid> statementRepository, IRepository<Transaction, Guid> transactionRepository, UserManager userManager, IEmailSender emailSender)
        {
            _statementRepository = statementRepository;
            _transactionRepository = transactionRepository;
            _userManager = userManager;
            //_emailSender = emailSender;
        }

        public async Task<List<StatementOutputDto>> GetAllStatementsForUser(long userId)
        {
            var statements = await _statementRepository
                .GetAllIncluding(x => x.User)
                .Where(x => x.User.Id == userId).OrderByDescending(x => x.MonthOf)
                .ToListAsync();

            var statementDtos = new List<StatementOutputDto>();

            foreach (var statement in statements)
            {
                var transactionDtos = await _transactionRepository
                    .GetAllIncluding(t => t.User, t => t.BankAccount, t => t.TransactionCategory)
                    .Where(t => t.User.Id == userId && t.StatementId == statement.Id).OrderByDescending(x => x.TransactionDate)
                    .Select(transaction => new TransactionOutputDto
                    {
                        Id = transaction.Id,
                        Description = transaction.Description,
                        Amount = transaction.Amount,
                        Category = transaction.TransactionCategory.CategoryName,
                        AccountName = transaction.BankAccount.AccountName,
                        isExpense = transaction.IsExpense,
                        transactionDate = transaction.TransactionDate,
                    }).ToListAsync();

                var statementDto = new StatementOutputDto
                {
                    Id = statement.Id,
                    ForUser = statement.User.UserName.ToString(),
                    MonthOf = statement.MonthOf,
                    OpeningBalance = statement.StartingBalance,
                    NetChange = statement.NetChange,
                    ClosingBalance = statement.EndingBalance,
                    Transactions = transactionDtos,
                };

                statementDtos.Add(statementDto);
            }

            return statementDtos;
        }

        public async Task<List<ForecastDto>> ForecastNetWorth(long userId)
        {
            var historicalData = await _statementRepository.GetAllIncluding(x => x.User)
                                                           .Where(x => x.User.Id == userId)
                                                           .OrderBy(x => x.MonthOf)
                                                           .ToListAsync();
            if (historicalData.Any())
            {
                // Ensure we have at least 3 months of historical data
                int historicalMonths = Math.Min(historicalData.Count, 3);

                // Take the last 3 months of historical data
                var truncatedHistoricalData = historicalData.Skip(historicalData.Count - historicalMonths).ToList();

                // Forecast the next 4 months (starting from the next month after the last actual value)
                List<decimal> forecastedNetWorth = ExponentialSmoothingForecast(truncatedHistoricalData, 0.8, 6);

                // Prepare ForecastDto list for returning data
                List<ForecastDto> forecasts = new List<ForecastDto>();

                // Generate data with labels (months)
                DateTime currentDate = DateTime.Now.AddMonths(1); // Start from next month
                for (int i = 0; i < 6; i++)
                {
                    forecasts.Add(new ForecastDto
                    {
                        ForecastedValue = forecastedNetWorth[i],
                        Label = currentDate.AddMonths(i).ToString("MMM yyyy"),
                        Date = currentDate.AddMonths(i)
                    });
                }

                return forecasts;
            }
            else
            {
                return null;
            }

        }

        private List<decimal> ExponentialSmoothingForecast(List<Statement> historicalData, double alpha, int futureMonths)
        {
            List<decimal> smoothedValues = new List<decimal>();

            // Initialize the smoothed values with historical data
            foreach (var statement in historicalData)
            {
                smoothedValues.Add(statement.EndingBalance);
            }

            // Apply exponential smoothing to forecast future months
            for (int i = 0; i < futureMonths; i++)
            {
                // Calculate the smoothed value for the next month
                decimal smoothedValue = (decimal)alpha * smoothedValues.Last() + (1 - (decimal)alpha) * smoothedValues[smoothedValues.Count - 2];

                smoothedValues.Add(smoothedValue);
            }

            return smoothedValues;
        }

        //public async Task DoItAsync(long userId,string subject, string body)
        //{
        //    var user = _userManager.GetUserById(userId);
        //    await _emailSender.SendAsync(
        //        $"{user.EmailAddress}",     // target email address
        //        $"{subject}",         // subject
        //        $"{body}"  // email body
        //    );
        //}
    }
}
