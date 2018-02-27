using System.Threading.Tasks;
using POS.Core;

namespace POS.Persistance
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PosDbContext context;

        public UnitOfWork(PosDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}