using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(DataContext context) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<AppUser>> GetUsers()
    {
        var users = context.Users.ToList();

        return users;
    }

    [HttpGet("{id}")] //api/user/3
    public ActionResult<AppUser> GetUsers(int id)
    {
        var user = context.Users.FirstOrDefault(u => u.Id == id);

        if (user == null) return NotFound();

        return user;
    }
}
