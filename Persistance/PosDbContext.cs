using Microsoft.EntityFrameworkCore;
using POS.Core.Models;

namespace POS.Persistance
{
    public class PosDbContext : DbContext
    {
        public PosDbContext(DbContextOptions<PosDbContext> options)
          : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Product> Products { get; set; }
    }
}