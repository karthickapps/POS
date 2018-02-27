using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Newtonsoft.Json;
using POS.Core.Models;
using POS.Persistance;

namespace POS.Extensions
{
    public static class DbContextExtension
    {

        public static bool AllMigrationsApplied(this PosDbContext context)
        {
            var applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);

            var total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }

        public static void EnsureSeeded(this PosDbContext context)
        {
            if (!context.Users.Any())
            {
                var types = JsonConvert.DeserializeObject<List<User>>(File.ReadAllText("seed" + Path.DirectorySeparatorChar + "users.json"));
                context.AddRange(types);
                context.SaveChanges();
            }

            if (!context.Products.Any())
            {
                var types = JsonConvert.DeserializeObject<List<Product>>(File.ReadAllText("seed" + Path.DirectorySeparatorChar + "products.json"));
                context.AddRange(types);
                context.SaveChanges();
            }
        }
    }
}