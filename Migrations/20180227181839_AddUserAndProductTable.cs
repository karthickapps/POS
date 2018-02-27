using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace POS.Migrations
{
    public partial class AddUserAndProductTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(35)", maxLength: 35, nullable: false),
                    Password = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false),
                    Role = table.Column<int>(type: "int4", nullable: false),
                    UserName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(35)", maxLength: 35, nullable: false),
                    Description = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp", nullable: false),
                    UpdatedBy = table.Column<string>(type: "varchar(35)", maxLength: 35, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Users_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CreatedBy",
                table: "Products",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Products_UpdatedBy",
                table: "Products",
                column: "UpdatedBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
