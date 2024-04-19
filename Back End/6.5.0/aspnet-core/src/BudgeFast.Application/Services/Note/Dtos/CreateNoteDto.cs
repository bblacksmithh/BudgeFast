using Abp.Application.Services.Dto;
using BudgeFast.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgeFast.Services.Note.Dtos
{
    public class CreateNoteDto: FullAuditedEntityDto<Guid>
    {
        public User User { get; set; }
        public string Content { get; set; }
    }
}
