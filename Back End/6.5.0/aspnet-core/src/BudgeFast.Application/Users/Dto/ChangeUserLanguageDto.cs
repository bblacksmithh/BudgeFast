using System.ComponentModel.DataAnnotations;

namespace BudgeFast.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}