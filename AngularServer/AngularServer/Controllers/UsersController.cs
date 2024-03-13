using Microsoft.AspNetCore.Mvc;
using System;
using System.Xml.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public static List<User> Users = new List<User>
        {
            new User("Sari","Ezra 5 Bnei Brak","sari413144@gmail.com","sari1234"),
            new User("Chani","Breslev 8 Bnei Brak","chani8795@gmail.com","chani1234"),
            new User("Ayala", "Nechemya 10 Bnei Brak", "ayala652653@gmail.com", "ayala1234"),
            new User("Racheli", "Lando 17 Bnei Brak", "racheli5653@gmail.com", "racheli1234")
        };

        // GET: api/<UsersController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Users;
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return Users.Find(x => x.id == id);
        }

        
        [HttpPost]
        public void Post([FromBody] User value)
        {
            Users.Add(new User(value.name, value.address, value.email, value.password));
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User NewUser)
        {
            var user = Users.Find(x => x.id == id);
            if (user != null)
            {
                user.address = NewUser.address;
                user.password = NewUser.password;
                user.name = NewUser.name;
                user.email = NewUser.email;
            }
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var user = Users.Find(x => x.id == id);
            if (user != null) { Users.Remove(user); }
        }
    }
}
