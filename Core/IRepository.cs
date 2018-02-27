using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;

namespace POS.Core
{
    public interface IRepository<T> where T : class
    {
        T Single(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            bool disableTracking = true);

        IEnumerable<T> Get();

        IEnumerable<T> Get(Expression<Func<T, bool>> predicate);

        void Add(T entity);

        void Delete(T entity);

        void Delete(object id);

        void Delete(params T[] entities);

        void Delete(IEnumerable<T> entities);

        void Update(T entity);

        void Update(params T[] entities);

        void Update(IEnumerable<T> entities);
    }
}