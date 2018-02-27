using Microsoft.EntityFrameworkCore;

namespace POS.Persistance
{
    public class PosDbContext : DbContext
    {
        public PosDbContext(DbContextOptions<PosDbContext> options)
          : base(options)
        {
        }
    }
}