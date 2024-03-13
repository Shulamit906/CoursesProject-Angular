using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static List<Category> categories = new List<Category>
        {
            new Category("Art","../../../../assets/icons/art.jpg"),
            new Category("Sport","../../../../assets/icons/sports.png"),
            new Category("Languages","../../../../assets/icons/Languages.png")

        };
        // GET: api/<CategoryController>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            return categories.Find(x => x.id == id);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public void Post([FromBody] Category category)
        {
            categories.Add(new Category(category.name,category.iconPath));  
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Category newCategory)
        {
            var category = categories.Find(x => x.id == id);
            if (category != null)
            {
                category.name = newCategory.name;
                category.iconPath = newCategory.iconPath;
            }
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var category = categories.Find(x => x.id == id);
            if (category != null) { categories.Remove(category); }
        }
    }
}
