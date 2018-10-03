using System.Threading.Tasks;
using DatingApp.API.Models;
using DefaultNamespace;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Register(User user, string password)
        {
            var (passwordHash, passwordSalt) = GenPasswordHashAndSalt(password);

            AssignPasswordHashAndSalt(user, passwordHash, passwordSalt);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private static void AssignPasswordHashAndSalt(User user, byte[] passwordHash, byte[] passwordSalt)
        {
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
        }

        private static (byte[] passwordHash, byte[] passwordSalt) GenPasswordHashAndSalt(string password)
        {
            CreatePasswordHash(password, out var passwordHash, out var passwordSalt);
            return (passwordHash, passwordSalt);
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public Task<User> Login(string username, string password)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> UserExists(string username)
        {
            throw new System.NotImplementedException();
        }
    }
}
