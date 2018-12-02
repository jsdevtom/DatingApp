using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsersAsync()
        {
            var users = await _repository.GetUsersAsync();

            var mappedUsers = _mapper.Map<IEnumerable<UserForListDto>>(users);
            
            return Ok(mappedUsers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserAsync(int id)
        {
            var user = await _repository.GetUserAsync(id);

            var mappedUser = _mapper.Map<UserForDetailedDto>(user);
            
            return Ok(mappedUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserAsync(int id, UserForUpdateDto userForUpdateDto)
        {
            var isRequestUserUpdatingUser = id == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            if (!isRequestUserUpdatingUser)
                return Unauthorized();

            var userFromRepo = await _repository.GetUserAsync(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repository.SaveAllAsync())
            {
                return NoContent();
            }

            throw new Exception($"Updating user {id} failed on save");
        }
        
    }
}
