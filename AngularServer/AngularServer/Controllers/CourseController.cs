using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        public static List<Course> courses = new List<Course>
        {
            new Course("English", 3,10,new DateTime(), new string[] { "aaa","bbb" }, LearningMode.FRONTAL,1, "../../../../assets/English.jpg"),
            new Course("French", 3,10, new DateTime(), new string[] { "bbb" }, LearningMode.ZOOM, 2, "../../../../assets/French.jpg" ),
            new Course("basketball",2,15, new DateTime(), new string[] { "ccc" }, LearningMode.FRONTAL, 3, "../../../../assets/basketball.jpg" ),
            new Course("music", 1,18, new DateTime(), new string[] { "ddd" }, LearningMode.ZOOM, 1,"../../../../assets/music.jpg" ),
            new Course("Drawing", 1,8, new DateTime(), new string[] { "ddd" }, LearningMode.FRONTAL, 1,"../../../../assets/Drawing.jpg" )

        };
        // GET: api/<CourseController>
        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return courses;
        }

        // GET api/<CourseController>/5
        [HttpGet("{id}")]
        public Course Get(int id)
        {
            return courses.Find(x => x.id == id);
        }


        // POST api/<CourseController>
        [HttpPost]
        public void Post([FromBody] Course course)
        {
            course.learningMode = (LearningMode)Enum.Parse(typeof(LearningMode), course.learningMode.ToString());
            
            courses.Add(new Course(course.name, course.categoryId, course.lessonCount, course.startDate, course.syllabus, course.learningMode, course.lecturerId, course.image));
        }


        // PUT api/<CourseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Course newCourse)
        {
            var course = courses.Find(x => x.id == id);
            if (course != null)
            {
                course.name = newCourse.name;
                course.categoryId = newCourse.categoryId;
                course.lessonCount = newCourse.lessonCount;
                course.startDate = newCourse.startDate;
                course.syllabus = newCourse.syllabus;
                course.learningMode = newCourse.learningMode;
                course.lecturerId = newCourse.lecturerId;
                course.image = newCourse.image;
            }
        }

        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var course = courses.Find(x => x.id == id);
            if (course != null) { courses.Remove(course); }
        }
    }
}
