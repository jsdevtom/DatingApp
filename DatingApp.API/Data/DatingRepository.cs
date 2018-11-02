using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;

        public DatingRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            // without this async await, C# compiler won't add its "magic" to do the conversion from an object to a Task<T> returning that object. See https://stackoverflow.com/a/38579407/5950725
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        public Task<User> GetUserAsync(int id)
        {
            return _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
