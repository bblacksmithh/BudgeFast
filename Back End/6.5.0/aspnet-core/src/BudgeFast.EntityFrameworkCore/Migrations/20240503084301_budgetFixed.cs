using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgeFast.Migrations
{
    public partial class budgetFixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_AbpUsers_UserId",
                table: "Budgets");

            migrationBuilder.DropTable(
                name: "BudgetCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Budgets",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "BudgetName",
                table: "Budgets");

            migrationBuilder.RenameTable(
                name: "Budgets",
                newName: "Budget");

            migrationBuilder.RenameIndex(
                name: "IX_Budgets_UserId",
                table: "Budget",
                newName: "IX_Budget_UserId");

            migrationBuilder.AddColumn<decimal>(
                name: "BudgetAmount",
                table: "Budget",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<Guid>(
                name: "TransactionCategoryId",
                table: "Budget",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Budget",
                table: "Budget",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Budget_TransactionCategoryId",
                table: "Budget",
                column: "TransactionCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Budget_AbpUsers_UserId",
                table: "Budget",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Budget_TransactionCategories_TransactionCategoryId",
                table: "Budget",
                column: "TransactionCategoryId",
                principalTable: "TransactionCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budget_AbpUsers_UserId",
                table: "Budget");

            migrationBuilder.DropForeignKey(
                name: "FK_Budget_TransactionCategories_TransactionCategoryId",
                table: "Budget");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Budget",
                table: "Budget");

            migrationBuilder.DropIndex(
                name: "IX_Budget_TransactionCategoryId",
                table: "Budget");

            migrationBuilder.DropColumn(
                name: "BudgetAmount",
                table: "Budget");

            migrationBuilder.DropColumn(
                name: "TransactionCategoryId",
                table: "Budget");

            migrationBuilder.RenameTable(
                name: "Budget",
                newName: "Budgets");

            migrationBuilder.RenameIndex(
                name: "IX_Budget_UserId",
                table: "Budgets",
                newName: "IX_Budgets_UserId");

            migrationBuilder.AddColumn<string>(
                name: "BudgetName",
                table: "Budgets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Budgets",
                table: "Budgets",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "BudgetCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BudgetAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BudgetId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    TransactionCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BudgetCategories_Budgets_BudgetId",
                        column: x => x.BudgetId,
                        principalTable: "Budgets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BudgetCategories_TransactionCategories_TransactionCategoryId",
                        column: x => x.TransactionCategoryId,
                        principalTable: "TransactionCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetCategories_BudgetId",
                table: "BudgetCategories",
                column: "BudgetId");

            migrationBuilder.CreateIndex(
                name: "IX_BudgetCategories_TransactionCategoryId",
                table: "BudgetCategories",
                column: "TransactionCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_AbpUsers_UserId",
                table: "Budgets",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
