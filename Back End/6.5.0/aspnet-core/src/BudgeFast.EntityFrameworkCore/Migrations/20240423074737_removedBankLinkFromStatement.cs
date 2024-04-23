using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgeFast.Migrations
{
    public partial class removedBankLinkFromStatement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statements_BankAccounts_BankAccountId",
                table: "Statements");

            migrationBuilder.DropIndex(
                name: "IX_Statements_BankAccountId",
                table: "Statements");

            migrationBuilder.DropColumn(
                name: "BankAccountId",
                table: "Statements");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BankAccountId",
                table: "Statements",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Statements_BankAccountId",
                table: "Statements",
                column: "BankAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Statements_BankAccounts_BankAccountId",
                table: "Statements",
                column: "BankAccountId",
                principalTable: "BankAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
