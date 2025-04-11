using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(DataContext context) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await context.Users.ToListAsync();

        return users;
    }

    [HttpGet("{id:int}")] //api/user/3
    public async Task<ActionResult<AppUser>> GetUsers(int id)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user == null) return NotFound();

        return user;
    }
}
