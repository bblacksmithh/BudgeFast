using System.Threading.Tasks;
using BudgeFast.Models.TokenAuth;
using BudgeFast.Web.Controllers;
using Shouldly;
using Xunit;

namespace BudgeFast.Web.Tests.Controllers
{
    public class HomeController_Tests: BudgeFastWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}