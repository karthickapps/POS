using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace POS.Core
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;

        int SaveChanges();
    }

    public interface IUnitOfWork<TContext> : IUnitOfWork where TContext : DbContext
    {
        TContext Context { get; }

    }
}