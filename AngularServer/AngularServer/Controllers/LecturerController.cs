using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LecturerController : ControllerBase
    {
        public static List<Lecturer> lecturers = new List<Lecturer>
        {
            new Lecturer("Aviva","Ezra 5 Bnei Brak","aviva413144@gmail.com","aviva1234"),
            new Lecturer("Zeava","Breslev 8 Bnei Brak","zeava8795@gmail.com","zeava1234"),
            new Lecturer("Chaya", "Nechemya 10 Bnei Brak", "chaya652653@gmail.com", "chaya1234"),
            new Lecturer("Noa", "Lando 17 Bnei Brak", "noa5653@gmail.com", "noa1234")
        };
        // GET: api/<LecturerController>
        [HttpGet]
        public IEnumerable<Lecturer> Get()
        {
            return lecturers;
        }

        // GET api/<LecturerController>/5
        [HttpGet("{id}")]
        public Lecturer Get(int id)
        {
            return lecturers.Find(x => x.id == id);
        }

        // POST api/<LecturerController>
        [HttpPost]
        public void Post([FromBody] Lecturer lecturer)
        {
            lecturers.Add(new Lecturer(lecturer.name, lecturer.address, lecturer.email, lecturer.password));
        }

        // PUT api/<LecturerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Lecturer newLecturer)
        {
            var lecturer = lecturers.Find(x => x.id == id);
            if (lecturer != null)
            {
                lecturer.address = newLecturer.address;
                lecturer.password = newLecturer.password;
                lecturer.name = newLecturer.name;
                lecturer.email = newLecturer.email;
            }
        }

        // DELETE api/<LecturerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var lecturer = lecturers.Find(x => x.id == id);
            if (lecturer != null) { lecturers.Remove(lecturer); }
        }
    }
}
