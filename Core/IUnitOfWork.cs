using System.Threading.Tasks;

namespace POS.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}